import dotenv from "dotenv";
import express, { Express } from "express";
import path from "node:path";
import { getActiveChallengeById, getChallengeById, getChallenges, getCompletedChallenges } from "./data";
import { Challenge } from "./types";
import { loginRouter } from "./routers/loginRouter";
import { registerRouter } from "./routers/registerRouter";
import { connect } from "./database";
import session from "./session";
import { secureMiddleware } from "./secureMiddleware";
import { challengeRouter } from "./routers/challengeRouter";
import { ObjectId } from "mongodb";

dotenv.config();

const app : Express = express();

app.use(session);

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname , 'views'));


app.use(loginRouter());
app.use(registerRouter());

app.set("port", process.env.PORT || 3000);

app.get("/",(req,res) =>{
    if (req.session.user) {
        res.redirect("/menu");
    }else{
        res.render("index");
    }
});

app.get("/dailychallenges", secureMiddleware, async (req, res) => {
    const category = req.query.category as string || "Alle";
    const search = req.query.search as string || "";

    const challenges = await getChallenges(search, "title", "asc", category);
    const completedChallenges = await getCompletedChallenges(req.session.user!._id?.toString() || "");

    res.render("dailychallenges", {
        challenges,
        categoryFilter: category,
        search,
        completedChallenges
    });
});

app.use(secureMiddleware, challengeRouter());

app.get("/generator2",secureMiddleware,(req,res) =>{
    res.render("generator-part2");
});

app.post("/generator2",secureMiddleware,(req,res) =>{

    // Logica voor de antwoorden op te slagen.

});


app.get("/generator",secureMiddleware,(req,res) =>{
    res.render("generator");
});

app.get("/leaderboard",secureMiddleware,(req,res) =>{
    res.render("leaderboard", { currentPath: '/leaderboard' });
});

app.get("/menu",secureMiddleware, async( req,res) =>{

    const activeChallenge = await getActiveChallengeById(new ObjectId(req.session.user?._id).toString());
    
    res.render("menu", {
        challenge: activeChallenge.activeChallenge,
        currentPath: '/menu'
    });
});

app.get("/privacypolicy",secureMiddleware,(req,res) =>{
    res.render("privacy-policy");
});

app.get("/profilepage",secureMiddleware, async (req,res) =>{

    const completedChallenges = await getCompletedChallenges(new ObjectId(req.session.user?._id).toString());

    res.render("profile-page",
        {
            username : req.session.user?.displayName,
            points: req.session.user?.points,
            challenges: completedChallenges,
            currentPath: '/profilepage'
        });
});

app.get("/rewards",secureMiddleware,(req,res) =>{
    res.render("rewards", { currentPath: '/rewards' });
});

app.get("/settings",secureMiddleware,(req,res) =>{
    res.render("settings");
});

app.get("/submitchallenge",secureMiddleware,(req,res) =>{
    res.render("submitchallenge", { currentPath: '/submitchallenge' });
});

app.get("/subscription",secureMiddleware,(req,res) =>{
    res.render("subscription");
});

app.get("/termsofservice",secureMiddleware,(req,res) =>{
    res.render("terms-of-service");
});

app.get("/tutorial",secureMiddleware,(req,res) =>{
    res.render("tutorial");
});

app.listen(app.get("port"), async() => {
    try {
        await connect();
        console.log("Server started on http://localhost:" + app.get('port'));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});