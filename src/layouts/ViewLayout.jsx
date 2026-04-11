export default function ViewLayout({ children, className }) {
  return (
    <section className="flex flex-col h-full w-full overflow-hidden">
      <div className={`flex-1 min-h-0 ${className}`}>
        {/*Renderizar el componente hijo (vistas)*/}
        {children}
        {/*Renderizar el componente hijo (vistas)*/}
      </div>
    </section>
  );
}
