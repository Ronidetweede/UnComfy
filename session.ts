import { MONGO_URI } from "./database";
import session, { MemoryStore } from "express-session";
import { User } from "./types";
import MongoStore from "connect-mongo";

const mongoStore = MongoStore.create({
  mongoUrl: MONGO_URI,
  dbName: "UnComfy",
  collectionName: "sessions",
});

mongoStore.on("error", (error) => {
  console.error(error);
});

declare module "express-session" {
  export interface SessionData {
    user?: User;
  }
}

export default session({
  secret: process.env.SESSION_SECRET ?? "my-uncomfy-secret",
  store: mongoStore,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
});
