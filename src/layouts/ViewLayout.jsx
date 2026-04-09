import React from "react";
import { Children } from "react";
import { Outlet } from "react-router-dom";

export default function ViewLayout({children, className}) {
  return (
    <section className="flex flex-col p-8 h-full w-full">
      <div className={className}>
        {/*Renderizar el componente hijo (vistas)*/}
        {children}
        {/*Renderizar el componente hijo (vistas)*/}
      </div>
    </section>
  );
}
