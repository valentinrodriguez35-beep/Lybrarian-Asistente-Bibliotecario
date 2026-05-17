import { assistantRequest, aiResponse} from "./api/assistant/ai_logic.js";

export async function generate_metadata(message, res){
    if(!message){
        return{
            response: "Message is missing",
            error: true,
            status: 400,
        }
    }
    const metadata = await assistantRequest(message, res);
    if(!metadata.success){
        return{
            response: "AI Failed to generate metadata",
            error: true,
            status: metadata.status,
        }
    }
    return{
        response: metadata.data,
        error: false,
        status: metadata.status,
    }
}

export async function generate_response(message, metadata, kohaData, res){
    if(!message || !metadata || !kohaData){
        return{
            response: "Data required for response are empty",
            error: true,
            status: 400,
        }
    }
    
    const result = await aiResponse(message, metadata, kohaData, res);
    if(!result.success){
        return{
            response: "AI Failed to generate response",
            error: true,
            status: result.status,
        }
    }
    return {
        response: result,
        error: false,
        status: result.status,
    }
}