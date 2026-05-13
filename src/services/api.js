const serverUrl = import.meta.env.SERVER_URL ?? "http://localhost:3000/chat"
export async function send_request(message) {
  //Funcion que envia una solicitud HTTP al servidor NodeJS
  try {
    console.log("Mensaje cargado en el front-end: " + message);
    const serverResponse = await fetch(`${serverUrl}`, {
      method: "POST",
      body: JSON.stringify({ message: message }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!serverResponse.ok) {
      return {
        rol: "AI",
        body: serverResponse.response,
        error: true,
      }
    }

    const data = await serverResponse.json();
    // Aquí es donde recibes lo que enviamos desde el backend
    return {
      rol: "AI",
      body: data.response,
      error: false,
    };
  } catch (error) {
    console.error("Error al recibir mensaje del servidor");
    return {
      rol: "AI",
      body: "Error en servidor",
      error: true,
    };
  }
}
