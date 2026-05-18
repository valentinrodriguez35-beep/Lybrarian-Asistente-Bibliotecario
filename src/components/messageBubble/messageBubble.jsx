import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import StepsShimmer from "../utils/StepsShimmer";

export default function messageBubble({ text, type }) {
  const isAI = type === "AI";
  const isServer = type === "SERVER_STATUS";
  
  if(isServer){
    return(
      <article className="flex flex-col h-fit max-w-[85%] lg:max-w-[70%] rounded-2xl px-4 py-2 self-start rounded-tl-none bg-transparent overflow-hidden wrap-break-word">
        <StepsShimmer>
          {text}  {/*Efecto shimmer para cada paso que haga el sistema.*/}
        </StepsShimmer>
      </article>
    );
  }

  return (
    <article
      className={`flex flex-col h-fit max-w-[85%] lg:max-w-[70%] rounded-2xl px-4 py-2 
        ${isAI ? "self-start rounded-tl-none bg-transparent overflow-hidden wrap-break-word" : "self-end rounded-tr-none bg-(--user-mensaje)"}`}
    >
      <div className="text-left font-normal wrap-break-word text-zinc-200 mb-2">
        <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      </div>
    </article>
  );
}
