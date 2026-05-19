//Funcion para detectar estado del sevidor dentro del flujo Pipeline
export function sendEvent(res, event, data){
    return res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}