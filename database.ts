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
        await client.connect();
        await createInitialUser();
        await seedDatabase();
        await loadDatabase();
        console.log("Connected to database");
        process.on("SIGINT", exit);
        
}

async function loadDatabase() {
    const count = await challengeCollection.countDocuments();

    if (count === 0) {
        try {
            const challengeJson = await fetch(challengesUrl);
            let challengeData = await challengeJson.json();
            await challengeCollection.insertMany(challengeData);
            console.log("Challenges added to database");
        } catch (error) {
            throw error;
        }
    }
}

async function createInitialUser() {
    if (await userCollection.countDocuments() > 0) {
        return;
    }
    let username : string | undefined = process.env.ADMIN_NAME;
    let password : string | undefined = process.env.ADMIN_PASSWORD;
    if (username === undefined || password === undefined) {
        throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment");
    }
    await userCollection.insertOne({
        username: username,
        password: await bcrypt.hash(password, saltRounds),
        displayName: "Admin",
        points: 0,
        role: "ADMIN"
    });
}