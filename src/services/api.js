const serverUrl = import.meta.env.SERVER_URL ?? "http://localhost:3000/chat"
const SERVER_STATUS = {
  "Message Failure": "El mensaje enviado no ha podido ser recibido de forma correcta. Intente nuevamente.",
  "Extracting Failure": "Ha ocurrido un fallo al momento de análizar la petición. Intente nuevamente más tarde.",
  "Searching Failure": "Ha ocurrido un fallo en la busqueda de coincidencias. Intente nuevamente más tarde.",
  "Responding Failure": "Ha ocurrido un fallo en la generación de la respuesta. Intente nuevamente más tarde.",
  "Critical Failure": "Ha ocurrido un fallo en la comunicación con el servidor. Intente nuevamente más tarde.",
  "Changing Model": "Cambiando a modelo de asistente alternativo...",
};

export async function send_request(message, { onChunk, onError, onStatus, onResult, onSuccess }) {
  //Enviar y recibir datos mediante el event sourcing
  const url = `${serverUrl}/stream?message=${encodeURIComponent(message)}`
  const event_source = new EventSource(url); //Establecer conexion permanente con servidor Back-End por Streaming

  event_source.addEventListener("status", (event) => {
    const { step } = JSON.parse(event.data) || { step: "idle" };
    console.log("Estado actual: " + step);
    if (step === "Message Failure" || step === "Extracting Failure" || step === "Searching Failure" || step === "Responding Failure") {
      const error = SERVER_STATUS[step] ?? step;  //En caso de fallar la solicitud de error, tomar el step directamente.
      onError(error);
      event_source.close();
    }
    else if (step === "Changing Model") {
      onStatus(SERVER_STATUS[step] ?? step)
    } else if (step === "Success") {
      onSuccess(step);
      // No cerrar aquí: el evento "result" llega después y cierra la conexión
    }
    else {
      onStatus(step);
    }
  })

  event_source.addEventListener("chunk", (event) => {
    const { text } = JSON.parse(event.data) || { text: " " };
    onChunk(text);
  });

  event_source.addEventListener("result", (event) => {
    const { item } = JSON.parse(event.data) || { item: " " };
    console.log(item);
    onResult(item);
    event_source.close();
  });
}
