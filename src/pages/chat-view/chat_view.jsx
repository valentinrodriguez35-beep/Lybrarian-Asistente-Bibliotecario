import MessageBubble from "../../components/messageBubble/messageBubble";
import ViewLayout from "../../layouts/ViewLayout";
import MessagesContainer from "./Messages_Container/MessagesContainer";
import DisclaimerFooter from "../../assets/icons/DisclaimerFooter";
import MessageInput from "../../components/MessageInput/MessageInput";

export default function ChatView({ messages, onSend }) {
  return (
    <ViewLayout className="flex flex-col items-center w-full px-4">
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
