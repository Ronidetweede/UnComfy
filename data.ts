import { ClientEncryption, ObjectId } from "mongodb";
import {
  client,
  userCollection,
  challengeCollection,
  userChallengesCollection,
} from "./database";
import {
  Challenge,
  SortDirection,
  SortField,
  User,
  UserChallenge,
} from "./types";
import bcrypt from "bcrypt";

const saltRounds: number = 10;

export async function getChallenges(
  q: string,
  sortField: SortField,
  sortDirection: SortDirection,
  category: string,
): Promise<Challenge[]> {
  let cursor = challengeCollection.find({});
  let filteredChallenges = await cursor.toArray();

  return new Promise((res) => {
    if (q) {
      filteredChallenges = filteredChallenges.filter((challenge) => {
        return challenge.title.toUpperCase().includes(q.toUpperCase());
      });
    }
    if (category) {
      switch (category) {
        case "Sociaal":
            filteredChallenges = filteredChallenges.filter(c => c.category === "Sociaal");
            break;
        case "Fysiek":
            filteredChallenges = filteredChallenges.filter(c => c.category === "Fysiek");
            break;
        case "Publiek":
            filteredChallenges = filteredChallenges.filter(c => c.category === "Publiek");
            break;
        case "Mentaal":
            filteredChallenges = filteredChallenges.filter(c => c.category === "Mentaal");
            break;
        case "Creatief":
            filteredChallenges = filteredChallenges.filter(c => c.category === "Creatief");
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

export async function getLeaderBoard() {
  const users = await userCollection
    .find({ role: "USER" })
    .sort({ points: -1 })
    .toArray();
  return users;
}

export async function getChallengeById(
  id: number,
): Promise<Challenge | undefined> {
  let challenge = await challengeCollection.findOne<Challenge>({ id: id });
  return challenge ?? undefined;
}

export async function getActiveChallengeById(userId: string) {
  const activeUserChallenge = await userChallengesCollection.findOne({
    userId: userId,
    status: "ACTIVE",
  });
  const activeChallenge = await getChallengeById(
    activeUserChallenge?.challengeId!,
  );

  return { activeChallenge, activeUserChallenge };
}

export async function getCompletedChallenges(userId: string) {
  const completedUserChallenge = await userChallengesCollection
    .find({ userId: userId, status: "COMPLETED" })
    .toArray();

  const resultChallenges: Challenge[] = [];

  for (const completedChallenge of completedUserChallenge) {
    const challenge: Challenge | undefined = await getChallengeById(
      completedChallenge.challengeId,
    );

    if (challenge) {
      resultChallenges.push(challenge);
    }
  }
  return resultChallenges;
}

export async function completeChallenge(
  userId: string,
  challengeId: number,
  description: string,
  photoPath?: string,
) {
  let user = await userCollection.findOne<User>({ _id: new ObjectId(userId) });

  const challenges = await getActiveChallengeById(userId);

  user!.points += challenges.activeChallenge?.comfyPoints!;

  await userChallengesCollection.updateOne(
    { challengeId: challengeId, userId: userId },
    {
      $set: {
        status: "COMPLETED",
        desc: description,
        photo: (photoPath as string) ?? null,
        completedAt: new Date(Date.now()),
      },
    },
  );

  await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { points: user!.points } },
  );
}

export async function acceptChallenge(userId: ObjectId, challengeId: number) {
  await userChallengesCollection.insertOne({
    userId: userId.toString(),
    challengeId: challengeId,
    status: "ACTIVE",
    acceptedAt: new Date(Date.now()),
  });

  await challengeCollection.updateOne({id: challengeId}, {$inc: {joined_count: 1}});

}

export async function getUserById(userId: ObjectId | string) {
  return await userCollection.findOne<User>({ _id: new ObjectId(userId) });
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

export async function updateUser(
  user_Id: ObjectId,
  displayName: string,
  email: string,
  profilePicture?: string,
) {
  const update: any = { displayName, email };
  if (profilePicture) {
    update.profilePicture = profilePicture;
  }

  await userCollection.updateOne(
    { _id: new ObjectId(user_Id) },
    {
      $set: update,
    },
  );
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
