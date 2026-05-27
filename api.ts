import { MongoClient } from "mongodb";
import { Challenge, Location } from "./types";
import { challengeCollection, client } from "./database";

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
    headers: {
    
    // Dit moet voor OpenStreetMap 
    "User-Agent": "UnComfyApp/1.0 (contact@yourdomain.com)", 
    
    "Accept": "application/json",
    
    "Content-Type": "application/x-www-form-urlencoded" 
  },
    body: new URLSearchParams({ data: query }),
  }
);
    if (!response.ok) {
        throw new Error(`Overpass API fout: ${response.status} ${response.statusText}`);
    }

  const data = await response.json();
  return data.elements;
}


export async function seedDatabase() {
  const elementen = await fetchLocaties();
  const challenges:Challenge[] = [];
  let id = 1;

  for (const element of elementen) {
    const tags = element.tags;

    if (tags === undefined) continue;
    if (tags.name === undefined || tags.name === "") continue;
    if (tags["addr:street"] === undefined && tags["addr:city"] === undefined) continue;

    const street = tags["addr:street"] || "";
    const houseNumber = tags["addr:housenumber"] || "";
    const city = tags["addr:city"] || "";
    const address = street + " " + houseNumber + " " + city;

    let category = "overig";
    if (tags["amenity"] === "restaurant") category = "restaurant";
    if (tags["amenity"] === "cafe") category = "cafe";
    if (tags["leisure"] === "park") category = "park";

    const challenge: Challenge = {
      id: id,
      img_location: "",
      title: tags.name,
      description: "",
      location: 
      {
        name: tags.name,
        address: address,
        categoryLocation: category
      },
      joined_count: 0,
      difficulty: "easy",
      category: category,
      comfyPoints: 0,
    };

    challenges.push(challenge);
    id++;
  }


  await challengeCollection.deleteMany({});
  await challengeCollection.insertMany(challenges);

  console.log(challenges.length + " challenges opgeslagen in MongoDB.");

}