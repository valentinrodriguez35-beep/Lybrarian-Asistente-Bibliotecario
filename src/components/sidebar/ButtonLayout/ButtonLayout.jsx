export default function ButtonLayout({
  type,
  children,
  label,
  onClick,
  label_style,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex bg-transparent border-none h-fit w-fit items-center justify-center cursor-pointer"
      aria-label={label}
    >
      {/*Renderizar boton*/}
      <div className="inline-flex flex-row items-center gap-3 h-full py-2">
        {children}
        <span
          className={`text-[16px] font-medium text-hover hidden xl:block ${label_style}`}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
