import { ObjectId } from "mongodb";

export interface Challenge{
    id : number,
    img_location : string;
    title : string;
    description : string;
    location : Location;
    joined_count : number;
    difficulty: string;
    category :string;
    comfyPoints: number;
}

export interface Location{
  name: string;
  address: string;
  categoryLocation: string; 
}

export interface User {
  _id?: ObjectId;
  username: string;
  password?: string;
  displayName: string;
  avatar?: string;
  points: number;
  role: "ADMIN" | "USER";
}

export interface UserChallenge {
  userId: string;
  challengeId: number;
  status: "ACTIVE" | "COMPLETED";
  acceptedAt: Date;
  completedAt?: Date;
  pointsEarned?: number;
}


// Sortfield moet nog de fields krijgen bv. sociaal, mentaal, 
// aantal gejoined, moeilijkheidsgraad, etc..

export type SortField = "title" | "social" | "physically" | "public" | "mental";

export type SortDirection = "asc" | "desc";