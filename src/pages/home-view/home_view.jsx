import MessageInput from "../../components/ui/MessageInput/MessageInput";
import HeaderResponsive from "../../components/ui/HeaderResponsive";
import SuggestionChip from "../../components/utils/SuggestionChip";
import ViewLayout from "../../components/layouts/ViewLayout";
import { HomeLogo } from "../../components/icons";

export default function HomeView({ onSend }) {
  return (
    <ViewLayout className="flex flex-col w-full justify-center p-4 overflow-hidden animate-fade-in transition-all ease-in">
      <header>
        <HeaderResponsive />
      </header>
      <div className="flex flex-1 w-full max-w-3xl self-center justify-center lg:flex-none">
        <HomeLogo />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex w-full max-w-3xl self-center">
          <MessageInput onSend={onSend} />
        </div>
        <div className="flex w-full max-w-2xl self-center justify-center">
          <SuggestionChip onSelect = {onSend}/>
        </div>
      </div>
    </ViewLayout>
  );
}