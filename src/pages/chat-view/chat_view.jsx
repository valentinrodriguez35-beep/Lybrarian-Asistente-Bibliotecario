import React, { useState } from "react";
import MessageInput from "../../components/messageInput/messageInput";
import MessageBubble from "../../components/messageBubble/messageBubble";

export default function ChatView({ messages, onSend }) {
  return (
    <section className="flex flex-col h-full w-full">
      <div className="flex flex-col flex-1 gap-6 py-4 justify-start items-start overflow-y-auto no-scrollbar">
        {messages.map((msg, index) => (
          <MessageBubble text={msg.text} type={msg.type} key={index} />
        ))}
      </div>
      <div className="w-full">
        <MessageInput onSend={onSend} />
      </div>
    </section>
  );
}
