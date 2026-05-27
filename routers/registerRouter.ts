import express from "express";
import { getUserById, Register, updateUser } from "../data";
import { log } from "node:console";
import { userChallengesCollection } from "../database";
import multer from "multer";

const upload = multer({ dest: "public/uploads/" });

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
      const user = await getUserById(req.session.user?._id!);

      res.render("account-setup", {
        username: user?.username,
        displayname: user?.displayName,
        email: user?.email ?? "",
        profilePicture: user?.profilePicture ?? null
      });

    } catch (error : any) {
      console.log(error);
    }
  });

  router.post("/accountsetup", upload.single("photo"), async(req,res)=> {
  try {
    const displayName = req.body.displayName;
    const email = req.body.email;
    const profilePicture = req.file ? req.file.filename : undefined;

    await updateUser(req.session.user?._id!, displayName, email, profilePicture);

    res.redirect("/profilepage");

  } catch (error : any) {
    console.log(error);
  }});

  return router;
};