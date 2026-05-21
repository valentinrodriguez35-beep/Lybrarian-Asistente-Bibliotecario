//Efecto Carrusel (Carousel en ingles) que itere sobre todos los resultados obtenidos.
import React from 'react'
import { useState } from 'react';

export function CardResult({items}) {
    const [current, setCurrent] = useState(0);
    if (!items || items.length === 0) 
        return null;
    const {title, author, isbn, location, available} = items[current]
    const isAvailable = available > 0;
  return (
    <div className="flex flex-col items-center justify-center">
            <article className="flex flex-row w-104 h-40 gap-2.5 bg-[#1C1C24] p-4 rounded-[20px]">
                <img className='w-20 h-32.5 rounded-[10px] border-white' src={`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`} alt="Imagen de portada del libro consultado">
                </img>
                <div className="flex flex-col">
                <span className={`text-[12px] font-bold ${isAvailable ? "text-[#86ff7b]" : "text-[#ff7b7b]"}`}>
                    {isAvailable ? `${available} disponible${available > 1 ? 's' : ''}` : 'No disponible'}
                </span>
                <h1 className="text-xl font-medium text-white">
                    {title}
                </h1>
                <h2 className="text-lg font-light text-slate-300">
                    {author}
                </h2>
                <div className="flex flex-wrap w-fit h-fit gap-1">
                    <span className="text-[11px] font-semibold text-white">
                        ISBN:
                    </span>
                    <h3 className="text-[11px] font-normal text-white">
                        {isbn}
                    </h3>
                </div>
                <h4 className="text-[12px] font-bold text-white">
                    {location}
                </h4>
                </div>
            </article>
            <div className="flex items-center justify-center gap-4 mt-4 max-w-sm">
                <button onClick={() => setCurrent((i) => Math.max(0, i - 1))}
                    disabled={current === 0}
                    className="text-lg px-3 py-1 border font-bold text-white border-gray-200 rounded-lg disabled:opacity-50"
                    >
                        ←
                </button>

                <button onClick={() => setCurrent((i) => Math.min(items.length - 1, i + 1))}
                    disabled={current === items.length - 1}
                    className="text-lg px-3 py-1 border font-bold text-white border-gray-200 rounded-lg disabled:opacity-50"
                    >
                        →
                </button>
            </div>
    </div>
        
  )
}
