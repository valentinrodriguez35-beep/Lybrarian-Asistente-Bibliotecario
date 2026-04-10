import React from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../../services/server/database/supabase";

export default function ButtonLayout({
  children,
  label,
  onClick,
  button_style,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex bg-transparent border-none h-12 w-full cursor-pointer"
      aria-label={label}
    >
      {/*Renderizar los botones pertenecientes a la barra lateral*/}
      <div className="inline-flex flex-row items-center gap-3 h-full py-2">
        {children}
        <span className={`text-[16px] font-medium text-hover ${button_style}`}>
          {label}
        </span>
      </div>
    </button>
  );
}
