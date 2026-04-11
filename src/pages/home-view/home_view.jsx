import HomeLogo from "../../assets/icons/HomeLogo";
import ViewLayout from "../../layouts/ViewLayout";
import MessageInput from "../../components/MessageInput/MessageInput";

export default function HomeView({ onSend }) {
  return (
    <ViewLayout className="flex flex-col justify-center items-center w-full px-4 animate-fade-in">
      <HomeLogo />
      <MessageInput onSend={onSend} />
    </ViewLayout>
  );
}
