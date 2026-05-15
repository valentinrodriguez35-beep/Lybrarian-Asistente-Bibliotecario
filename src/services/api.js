const serverUrl = import.meta.env.SERVER_URL ?? "http://localhost:3000/chat"

export async function send_request(message, {onChunk, onError, onStatus, onResult}) {
  //Enviar y recibir datos mediante el event sourcing
  const url = `${serverUrl}/stream?message=${encodeURIComponent(message)}`
  const event_source = new EventSource(url); //Establecer conexion permanente con servidor Back-End por Streaming

  event_source.addEventListener("status", (event) =>{
    const {step} = JSON.parse(event.data) || {step: "idle"};
    console.log("Estado actual: " + step);
    if(step === "Message Failure" || step === "Extracting Failure" || step === "Searching Failure" || step === "Responding Failure"){
      console.log("Fallo!");
      onError(step);
      event_source.close();
    }
    else if(step === "Succeded"){
      console.log("Procesando...!");
      onStatus(step);
      event_source.close();
    }
    else{
      console.log("Procesando...!");
      onStatus(step);
    }
  })

  event_source.addEventListener("chunk", (event) =>{
    const {text} = JSON.parse(event.data) || {text: " "};
    console.log(text);
    onChunk(text);
  });

  event_source.addEventListener("result", (event) => {
    const {item} = JSON.parse(event.data) || {item: " "};
    console.log(item);
    onResult(item);
  });
}
