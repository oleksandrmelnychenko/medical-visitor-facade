"use client";

import styles from "./chat.module.scss";
import { cn } from "@/lib/utils";

type MessageBubbleProps = {
  content: string;
  senderName: string;
  senderRole: "CLIENT" | "MANAGER" | "ADMIN";
  createdAt: string;
  isOwn: boolean;
};

export function MessageBubble({
  content,
  senderName,
  createdAt,
  isOwn,
}: MessageBubbleProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={cn(styles.messageWrapper, isOwn && styles.own)}>
      <div className={cn(styles.bubble, isOwn ? styles.ownBubble : styles.otherBubble)}>
        {!isOwn && <span className={styles.senderName}>{senderName}</span>}
        <p className={styles.messageContent}>{content}</p>
        <span className={styles.messageTime}>{formatTime(createdAt)}</span>
      </div>
    </div>
  );
}
