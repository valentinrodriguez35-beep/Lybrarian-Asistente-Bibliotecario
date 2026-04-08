import React from "react";
import styles from "../mapArticles/MapArticles.module.css";
import ArticleLayout from "./articleLayout/ArticleLayout";

export default function MapArticles() {
  return (
    <nav className="gap-6 py-12 bg-[#0B0C0C] h-full w-81.25 border-r border-gray-600/50 overflow-y-auto overflow-hidden no-scrollbar gradient-container">
      <div className="flex flex-col items-center-safe gap-6">
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
      </div>
    </nav>
  );
}
