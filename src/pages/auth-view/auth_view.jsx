import React from "react";
import LogIn from "./log-in/log_in";

export default function AuthView() {
  return (
    <section className="h-dvh w-dvw flex flex-col justify-center items-center">
      <div className="flex flex-col h-full w-110 justify-center-safe items-center-safe">
        <LogIn />
      </div>
    </section>
  );
}
