import express from "express";
import { Login } from "../data";
import { secureMiddleware } from "../secureMiddleware";
import { error } from "console";
import { User } from "../types";

export function loginRouter() {
  const router = express.Router();

  router.get("/login", async (req, res) => {
    if (req.session.user) {
      res.redirect("/menu");
    } else {
      res.render("login", { error: "" });
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const userName = req.body.username;
      const userPassword = req.body.password;

      const user: User = await Login(userName, userPassword);
      delete user?.password;
      req.session.user = user;
      res.redirect("/accountsetup");
    } catch (error: any) {
      res.render("login", { error: error.message });
    }
  });

  router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      res.redirect("/login");
    });
  });

  return router;
}
