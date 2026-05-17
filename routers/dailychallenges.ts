import { Challenge } from "../types";
import express, { Express } from "express";
import { getChallenges, getChallengeById } from "../data";


export default function challengeRouter(){
    const router = express.Router();

    router.get("/", async (req,res) =>{

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
            
            let challenges : Challenge[] = await getChallenges(q, sortField, sortDirection, category);
        
            res.render("dailychallenges", {
            error : "",
            challenges : challenges,
            q : q,
            sortField : sortField,
            sortDirection : sortDirection
        // USER?
    });
    })

    router.get("/:id", async(req , res) => {
        let id : number = parseInt(req.params.id);
        let challenge : Challenge | undefined = await getChallengeById(id);

    if (!challenge) {
        res.status(404);
        return res.render("404");
    }

    res.render("detailpage", {challenge : challenge});
    });

    // router.post("/", (req,res) =>{
    //     const newChallenge: Challenge = req.body;
    //     challenges.push(newChallenge);
    //     res.json(newChallenge);
    // })

    return router;
}