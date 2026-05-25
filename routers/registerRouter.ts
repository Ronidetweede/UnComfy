import express from "express";
import { Register } from "../data";

export function registerRouter() {
  const router = express.Router();
  
  router.get("/register", async (req, res) => {
    if (req.session.user) {
      res.redirect("/menu");
    } else {
      res.render("register", { error: "" });
    }
  });

  router.post("/register", async (req, res) => {
  try {
      const userName = req.body.username;
      const userPassword = req.body.password;

      await Register(userName, userPassword);

      res.redirect("/login");
    } catch (error: any) {
      res.render("register", { error: error.message });
    }
  });

  router.get("/accountsetup" , async(req,res)=> {
    try {
      // await updateUser(req.session.user?.username);

    } catch (error : any) {
      
    }
    res.render("account-setup");

  });

  return router;
};