export async function send_request(message) {
  //Funcion que envia una solicitud HTTP al servidor NodeJS
  user_message.value = "";
  console.log("Mensaje cargado en el front-end: " + message);
  const response = await fetch("/chat", {
    method: "POST",
    body: JSON.stringify({ message: message }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  // Aquí es donde recibes lo que enviamos desde el backend
  console.log("Respuesta de la IA recibida: ", data);
  return data;
}
