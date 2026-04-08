import React from "react";
import LogIn from "./log-in/log_in";
import BrandGitHub from "../../assets/BrandGitHub";

export default function AuthView() {
  return (
    <section className="h-dvh w-dvw flex flex-col justify-center items-center">
      <div className="flex flex-col h-full w-110">
        <LogIn />
      </div>
      <footer className="pb-4!">
        <a className="flex flex-row gap-2 cursor-pointer">
          <BrandGitHub />
          <span className="text-gray-100 font-semibold">GitHub</span>
          <span className="text-gray-100 font-semibold">|</span>
          <span className="text-gray-200">Para mayor información.</span>
        </a>
      </footer>
    </section>
  );
}
