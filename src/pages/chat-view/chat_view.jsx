import MessageBubble from "../../components/messageBubble/messageBubble";
import ViewLayout from "../../components/layouts/ViewLayout";
import MessagesContainer from "./Messages_Container/MessagesContainer";
import MessageInput from "../../components/ui/MessageInput/MessageInput";
import { DisclaimerFooter, HomeButton } from "../../components/icons";
import HeaderResponsive from "../../components/ui/HeaderResponsive";
import ButtonLayout from "../../components/sidebar/ButtonLayout/ButtonLayout";

export default function ChatView({ messages, onSend }) {
  return (
    <ViewLayout className="flex flex-col justify-center w-full p-4 overflow-hidden relative">
      <header>
        <HeaderResponsive>
          <ButtonLayout>
            <HomeButton fill_col="fill-(--sb-button-iddle)" />
          </ButtonLayout>
        </HeaderResponsive>
      </header>
      <div
        className="flex flex-col flex-1 w-full max-w-3xl self-center 
      lg:flex animate-fade-in transition-all ease-in 
      overflow-y-auto no-scrollbar scroll-smooth gradient-container"
      >
        <MessagesContainer>
          {messages.map((msg, index) => (
            <MessageBubble text={msg.text} type={msg.type} key={index} />
          ))}
        </MessagesContainer>
      </div>
      <div className="flex flex-col items-center py-4 h-auto w-full">
        <MessageInput onSend={onSend} />
      </div>
      <footer className="flex flex-col justify-center items-center h-fit w-full">
        <DisclaimerFooter />
      </footer>
    </ViewLayout>
  );
}
