import React, { useEffect } from "react";
import styles from "./home_view.module.css";
import HomeLogo from "../../assets/HomeLogo";
import ViewLayout from "../../layouts/ViewLayout";
import MessageInput from "../../components/messageInput/messageInput";

export default function HomeView({ onSend }) {
  return (
    <ViewLayout className="flex flex-col justify-center items-center w-full px-4 animate-fade-in">
      <HomeLogo />
      <MessageInput onSend={onSend} />
    </ViewLayout>
  );
}
