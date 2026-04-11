import React from "react";

export default function DisclaimerFooter() {
  return (
    <span className="px-6 pb-3 text-center text-sm lg:text-[16px] text-slate-500">
      Lybrarian puede equivocarse. Visita{" "}
      <a
        className="font-semibold underline cursor-pointer text-emerald-500"
        href="https://catalogocimarron.uabc.mx"
        target="_blank"
      >
        Catalogo Cimarron
      </a>{" "}
      para informacion actualizada.
    </span>
  );
}
