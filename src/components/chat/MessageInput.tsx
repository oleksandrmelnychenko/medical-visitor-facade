"use client";

import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./chat.module.scss";

type MessageInputProps = {
  onSend: (content: string) => void;
  disabled?: boolean;
};

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const t = useTranslations("messages");
  const [content, setContent] = useState("");

  const handleSend = () => {
    const trimmed = content.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setContent("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <textarea
        className={styles.textArea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t("typeMessage")}
        disabled={disabled}
        rows={1}
      />
      <button
        className={styles.sendButton}
        onClick={handleSend}
        disabled={disabled || !content.trim()}
        aria-label={t("send")}
      >
        <Send size={20} />
      </button>
    </div>
  );
}
