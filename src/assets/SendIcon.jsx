import React from "react";

export default function SendIcon({ fill_col = "white" }) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill_col}
    >
      <path d="M0 25V0L25 12.5L0 25ZM2.63158 20.3125L18.2237 12.5L2.63158 4.6875V10.1562L10.5263 12.5L2.63158 14.8438V20.3125Z" />
    </svg>
  );
}
