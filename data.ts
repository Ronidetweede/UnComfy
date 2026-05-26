import { ClientEncryption, ObjectId } from "mongodb";
import { client, userCollection, challengeCollection, userChallengesCollection } from "./database";
import { Challenge, SortDirection, SortField, User, UserChallenge } from "./types";
import bcrypt from "bcrypt";


const saltRounds: number = 10;

export async function getChallenges(  q: string, sortField: SortField, sortDirection: SortDirection,category: string,): Promise<Challenge[]> {
  let cursor = challengeCollection.find({});;
  let filteredChallenges = await cursor.toArray();

  return new Promise((res) => {

    if (q) {
      filteredChallenges = filteredChallenges.filter((challenge) => {
        return challenge.title.toUpperCase().includes(q.toUpperCase());
      });
    }
    if (category) {
      switch (category) {
        case "title":
          break;
        case "social":
          filteredChallenges = filteredChallenges.filter(
            (challenge) => challenge.category === "Sociaal",
          );

          break;
        case "physically":
          filteredChallenges = filteredChallenges.filter(
            (challenge) => challenge.category === "Fysiek",
          );

          break;
        case "public":
          filteredChallenges = filteredChallenges.filter(
            (challenge) => challenge.category === "Publiek",
          );

          break;
        case "mental":
          filteredChallenges = filteredChallenges.filter(
            (challenge) => challenge.category === "Mentaal",
          );

          break;
      }
    }
    if (sortDirection === "desc") {
      filteredChallenges.reverse();
    }
    res(filteredChallenges);

    const regexp = new RegExp(`.*${q}.*`, "i");
    const query = q === "" ? {} : { name: regexp };

    return challengeCollection
      .find<Challenge>(query)
      .sort({ [sortField]: sortDirection })
      .collation({ locale: "en" })
      .toArray();
  });
}

export async function getChallengeById(id: number, ): Promise<Challenge | undefined> {
    let challenge = await challengeCollection.findOne<Challenge>( {id : id} );
    return challenge ?? undefined;
};

export async function getActiveChallengeById(userId: string) {

  const activeUserChallenge = await userChallengesCollection.findOne({userId: userId, status: "ACTIVE"});
  const activeChallenge = await getChallengeById(activeUserChallenge?.challengeId!); 

  return {activeChallenge, activeUserChallenge};
}

export async function getCompletedChallenges(userId: string) {

  const completedUserChallenge = await userChallengesCollection.find({userId: userId, status: "COMPLETED"}).toArray();

  const resultChallenges = [];

  for (const completedChallenge of completedUserChallenge) {
    const challenge : Challenge | undefined  = await getChallengeById(completedChallenge.challengeId);

    resultChallenges.push(challenge);
  }
  return resultChallenges;
}

export async function acceptChallenge(userId: ObjectId, challengeId: number){
  
  await userChallengesCollection.insertOne({
    userId: userId.toString(),
    challengeId: challengeId,
    status: "ACTIVE",
    acceptedAt: new Date(Date.now()),
  })

}

export async function Login(username: string, password: string) {
  let user: User | null = await userCollection.findOne<User>({
    username: username,
  });

  if (user) {
    if (await bcrypt.compare(password, user.password!)) {
      return user;
    } else {
      throw new Error("Password Incorrect");
    }
  } else {
    throw new Error("User not found");
  }
}

export async function Register(username: string, password: string) {
  let userExists = await userCollection.findOne<User>({ username: username });

  if (userExists) {
    throw new Error("Gebruiker bestaat al");
  }

  await userCollection.insertOne({
    username: username,
    password: await bcrypt.hash(password, saltRounds),
    displayName: username,
    role: "USER",
    points: 0,
  });
}

