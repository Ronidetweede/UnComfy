import { MongoClient } from "mongodb";
import { Challenge } from "./types.ts";

// interface Challenge {
//     id: number;
//     img_location: string;
//     title: string;
//     description: string;
//     location: string;
//     joined_count: number;
//     difficulty: string;
//     category: string;
//     comfyPoints: number;
// }

const MONGO_URI = "mongodb+srv://roniberisha_db_user:pmTgKZa85mBFeJj@mongooef.9hppzqd.mongodb.net";
const DB_NAME = "mongooef";
const COLLECTION = "challenges";

async function fetchLocaties() {
  const query = `
    [out:json][timeout:30];
    area["name"="Antwerpen"]["admin_level"="8"]->.searchArea;
    (
      node["amenity"="restaurant"](area.searchArea);
      way["amenity"="restaurant"](area.searchArea);
      node["amenity"="cafe"](area.searchArea);
      way["amenity"="cafe"](area.searchArea);
      node["leisure"="park"](area.searchArea);
      way["leisure"="park"](area.searchArea);
    );
    out center;
  `;

  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: new URLSearchParams({ data: query }),
  });

  const data = await response.json();
  return data.elements;
}

async function seedDatabase() {
  const elementen = await fetchLocaties();
  const challenges:Challenge[] = [];
  let id = 1;

  for (const element of elementen) {
    const tags = element.tags;

    if (tags === undefined) continue;
    if (tags.name === undefined || tags.name === "") continue;
    if (tags["addr:street"] === undefined && tags["addr:city"] === undefined) continue;

    const straat = tags["addr:street"] || "";
    const nummer = tags["addr:housenumber"] || "";
    const stad = tags["addr:city"] || "";
    const adres = straat + " " + nummer + " " + stad;

    let categorie = "overig";
    if (tags["amenity"] === "restaurant") categorie = "restaurant";
    if (tags["amenity"] === "cafe") categorie = "cafe";
    if (tags["leisure"] === "park") categorie = "park";

    const challenge: Challenge = {
      id: id,
      img_location: "",
      title: tags.name,
      description: "",
      location: adres.trim(),
      joined_count: 0,
      difficulty: "easy",
      category: categorie,
      comfyPoints: 0,
    };

    challenges.push(challenge);
    id++;
  }

  const client = new MongoClient(MONGO_URI);
  await client.connect();

  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION);

  await collection.deleteMany({});
  await collection.insertMany(challenges);

  console.log(challenges.length + " challenges opgeslagen in MongoDB.");

  await client.close();
}

seedDatabase();