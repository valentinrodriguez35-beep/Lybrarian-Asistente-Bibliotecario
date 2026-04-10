import React, { useState } from "react";
import MessageInput from "../../components/messageInput/messageInput";
import MessageBubble from "../../components/messageBubble/messageBubble";
import ViewLayout from "../../layouts/ViewLayout";
import MessagesContainer from "./Messages_Container/MessagesContainer";

export default function ChatView({ messages, onSend }) {
  return (
    <ViewLayout className="flex flex-col items-center w-full">
      <MessagesContainer>
        {messages.map((msg, index) => (
          <MessageBubble text={msg.text} type={msg.type} key={index} />
        ))}
      </MessagesContainer>
      <footer className="flex flex-col items-center p-4 h-auto w-full">
        <MessageInput onSend={onSend} />
      </footer>
    </ViewLayout>
  );
}
