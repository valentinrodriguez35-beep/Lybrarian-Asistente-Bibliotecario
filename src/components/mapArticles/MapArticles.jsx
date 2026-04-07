import React from "react";
import styles from "../mapArticles/MapArticles.module.css";
import ArticleLayout from "./articleLayout/ArticleLayout";

export default function MapArticles() {
  return (
    <nav className="flex flex-col items-center-safe gap-6 pt-14! bg-[#0B0C0C] h-full w-81.25 border-r border-[#393D41] overflow-y-auto overflow-hidden no-scrollbar">
      <ArticleLayout
        name="Biblioteca Central Tijuana"
        status="abierto_marker"
        statusText="abierto_text"
      />
      <ArticleLayout
        name="Biblioteca Central Ensenada"
        status="abierto_marker"
        statusText="abierto_text"
      />
      <ArticleLayout
        name="Biblioteca Central Mexicali"
        status="cerrado_marker"
        statusText="cerrado_text"
      />
      <ArticleLayout
        name="Biblioteca Valle Dorado"
        status="cerrado_marker"
        statusText="cerrado_text"
      />
      <ArticleLayout
        name="Placeholder"
        status="abierto_marker"
        statusText="abierto_text"
      />
      <ArticleLayout
        name="Placeholder"
        status="abierto_marker"
        statusText="abierto_text"
      />
      <ArticleLayout
        name="Placeholder"
        status="cerrado_marker"
        statusText="cerrado_text"
      />
      <div className="h-10 w-full bg-linear-to-t from-[#0B0C0C] to-transparent"></div>
    </nav>
  );
}
