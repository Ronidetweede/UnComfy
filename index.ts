import dotenv from "dotenv";
import express, { Express } from "express";
import path from "node:path";
import { getActiveChallengeById, getChallengeById, getChallenges } from "./data";
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



app.get("/achievements",secureMiddleware,( req,res) =>{
    res.render("achievements");
});

app.get("/avatar",secureMiddleware,( req,res) =>{
    res.render("avatar");
});

app.use(secureMiddleware, challengeRouter());

app.get("/generator2",secureMiddleware,( req,res) =>{


    res.render("generator-part2");
});

app.post("/generator2",secureMiddleware,( req,res) =>{

    // Logica voor de antwoorden op te slagen.

});


app.get("/generator",secureMiddleware,( req,res) =>{
    res.render("generator");
});

app.get("/leaderboard",secureMiddleware,( req,res) =>{
    res.render("leaderboard");
});

app.get("/menu",secureMiddleware, async( req,res) =>{

    const activeChallenge = await getActiveChallengeById(new ObjectId(req.session.user?._id).toString());
    
    res.render("menu", {
        challenge: activeChallenge.activeChallenge
    });
});

app.get("/privacypolicy",secureMiddleware,( req,res) =>{
    res.render("privacy-policy");
});

app.get("/profilepage",secureMiddleware,( req,res) =>{


    res.render("profile-page",
        {
            username : req.session.user?.displayName,
            points: req.session.user?.points,
            compChallenges: req.session.user
        });
});

app.get("/rewards",secureMiddleware,( req,res) =>{
    res.render("rewards");
});

app.get("/settings",secureMiddleware,( req,res) =>{
    res.render("settings");
});

app.get("/submitchallenge",secureMiddleware,( req,res) =>{
    res.render("submitchallenge");
});

app.get("/subscription",secureMiddleware,( req,res) =>{
    res.render("subscription");
});

app.get("/termsofservice",secureMiddleware,( req,res) =>{
    res.render("terms-of-service");
});

app.get("/tutorial",secureMiddleware,( req,res) =>{
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