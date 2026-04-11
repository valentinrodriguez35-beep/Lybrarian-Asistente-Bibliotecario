import React from "react";
import styles from "./messageBubble.module.css";
import ReactMarkdown from "react-markdown";

export default function messageBubble({ text, type }) {
  return (
    /*User = .userMessage
    AI = .aiMessage*/
    <div className={styles.aiMessage}>
      <div className={styles.bubble}>
        <div className={styles.msgText}>
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
