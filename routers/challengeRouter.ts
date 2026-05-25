import express from "express";
import { getChallenges, getChallengeById, getCompletedChallengesIds, acceptChallenge, getActiveChallengeById } from "../data";
import { Challenge } from "../types";
import { ObjectId } from "mongodb";


export function challengeRouter() {
  const router = express.Router();
       
  router.get("/dailychallenges", async (req,res) =>{

            const category = typeof req.query.category === "string" ? req.query.category: "alle";
            const q: string = typeof req.query.q === "string" ? req.query.q : "";
            const sortField : string = typeof req.query.sortField === "string" ? req.query.sortField : "title";
            const sortDirection: string = typeof req.query.sortDirection === "string" ? req.query.sortDirection : "asc";
        
            //Dit kan fout zijn, bekijk naamgeving. Zien of het echt sorteert
            if (sortField !== "title" && sortField !== "social" && sortField !== "physically" && sortField !== "public" && sortField !== "mental") {
                return res.status(400).send("Invalide Sorteer Veld")
            }
            if (sortDirection !== "asc" && sortDirection !== "desc") {
                return res.status(400).send("Invalid sorteer richting")
            }
            
            const username : string = req.session.user!.username;

            const challenges : Challenge[] = await getChallenges(q, sortField, sortDirection, category);
            const completedChallenges = await getCompletedChallengesIds(username);

            // Bekijk hoeveel challenges er beschikbaar zijn en hoeveel er al gedaan zijn? User logica? 
            
            res.render("dailychallenges", {
            error : "",
            challenges : challenges,
            q : q,
            sortField : sortField,
            sortDirection : sortDirection,
            completedChallenges: completedChallenges
    });
    })


    router.post("/dailychallenges/:id/accept", async(req , res) => {

        await acceptChallenge(new ObjectId(req.session.user?._id), parseInt(req.params.id));

        res.redirect("/currentchallenge");

    });

    router.get("/detailpage/:id", async (req, res) => {

        const challenge = await getChallengeById(parseInt(req.params.id));
        const activeChallenge = await getActiveChallengeById(new ObjectId(req.session.user?._id).toString());
        
        res.render("detailpage", {
            challenge: challenge,
            userChallenge: activeChallenge.activeUserChallenge
        });
    });

    router.get("/submitchallenge/:id", async (req, res) => {

        res.render("submitchallenge");
    });
    
    router.get("/currentchallenge", async (req, res) => {


        const activeChallenge = await getActiveChallengeById(new ObjectId(req.session.user?._id).toString());


        res.render("current-challenge", {challenge: activeChallenge.activeChallenge});
    });
    

    // router.post("/", (req,res) =>{
    //     const newChallenge: Challenge = req.body;
    //     challenges.push(newChallenge);
    //     res.json(newChallenge);
    // })

  return router;
};