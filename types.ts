export interface Challenge{
    id : number,
    img_location : string,
    title : string,
    description : string,
    location : string,
    joined_count : number,
    difficulty: string,
    category :string
}


// Sortfield moet nog de fields krijgen bv. sociaal, mentaal, 
// aantal gejoined, moeilijkheidsgraad, etc..

export type SortField = "title" | "social" | "physically" | "public" | "mental";
export type SortDirection = "asc" | "desc";