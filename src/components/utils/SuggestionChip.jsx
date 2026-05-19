//Crear botones que sean de sugerencias de busqueda
const suggestions = [
    {label: "🖥️ Tecnologia", message: "Buenos días, ¿Tienen algún libro de Tecnología?"},
    {label: "🔭 Astronomia", message: "¿En que biblioteca tienen algún libro de Astronomía?"},
    {label: "🧪 Ciencia", message: "Me gustaría saber si tienen algún libro de Ciencia"},
    {label: "👻 Terror", message: "¿Tienen libros de Terror?"},
    {label: "🐉 Fantasia", message: "Estuve con ganas de leer algo de fantasía, ¿Tienen libros de ese tema?"},
]

export default function SuggestionChip({onSelect}) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
        {suggestions.map(({label, message}) => (
            <button 
                key={label}
                className = "bg-(--info-tarjeta-color) border border-(--info-tarjeta-pressed) px-2 py-2 w-auto h-auto rounded-2xl cursor-pointer hover:bg-(--info-tarjeta-pressed) transition-colors ease-in duration-300"
                onClick = { () => onSelect(message)}
            >
                <span className="text-[#9898B0]">
                {label}
                </span>
            </button>
        ))}
    </div>
  )
}