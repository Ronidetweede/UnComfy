import express from "express";
import { getChallenges, getChallengeById, getCompletedChallenges, acceptChallenge, getActiveChallengeById, completeChallenge } from "../data";
import { Challenge } from "../types";
import { Collection, ObjectId } from "mongodb";
import { userChallengesCollection } from "../database";
import multer from "multer";

const upload = multer({ dest: "public/uploads/" });

export function challengeRouter() {
  const router = express.Router();
       
  router.get("/dailychallenges", async (req,res) =>{

            const category = typeof req.query.category === "string" ? req.query.category: "alle";
            const search = req.query.search as string || "";
            
            const challenges = await getChallenges(search, "title", "asc", category);
            const completedChallenges = await getCompletedChallenges(req.session.user!._id?.toString() || "");

            const completedIds = completedChallenges.map(item => item?.id );
            
            const availableChallenges = challenges.filter(c => !completedIds.includes(c.id));
            const doneChallenges = challenges.filter(c => completedIds.includes(c.id));

            res.render("dailychallenges", {
            error : "",
            challenges : challenges,
            completedChallenges: completedIds,
            availableChallenges: availableChallenges,
            search : search,
            categoryFilter: category,
            doneChallenges: doneChallenges
    });
    })


    router.post("/dailychallenges/:id/accept", async(req , res) => {

        await acceptChallenge(new ObjectId(req.session.user?._id), parseInt(req.params.id));

        res.redirect("/currentchallenge");

    });

    router.get("/detailpage/:id", async (req, res) => {

        const challenge = await getChallengeById(parseInt(req.params.id));
        const activeChallenges = await getActiveChallengeById(req.session.user!._id!.toString());
        const completedChallenge  = await getCompletedChallenges(req.session.user!._id!.toString());

        

        const completedIds = completedChallenge.map(item => item.id)

        activeChallenges.activeUserChallenge?.challengeId
        res.render("detailpage", {
            challenge: challenge,
            userChallenge: activeChallenges.activeUserChallenge,
            completedIds: completedIds
        });
    });

    router.get("/submitchallenge/:id", async (req, res) => {

        const activeChallenge = await getActiveChallengeById(new ObjectId(req.session.user?._id).toString());

        res.render("submitchallenge",
            {
                challenge: activeChallenge.activeChallenge,
                userChallenge: activeChallenge.activeUserChallenge,
                currentPath: '/submitchallenge'
            }
        );
    });

    router.post("/submitchallenge/:id", upload.single("photo"),  async (req, res) => {
    try {
        await completeChallenge(req.session.user!._id!.toString(), parseInt(req.params.id as string),req.body.description, req.file?.filename);
        res.redirect("/profilepage");
        
        } catch (error) {
            console.log(error);
    }});
    
    router.get("/currentchallenge", async (req, res) => {


        const activeChallenge = await getActiveChallengeById(new ObjectId(req.session.user?._id).toString());


        res.render("current-challenge", {challenge: activeChallenge.activeChallenge, currentPath: '/currentchallenge'});
    });
    

    // router.post("/", (req,res) =>{
    //     const newChallenge: Challenge = req.body;
    //     challenges.push(newChallenge);
    //     res.json(newChallenge);
    // })

  return router;
}