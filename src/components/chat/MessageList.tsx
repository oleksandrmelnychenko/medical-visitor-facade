"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MessageBubble } from "./MessageBubble";
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

type MessageListProps = {
  messages: Message[];
  currentUserId: string;
};

export function MessageList({ messages, currentUserId }: MessageListProps) {
  const t = useTranslations("messages");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return t("today");
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return t("yesterday");
    }
    return date.toLocaleDateString();
  };

  const groupMessagesByDate = (msgs: Message[]) => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = "";

    for (const msg of msgs) {
      const msgDate = new Date(msg.createdAt).toDateString();
      if (msgDate !== currentDate) {
        currentDate = msgDate;
        groups.push({ date: msg.createdAt, messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    }

    return groups;
  };

  if (messages.length === 0) {
    return (
      <div className={styles.emptyMessages}>
        <p>{t("noMessages")}</p>
      </div>
    );
  }

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className={styles.messageList} ref={listRef}>
      {groupedMessages.map((group) => (
        <div key={group.date}>
          <div className={styles.dateSeparator}>
            <span>{formatDate(group.date)}</span>
          </div>
          {group.messages.map((message) => {
            const senderName =
              message.sender.firstName && message.sender.lastName
                ? `${message.sender.firstName} ${message.sender.lastName}`
                : message.senderRole === "CLIENT"
                ? t("client")
                : t("support");

            return (
              <MessageBubble
                key={message.id}
                content={message.content}
                senderName={senderName}
                senderRole={message.senderRole}
                createdAt={message.createdAt}
                isOwn={message.sender.id === currentUserId}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
