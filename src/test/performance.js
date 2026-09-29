import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 40,
  duration: "15m",
};

export default function () {
  const response = http.get(
    "http://localhost:4000/api/v1/biblios/search?title=El%20Principito",
  );

  check(response, {
    "responde con HTTP 200": (r) => r.status === 200,
    "incluye resultados": (r) => Array.isArray(r.json("results")),
  });
}
