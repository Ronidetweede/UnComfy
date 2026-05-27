import dotenv from "dotenv";
import express, { Express } from "express";
import path from "node:path";
import { getActiveChallengeById, getChallengeById, getChallenges, getCompletedChallenges, getLeaderBoard, getUserById } from "./data";
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

app.use(secureMiddleware, challengeRouter());

app.get("/leaderboard",secureMiddleware,async( req,res) =>{

    let allUsers = await getLeaderBoard();

    res.render("leaderboard", {users: allUsers});
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

    const completedChallenges = await getCompletedChallenges(req.session.user!._id!.toString());
    const user = await getUserById(req.session.user?._id!);

    res.render("profile-page",
        {
            username : req.session.user?.displayName,
            points: user?.points,
            challenges: completedChallenges,
            profilePicture: user?.profilePicture ?? null
        });
});

app.get("/rewards",secureMiddleware,(req,res) =>{
    res.render("rewards", { currentPath: '/rewards' });
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