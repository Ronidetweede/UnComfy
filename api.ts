import { MongoClient } from "mongodb";
import { Challenge, Location } from "./types";
import { challengeCollection, challengesUrl, client } from "./database";

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

      Accept: "application/json",

      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ data: query }),
  });
  if (!response.ok) {
    throw new Error(
      `Overpass API fout: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  return data.elements;
}

export async function seedDatabase() {
  const existingChallenges = await challengeCollection.countDocuments();

  if (existingChallenges === 0) {
    const respone = await fetch(challengesUrl);
    const challenges: Challenge[] = await respone.json();

    const locations = await fetchLocaties();

    const restaurants = locations.filter(
      (location: any) => location.tags.amenity === "restaurant",
    );
    const cafes = locations.filter(
      (location: any) => location.tags.amenity === "cafe",
    );
    const parks = locations.filter(
      (location: any) => location.tags.amenity === "park",
    );

    for (const challenge of challenges) {
      let randomLocation: any;

      switch (challenge.category) {
        case "Sociaal":
          randomLocation = getRandomLocatie([...restaurants, ...cafes]);
          if (!randomLocation) continue;
          break;
        case "Fysiek":
          randomLocation = getRandomLocatie(parks);
          if (!randomLocation) continue;
          break;
        case "Publiek":
          randomLocation = getRandomLocatie([...parks, ...restaurants]);
          if (!randomLocation) continue;
          break;
        case "Mentaal":
          randomLocation = getRandomLocatie(parks);
          if (!randomLocation) continue;
          break;
        default:
          randomLocation = getRandomLocatie([
            ...restaurants,
            ...cafes,
            ...parks,
          ]);
          if (!randomLocation) continue;
          break;
      }

      const tags = randomLocation.tags;
      const street = tags["addr:street"] || "";
      const houseNumber = tags["addr:housenumber"] || "";
      const city = tags["addr:city"] || "";

      challenge.location = {
        name: tags.name,
        address: `${street} ${houseNumber}`,
        categoryLocation: challenge.category,
      };
    }

    await challengeCollection.deleteMany({});
    await challengeCollection.insertMany(challenges);

    console.log(challenges.length + " challenges opgeslagen in MongoDB.");
  } else {
    console.log("Alle challenges zitten in de database.");
  }
}

function getRandomLocatie(pool: any[]) {
  const metAdres = pool.filter(
    (location: any) =>
      location.tags?.["addr:street"] !== undefined &&
      location.tags?.["addr:city"] !== undefined,
  );

  if (metAdres.length === 0) return null;

  return metAdres[Math.floor(Math.random() * metAdres.length)];
}
