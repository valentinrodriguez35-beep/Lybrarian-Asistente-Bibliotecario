import React, { useState } from "react";
import styles from "./chat_view.module.css";
import MessageInput from "../../components/messageInput/messageInput";
import MessageBubble from "../../components/messageBubble/messageBubble";

export default function ChatView({ messages, onSend }) {
  return (
    <section
      className="flex flex-col justify-center
    items-end h-dvh w-2xl
    z-0 mx-auto pt-2! overflow-hidden 
    animate-fade-in animate-duration-250"
    >
      <div
        className="flex flex-col justify-start items-center
      h-200 w-full
      gap-6
      pb-12!
      pt-12!
      overflow-y-auto
      no-scrollbar gradient-container"
      >
        {messages.map((msg, index) => (
          <MessageBubble text={msg.text} type={msg.type} key={index} />
        ))}
      </div>

      <div className="sticky w-full h-auto pt-2! bg-transparent">
        <MessageInput onSend={onSend} />
      </div>
    </section>
  );
}
