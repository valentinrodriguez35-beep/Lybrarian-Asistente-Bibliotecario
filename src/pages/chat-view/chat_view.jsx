import MessageBubble from "../../components/messageBubble/messageBubble";
import ViewLayout from "../../components/layouts/ViewLayout";
import MessagesContainer from "./Messages_Container/MessagesContainer";
import MessageInput from "../../components/ui/MessageInput/MessageInput";
import { DisclaimerFooter } from "../../components/icons";
import HeaderResponsive from "../../components/ui/HeaderResponsive";

export default function ChatView({ messages, onSend }) {
  return (
    <ViewLayout className="flex flex-col justify-center items-center w-full px-4">
      <header>
        <HeaderResponsive />
      </header>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <MessageBubble text={msg.text} type={msg.type} key={index} />
        ))}
      </MessagesContainer>
      <div className="flex flex-col items-center py-4 h-auto w-full">
        <MessageInput onSend={onSend} />
      </div>
      <footer className="flex flex-col justify-center items-center h-fit w-full">
        <DisclaimerFooter />
      </footer>
    </ViewLayout>
  );
}
