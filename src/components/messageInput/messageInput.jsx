import React, { useState } from "react";
import styles from "./messageInput.module.css";
import SendIcon from "../../assets/SendIcon.jsx";

export default function messageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="w-full max-w-2xl my-0 mx-auto h-35">
      <form onSubmit={handleSubmit} className="relative w-full">
        <textarea
          className={`${styles.txtField} focus:drop-shadow-[0_0_2px_#60A5FA]`}
          name="txtField"
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Consulta por un libro, autor o tema..."
        ></textarea>
        <button
          type="submit"
          className="absolute right-3 bottom-5 w-7 h-7
                    bg-transparent border-transparent 
                    flex flex-col justify-center items-center
                    rounded-full hover:cursor-pointer"
        >
          <SendIcon />
        </button>
      </form>
      <p className="text-gray-500 flex-col text-center font-medium text-sm pb-4 pt-5">
        Lybrarian puede equivocarse. Visita{" "}
        <a href="https://catalogocimarron.uabc.mx" className="text-blue-400">
          Catalogo Cimarrón
        </a>{" "}
        para información actualizada.
      </p>
    </div>
  );
}
