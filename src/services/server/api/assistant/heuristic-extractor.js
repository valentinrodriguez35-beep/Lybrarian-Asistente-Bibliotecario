import {z} from "zod";

const nullify = z.string().transform(v => v.toLocaleLowerCase() === "null" ? null : v).nullable().catch(null);

const MetadataSchema = z.object({
    intent: z.enum(["search_book", "check_availability", "general_question"]).catch("unsupported_request"),
    title: nullify,
    theme: nullify,
    author: nullify,
    isbn: nullify,
    id: nullify,
    location: nullify,
    is_ambiguous: z.boolean().catch(false),
});

export const HeuristicAnalizer = (metadata) => {
    const result = MetadataSchema.safeParse(metadata);
    if(!result.success){
        console.error(result.error.format());
        return{
            data: null,
            success: false,
            error: result.error,
        };
    }

    return{
        data: result.data,
        success: true,
        error: null,
    };
}

//Issues
[
    {
        expected: 'string',
        code: 'invalid_type',
        message: 'Parameter with invalid type of value, expected string',
        path: ['title', 'theme', 'author', 'isbn', 'id', 'location']
    },
    {
        expected: 'enum',
        code: 'invalid_type',
        message: 'Parameter with invalid type of value, expected enum',
        path: ['intent']
    },
    {
        expected: 'boolean',
        code: 'invalid_type',
        message: 'Parameter with invalid type of value, expected Boolean (true or false)',
        path: ['is_ambiguous']
    },
]