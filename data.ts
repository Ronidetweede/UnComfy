import { Challenge, SortDirection, SortField } from "./types";

export const challenges : Challenge[] = [
  {
    "id": 1,
    "img_location": "assets/images/coffee_shop.jpg",
    "title": "De Koffie-Korting",
    "description": "Vraag om 10% korting bij een koffiebar zonder reden (Noah Kagan methode).",
    "location": "Koffiebar",
    "joined_count": 84,
    "difficulty": "Moeilijk",
    "category": "Sociaal"
  },
  {
    "id": 2,
    "img_location": "assets/images/street_walk.jpg",
    "title": "Tijd-Check",
    "description": "Vraag een vreemde hoe laat het is.",
    "location": "Straat",
    "joined_count": 312,
    "difficulty": "Makkelijk",
    "category": "Sociaal"
  },
  {
    "id": 3,
    "img_location": "assets/images/dog_park.jpg",
    "title": "Honden-Babbel",
    "description": "Vraag een voorbijganger of je hun hond mag aaien.",
    "location": "Park",
    "joined_count": 156,
    "difficulty": "Gemiddeld",
    "category": "Sociaal"
  },
  {
    "id": 4,
    "img_location": "assets/images/restaurant_interior.jpg",
    "title": "Gratis Dessert",
    "description": "Vraag in een restaurant om een gratis dessert (terwijl je niet jarig bent).",
    "location": "Restaurant",
    "joined_count": 28,
    "difficulty": "Moeilijk",
    "category": "Sociaal"
  },
  {
    "id": 5,
    "img_location": "assets/images/supermarket.jpg",
    "title": "De Intercom-Droom",
    "description": "Vraag in een supermarkt of je een korte mededeling mag doen via de intercom.",
    "location": "Supermarkt",
    "joined_count": 12,
    "difficulty": "Moeilijk",
    "category": "Sociaal"
  },
  {
    "id": 6,
    "img_location": "assets/images/gym_training.jpg",
    "title": "Hulp Vragen",
    "description": "Vraag aan iemand in de fitness om je een specifieke oefening uit te leggen.",
    "location": "Fitness",
    "joined_count": 94,
    "difficulty": "Gemiddeld",
    "category": "Sociaal"
  },
  {
    "id": 7,
    "img_location": "assets/images/compliments.jpg",
    "title": "Complimenten-Run",
    "description": "Geef vandaag 5 oprechte complimenten aan volstrekte vreemden.",
    "location": "Stad",
    "joined_count": 245,
    "difficulty": "Gemiddeld",
    "category": "Sociaal"
  },
  {
    "id": 8,
    "img_location": "assets/images/cold_shower.jpg",
    "title": "Ijsbad-Douche",
    "description": "Neem een koude douche van 30 seconden aan het einde van je routine.",
    "location": "Thuis",
    "joined_count": 512,
    "difficulty": "Gemiddeld",
    "category": "Fysiek"
  },
  {
    "id": 9,
    "img_location": "assets/images/floor_sleep.jpg",
    "title": "Grond-Nacht",
    "description": "Slaap één nacht op de vloer zonder matras.",
    "location": "Slaapkamer",
    "joined_count": 67,
    "difficulty": "Moeilijk",
    "category": "Fysiek"
  },
  {
    "id": 10,
    "img_location": "assets/images/winter_walk.jpg",
    "title": "Koude-Wandeling",
    "description": "Ga 5 minuten naar buiten zonder jas wanneer het kouder is dan 10 graden.",
    "location": "Buiten",
    "joined_count": 189,
    "difficulty": "Gemiddeld",
    "category": "Fysiek"
  },
  {
    "id": 11,
    "img_location": "assets/images/lying_down.jpg",
    "title": "De 30-seconden Lig",
    "description": "Ga 30 seconden op de grond liggen op een druk plein en sta daarna rustig weer op.",
    "location": "Stadsplein",
    "joined_count": 43,
    "difficulty": "Moeilijk",
    "category": "Publiek"
  },
  {
    "id": 12,
    "img_location": "assets/images/ugly_clothes.jpg",
    "title": "Barry Manilow-Test",
    "description": "Draag een kledingstuk dat je 'lelijk' vindt een hele dag in het openbaar.",
    "location": "Overal",
    "joined_count": 76,
    "difficulty": "Gemiddeld",
    "category": "Publiek"
  },
  {
    "id": 13,
    "img_location": "assets/images/solo_dinner.jpg",
    "title": "Solo-Diner",
    "description": "Ga alleen uit eten in een restaurant.",
    "location": "Restaurant",
    "joined_count": 132,
    "difficulty": "Gemiddeld",
    "category": "Publiek"
  },
  {
    "id": 14,
    "img_location": "assets/images/front_row.jpg",
    "title": "Front-Row",
    "description": "Ga bij een evenement of les op de allereerste rij zitten.",
    "location": "Leszaal",
    "joined_count": 204,
    "difficulty": "Makkelijk",
    "category": "Publiek"
  },
  {
    "id": 15,
    "img_location": "assets/images/public_dance.jpg",
    "title": "Stille Dans",
    "description": "Dans 1 minuut zonder muziek in een openbaar park.",
    "location": "Park",
    "joined_count": 21,
    "difficulty": "Moeilijk",
    "category": "Publiek"
  },
  {
    "id": 16,
    "img_location": "assets/images/new_route.jpg",
    "title": "De Omweg",
    "description": "Neem een compleet nieuwe route naar je werk of de supermarkt.",
    "location": "Onderweg",
    "joined_count": 420,
    "difficulty": "Makkelijk",
    "category": "Ervaring"
  },
  {
    "id": 17,
    "img_location": "assets/images/train_stop.jpg",
    "title": "Mystery-Halte",
    "description": "Stap in een bus of trein en stap uit bij een halte waar je nog nooit bent geweest.",
    "location": "Treinstation",
    "joined_count": 58,
    "difficulty": "Gemiddeld",
    "category": "Ervaring"
  },
  {
    "id": 18,
    "img_location": "assets/images/digital_detox.jpg",
    "title": "Digital Detox",
    "description": "Schakel je telefoon en computer 24 uur lang volledig uit.",
    "location": "Thuis",
    "joined_count": 35,
    "difficulty": "Moeilijk",
    "category": "Mentaal"
  },
  {
    "id": 19,
    "img_location": "assets/images/meditation.jpg",
    "title": "No-Brainrot",
    "description": "Zit 15 minuten in absolute stilte zonder te bewegen of naar een scherm te kijken.",
    "location": "Thuis",
    "joined_count": 167,
    "difficulty": "Gemiddeld",
    "category": "Mentaal"
  },
  {
    "id": 20,
    "img_location": "assets/images/resume.jpg",
    "title": "Failure Resume",
    "description": "Schrijf een cv van al je grootste mislukkingen en wat je er creatief van hebt geleerd.",
    "location": "Kantoor",
    "joined_count": 49,
    "difficulty": "Gemiddeld",
    "category": "Creatief"
  }
]

export async function getChallenges(q : string , sortField : SortField, sortDirection : SortDirection) : Promise<Challenge[]> {
    
    return new Promise((res) => {
        let filteredChallenges : Challenge[] = challenges;

        if(q) {
            filteredChallenges = filteredChallenges.filter(challenge => {
                return challenge.title.toUpperCase().includes(q.toUpperCase())
            })
        }

        if (sortField) {
            switch (sortField) {
                case "title":
                    break;
                    case "social":
                    filteredChallenges = filteredChallenges.filter(challenge => challenge.category === "Sociaal")
                    
                    break;
                case "physically":
                    filteredChallenges = filteredChallenges.filter(challenge => challenge.category === "Fysiek")
                   
                    break;
                case "public":
                    filteredChallenges = filteredChallenges.filter(challenge => challenge.category === "Publiek")
                    
                    break;
                case "mental":
                    filteredChallenges = filteredChallenges.filter(challenge => challenge.category === "Mentaal")
                    
                    break;
            }
        }
        
        if (sortDirection === "desc") {
            filteredChallenges.reverse();
        }

        res(filteredChallenges);
})}