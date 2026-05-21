import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function save_user(user){
    const {data} = await supabase.auth.signUp(user);
    return {
        success: true,
        data: data
    }
}

export async function save_favorite_book(book, user){
    const {data, error} = await supabase.from('saved_results').insert({
        biblios_id: book.id,
        user_id: user.id,
    });

    if(error){
        console.error("Error en guardar elemento libro: ", error);
        return {
            success: false
        }
    }

    return {
        success: true, 
        data: data
    }
}