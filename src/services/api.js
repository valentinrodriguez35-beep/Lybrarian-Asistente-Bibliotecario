export async function send_request(message) {
  //Funcion que envia una solicitud HTTP al servidor NodeJS
  try {
    console.log("Mensaje cargado en el front-end: " + message);
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      body: JSON.stringify({ message: message }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // Aquí es donde recibes lo que enviamos desde el backend
    console.log("Respuesta de la IA recibida: ", data);
    return {
      rol: "AI",
      body: data.response,
    };
  } catch (error) {
    console.error("Error al recibir mensaje del servidor");
    return {
      error: true,
      rol: "AI",
      body: "Error al establecer conexión con Bibliotecario",
    };
  }
}
