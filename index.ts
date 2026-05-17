import express, { Express } from "express";
import path from "node:path";
import { getChallengeById, getChallenges } from "./data";
import { Challenge } from "./types";
import challengeRouter from "./routers/dailychallenges";

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname , 'views'));

app.set("port", process.env.PORT || 3000);

app.get("/",(req,res) =>{

    res.render("index");
});

app.get("/accountsetup",( req,res) =>{

    res.render("account-setup")
});

app.get("/achievements",( req,res) =>{
    res.render("achievements");
});

app.get("/avatar",( req,res) =>{
    res.render("avatar");
});

// ID MOET HIERBIJ PER CHALLENGE
app.get("/currentchallenge",( req,res) =>{
    res.render("current-challenge");
});

app.use("/dailychallenges", challengeRouter());

app.get("/generator2",( req,res) =>{


    res.render("generator-part2");
});

app.post("/generator2",( req,res) =>{

    // Logica voor de antwoorden op te slagen.

});


app.get("/generator",( req,res) =>{
    res.render("generator");
});

app.get("/leaderboard",( req,res) =>{
    res.render("leaderboard");
});

app.get("/login",( req,res) =>{
    res.render("login");
});

app.get("/menu",( req,res) =>{
    res.render("menu");
});

app.get("/privacypolicy",( req,res) =>{
    res.render("privacy-policy");
});

app.get("/profilepage",( req,res) =>{
    res.render("profile-page");
});

app.get("/rewards",( req,res) =>{
    res.render("rewards");
});

app.get("/settings",( req,res) =>{
    res.render("settings");
});

app.get("/submitchallenge",( req,res) =>{
    res.render("submitchallenge");
});

app.get("/subscription",( req,res) =>{
    res.render("subscription");
});

app.get("/termsofservice",( req,res) =>{
    res.render("terms-of-service");
});

app.get("/tutorial",( req,res) =>{
    res.render("tutorial");
});

app.listen(app.get("port"), async() => {
    try {
        console.log("Server started on http://localhost:" + app.get('port'));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});