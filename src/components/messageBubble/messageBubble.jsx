import Markdown from "react-markdown";
import styles from "./messageBubble.module.css";
import ReactMarkdown from "react-markdown";

export default function messageBubble({ text, type }) {
  const isAI = type === "AI";
  return (
    <article
      className={`flex flex-col h-fit max-w-[85%] lg:max-w-[70%] rounded-2xl px-4 py-2 
        ${isAI ? "self-start rounded-tl-none bg-gray-800 overflow-hidden wrap-break-word" : "self-end rounded-tr-none bg-sky-800"}`}
    >
      <div className="text-left font-normal wrap-break-word text-zinc-200 mb-2">
        <Markdown>{text}</Markdown>
      </div>
    </article>
  );
}
