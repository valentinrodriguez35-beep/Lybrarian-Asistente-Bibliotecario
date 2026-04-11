import { useState } from "react";
import ButtonLayout from "../sidebar/ButtonLayout/ButtonLayout";
import SendIcon from "../../assets/icons/SendIcon";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-175 min-h-fit max-h-40 rounded-3xl 
      px-4 lg:px-2 pt-5 lg:pt-4 pb-3 
      border bg-(--caja-mensaje) border-slate-800 message-focus"
    >
      {/*Nueva version del message input*/}
      <textarea
        aria-label="Message Box"
        placeholder="Consulta por libro, autor o tema..."
        value={text}
        className="flex flex-1 w-full px-2 pb-6 field-sizing-content max-h-40 no-scrollbar resize-none font-normal lg:text-[18px] outline-none text-gray-50"
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="flex flex-row flex-1 justify-end items-center">
        <ButtonLayout
          type={"submit"}
          label={""}
          label_style={"hidden"}
          disabled={!text.trim()}
        >
          <SendIcon fill_col="button-behavior" />
        </ButtonLayout>
      </div>
    </form>
  );
}
