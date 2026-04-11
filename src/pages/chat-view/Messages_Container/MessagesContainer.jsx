export default function MessagesContainer({ children }) {
  return (
    <main className="flex flex-col flex-1 w-full max-w-175 gap-6 py-6 px-3 justify-start items-end overflow-y-auto no-scrollbar gradient-container">
      {children}
    </main>
  );
}
