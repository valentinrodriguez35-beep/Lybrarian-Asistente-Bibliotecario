import React, { useState } from "react";
import MessageInput from "../../components/messageInput/messageInput";
import MessageBubble from "../../components/messageBubble/messageBubble";

export default function ChatView({ messages, onSend }) {
  return (
    <section className="flex min-h-screen flex-col w-full pt-4 animate-fade-in animate-duration-250">
      <div className="flex flex-col flex-1 w-full gap-6 overflow-y-auto no-scrollbar gradient-container">
        {messages.map((msg, index) => (
          <MessageBubble text={msg.text} type={msg.type} key={index} />
        ))}
      </div>
      <div className="w-full h-auto bg-transparent">
        <MessageInput onSend={onSend} />
      </div>
    </section>
  );
}
