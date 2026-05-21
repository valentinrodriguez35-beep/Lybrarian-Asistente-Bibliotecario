import dotenv from "dotenv";
dotenv.config();

// eslint-disable-next-line no-undef
const kohaUrl = process.env.KOHA_API_URL ?? "http://localhost:4000/api/v1/biblios/search?"

export function query_builder(metadata){
    if(!metadata){
        return {
            response: "Metadata is missign",
            error: true,
            status: 400,
        };
    }
    //Receive Metada extracted from the AI
    //Then, use it to build the URL for the query to Koha's MOCKED API
    const params = new URLSearchParams();
    /*
    const search_terms = [metadata.title, metadata.theme].filter(Boolean).join(" ");
    if (search_terms) params.append("q", search_terms);*/
    if (metadata.title) params.append("title", metadata.title);
    if (metadata.theme) params.append("theme", metadata.theme);
    if (metadata.author) params.append("author", metadata.author);
    if (metadata.isbn) params.append("isbn", metadata.isbn);
    if (metadata.id) params.append("biblionumber", metadata.id);
    if (metadata.location) params.append("location", metadata.location);
    return {
        response: params,
        error: false,
        status: 200,  
    }
}

export async function query_request(message_data){
    if(!message_data){
        return{
            response:"Message Data is missign",
            error: true,
            status: 400,
        }
    }
    console.log("query_request received:", message_data);
    const query_params = query_builder(message_data);
    if(query_params.error){
        return{
            response: query_params.response,
            error: true,
            status: query_params.status,
        }
    }
    
    const targetUrl = `${kohaUrl}${query_params.response}`;

    try {
        //Fetch request to Koha API (Mocked)
        const response = await fetch(targetUrl,
            {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
            },
        );
        
        if(!response.ok){
            return{
                response: "Koha API Failed to process request",
                error: true,
                status: response.status,
            }
        }
        
        const data = await response.json();
        return {
            response: data.results,
            error: false,
            status: response.status,
        }
    } catch(err) {
        return {
            response: "Network error requesting Koha API",
            error: true,
            status: 500,
        }
    }
}