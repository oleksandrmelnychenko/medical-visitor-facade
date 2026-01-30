"use client";

import { useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import { useTranslations } from "next-intl";
import { RefreshCw } from "lucide-react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import styles from "./chat.module.scss";

type Message = {
  id: string;
  content: string;
  senderRole: "CLIENT" | "MANAGER" | "ADMIN";
  createdAt: string;
  sender: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    role: string;
  };
};

type ChatContainerProps = {
  applicationId: string;
  currentUserId: string;
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch");
  }
  return data.data;
};

export function ChatContainer({ applicationId, currentUserId }: ChatContainerProps) {
  const t = useTranslations("messages");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  // Use SWR for automatic deduplication, caching, and revalidation
  const {
    data: messages,
    error,
    isLoading,
    mutate,
  } = useSWR<Message[]>(
    `/api/applications/${applicationId}/messages`,
    fetcher,
    {
      refreshInterval: 10000, // Poll every 10 seconds
      revalidateOnFocus: true,
      dedupingInterval: 2000, // Dedupe requests within 2 seconds
    }
  );

  // Mark messages as read (non-blocking, fire-and-forget)
  const markAsRead = useCallback(() => {
    fetch(`/api/applications/${applicationId}/messages/read`, {
      method: "PATCH",
    }).catch(() => {
      // Silent fail - not critical
    });
  }, [applicationId]);

  // Mark as read when messages are loaded
  useEffect(() => {
    if (messages && messages.length > 0) {
      markAsRead();
    }
  }, [messages, markAsRead]);

  const handleSendMessage = async (content: string) => {
    setSending(true);
    setSendError(null);

    try {
      const response = await fetch(`/api/applications/${applicationId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Optimistically update the cache
      mutate((currentMessages) => [...(currentMessages || []), data.data], false);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.chatLoading}>
        <RefreshCw className={styles.spinner} size={24} />
        <p>{t("loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.chatError}>
        <p>{error.message || t("error")}</p>
        <button onClick={() => mutate()} className={styles.retryButton}>
          {t("retry")}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.chatContainer}>
      {sendError && <div className={styles.sendError}>{sendError}</div>}
      <MessageList messages={messages || []} currentUserId={currentUserId} />
      <MessageInput onSend={handleSendMessage} disabled={sending} />
    </div>
  );
}
