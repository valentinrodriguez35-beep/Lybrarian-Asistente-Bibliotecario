export async function send_request(message) {
  //Funcion que envia una solicitud HTTP al servidor NodeJS
  try {
    console.log("Mensaje cargado en el front-end: " + message);
    const response = await fetch("/chat", {
      method: "POST",
      body: JSON.stringify({ message: message }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok)
      throw new error(
        "ERROR! No se ha podido establecer comunicación con el servidor.",
      );

    const data = await response.json();
    // Aquí es donde recibes lo que enviamos desde el backend
    console.log("Respuesta de la IA recibida: ", data);
    return data;
  } catch (error) {
    console.error("Error al recibir mensaje del servidor");
    return {
      error: true,
      message: "Error al establecer conexión con Bibliotecario",
    };
  }
}
