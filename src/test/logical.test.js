import { expect, test, describe } from "vitest";
import { HeuristicAnalizer } from "../services/server/api/assistant/heuristic-extractor.js";
import { query_request } from "../services/server/koha.js";
import { useChat } from "../hooks/useChat.jsx";
import { generate_metadata, generate_response } from "../services/server/ai.js";

describe("Pruebas de Integracion", () => {
  test("Integracion de API Mock de Biblioteca", async () => {
    /*Generar datos los cuales se comuniquen con el HeuristicAnalizer
     y posteriormente procesarlos con el mock de biblioteca para verificar
     que la integración ha sido exitosa.*/

    const metadata = {
      intent: "search_book",
      title: "El Principito",
      theme: "null",
      author: "null",
      isbn: "null",
      id: "null",
      location: "null",
      is_ambiguous: false,
    };

    //Sanitizamos el Metadata para valores nulos
    const sanitized_metadata = HeuristicAnalizer(metadata);

    //Esperamos que el metadata haya sanitizado con valores nulos.
    expect(sanitized_metadata.success).toBe(true);
    expect(sanitized_metadata.data).toEqual({
      intent: "search_book",
      title: "El Principito",
      theme: null,
      author: null,
      isbn: null,
      id: null,
      location: null,
      is_ambiguous: false,
    });

    const data = sanitized_metadata.data;
    //Ahora generamos un query URL para comunicarse con el mock de la biblioteca
    const query_generated = await query_request(data);
    expect(query_generated.error).toBe(false);
    expect(query_generated.status).toBe(200);
    console.log("1er integracion completada.");
  });

  test("Protección de backend ante inputs vacios(Comunicacion)", async () => {
    /*Debido a que se cuenta como la funcion principal
    se debera hacer un testing de proteccion ante los inputs
    nulos que se puedan generar desde el frontend y viajen al backend
    de forma que estos mismos no lleguen nunca al modulo de inteligencia
    artificial*/

    const message = null;
    expect(message).toBeNull();

    //Llamamos a la funcion de control intermediario generate_metadata
    const null_handler = await generate_metadata(message);

    /*En caso de que el mensaje pueda 
    ser procesado al no ser nulo, se debera comprobar
    que este mismo no vuelva a atravesar el modulo generador de respuestas
    por parte de la inteligencia artificial*/
    const metadata = {
      intent: "search_book",
      title: "El principito",
      theme: null,
      author: "Test",
      isbn: null,
      location: null,
    };

    const kohaData = {
      biblionumber: "1010",
      title: "El principito",
      author: "Antoine de Saint-Exupéry",
      isbn: "9788498381498",
      year: 1943,
      location: "Biblioteca Central Tijuana",
      total_items: 6,
      available: 4,
      theme: "infantil filosofía clásica principito rosa exupery",
    };

    const res = null;

    const error_handler = await generate_response(
      message,
      metadata,
      kohaData,
      res,
    );

    //Resultados de pruebas (se espera que el sistema devuelva errores para ambos casos)
    expect(null_handler.error).toBe(true);
    expect(null_handler.status).toBe(400);
    expect(error_handler.error).toBe(true);
    expect(error_handler.status).toBe(400);
    console.log("2da integracion completada.");
  });

  const null_params = ["null", "NULL", "Null", "nULL"];
  test.each(null_params)(
    "Comprobación de sanitización bajo distintos escenarios",
    (null_case) => {
      //Construimos un metadata que abarque cada caso de null
      const metadata = {
        intent: "search_book",
        title: "El Principito",
        theme: null_case,
        author: null_case,
        isbn: null_case,
        id: null_case,
        location: null_case,
        is_ambiguous: false,
      };

      const sanitized_metadata = HeuristicAnalizer(metadata);
      expect(sanitized_metadata.success).toBe(true);
      expect(sanitized_metadata.data).toEqual({
        intent: "search_book",
        title: "El Principito",
        theme: null,
        author: null,
        isbn: null,
        id: null,
        location: null,
        is_ambiguous: false,
      });
      console.log(`${null_case} => 3er integracion completada.`);
    },
  );
});
