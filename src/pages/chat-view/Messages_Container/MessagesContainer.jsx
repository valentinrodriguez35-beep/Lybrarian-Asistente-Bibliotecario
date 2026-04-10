import React from "react";

export default function MessagesContainer({ children }) {
  return (
    <main className="flex flex-col flex-1 sm:w-full max-w-175 gap-6 py-6 justify-start items-center overflow-y-auto no-scrollbar gradient-container">
      {children}
    </main>
  );
}
