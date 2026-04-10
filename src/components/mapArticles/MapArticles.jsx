import React from "react";
import styles from "../mapArticles/MapArticles.module.css";
import ArticleLayout from "./articleLayout/ArticleLayout";

export default function MapArticles() {
  return (
    <nav className="flex flex-col h-full w-full border-r border-gray-600/50 gradient-container">
      <div className="flex flex-col flex-1 w-full items-center justify-start gap-6 py-12 px-4 overflow-y-auto no-scrollbar">
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
