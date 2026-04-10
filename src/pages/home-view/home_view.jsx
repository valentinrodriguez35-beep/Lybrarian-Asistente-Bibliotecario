import React, { useEffect } from "react";
import styles from "./home_view.module.css";
import MessageInput from "../../components/MessageInput/MessageInput";

import HomeLogo from "../../assets/HomeLogo";
import ViewLayout from "../../layouts/ViewLayout";

export default function HomeView({ onSend }) {
  return (
    <ViewLayout className="flex flex-col justify-center items-center w-full animate-fade-in">
      <HomeLogo />
      <MessageInput onSend={onSend} />
    </ViewLayout>
  );
}
