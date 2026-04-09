import React from 'react'

export default function ButtonLayout({children, label, button_style}) {
  return (
    < button type="button" className="bg-transparent border-none h-12 w-full cursor-pointer" aria-label={label}>
        {/*Renderizar los botones pertenecientes a la barra lateral*/}
        <div className="inline-flex flex-row items-center gap-3 h-full">
            {children}
            <span className={`text-[16px] font-medium text-hover ${button_style}`}>
                {label}
            </span>
        </div>
    </ button>
  )
}
