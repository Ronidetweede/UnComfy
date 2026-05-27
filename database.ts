import { Challenge, User, UserChallenge } from "./types";
import dotenv from "dotenv";
import { MongoClient, SortDirection } from "mongodb";
import bcrypt from "bcrypt";
import { seedDatabase } from "./api";

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017";
export const client = new MongoClient(MONGO_URI);
export const userCollection = client.db("UnComfy").collection<User>("Users");
export const challengeCollection = client.db("UnComfy").collection<Challenge>("Challenges");
export const userChallengesCollection = client.db("UnComfy").collection<UserChallenge>("UserChallenges");

const challengesUrl = "https://raw.githubusercontent.com/Ronidetweede/dataset-uncomfy/refs/heads/main/jsonChallenges.json"

const saltRounds: number = 10;

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}



export async function connect() {
        try {
        await client.connect();
            await seedDatabase();
            await loadDatabase();
            console.log("Connected to database");
            process.on("SIGINT", exit);
        
        
    } catch (error) {
        console.log(`Fout: ${error}`);
    }
}

async function loadDatabase() {
   await createInitialChallenges();
   await createInitialUser();
}

async function createInitialUser() {
    if (await userCollection.countDocuments() > 0) {
        return;
    }
    let username : string | undefined = process.env.ADMIN_NAME;
    let password : string | undefined = process.env.ADMIN_PASSWORD;
    if (username === undefined || password === undefined) {
        throw new Error("ADMIN_NAME en ADMIN_PASSWORD moeten ingesteld zijn in .env");
    }
    try {
        await userCollection.insertOne({
            username: username,
            password: await bcrypt.hash(password, saltRounds),
            displayName: "Admin",
            points: 0,
            role: "ADMIN"
        });
        
    } catch (error) {
        throw new Error(`Admin kon niet worden aangemaakt: ${error}`);
    }
}

async function createInitialChallenges() {
    const count = await challengeCollection.countDocuments();

    if (count === 0) {
        try {
            const challengeJson = await fetch(challengesUrl);
            let challengeData = await challengeJson.json();
            await challengeCollection.insertMany(challengeData);
            console.log("Challenges added to database");
        } catch (error) {
            throw new Error(`Kan challenges niet inladen van Github: ${error}`);
        }
    }
}
