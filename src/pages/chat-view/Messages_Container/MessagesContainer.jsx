export default function MessagesContainer({ children }) {
  return (
    <main
      className="flex flex-col lg:items-start 
    w-full gap-6 py-6"
    >
      {children}
    </main>
  );
}
