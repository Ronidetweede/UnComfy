const titles = ["Welcome bij Un(Comfy)!", "Voltooi dagelijkse uitdagingen","Bouw je streaks op", "Verdien ComfyPoints", "Klaar om te starten"];
const text = ["Stap uit je comfortzone en groei met dagelijkse uitdagingen die zijn ontworpen om je te helpen de beste versie van jezelf te worden.", "Ga elke dag leuke en zinvolle uitdagingen aan. Van complimenten geven tot ochtendmeditaties, elke taak helpt je groeien.",
        "Blijf consequent en zie je reeks groeien! Hoe meer dagen je volhoudt, hoe sterker je gewoontes worden.", "Voltooi uitdagingen om ComfyPoints te verdienen! Gebruik ze om speciale functies te ontgrendelen en je voortgang bij te houden.",
        "Jouw reis begint nu. Laten we elke dag benutten en samen de onbekende wereld verkennen!"];


let circles = document.querySelectorAll(".tutorial-circles div");

let returnButton = document.querySelector(".return-button");

let titleTutorial = document.querySelector(".title-tutorial");
let textTutorial = document.querySelector(".text-tutorial");
let imageTutorial = document.querySelector(".img-tutorial");
let counter = 0;

circles[counter].classList.add("active");
imageTutorial.src = `./assets/tutorial/Part${counter}.png`

let continueButton = document.querySelector(".continue-button");

titleTutorial.textContent = titles[counter];
textTutorial.textContent = text[counter];

continueButton.addEventListener("click",(e) => {
e.preventDefault();

counter++;

if (counter === 5) {
        window.location.href = "generator.html";
}

circles[counter].classList.add("active");
circles[counter - 1].classList.remove("active");
circles[counter - 1].classList.add("completed");

imageTutorial.src = `./assets/tutorial/Part${counter}.png`
titleTutorial.textContent = titles[counter];
textTutorial.textContent = text[counter];

returnButton.style.display = "flex";       

console.log(counter);

});

returnButton.addEventListener("click", (e) => {
e.preventDefault();

if (counter != 0) {
  circles[counter - 1].classList.remove("completed");
circles[counter].classList.remove("active");
circles[counter -1].classList.add("active");
counter--;


imageTutorial.src = `./assets/tutorial/Part${counter}.png`
titleTutorial.textContent = titles[counter];
textTutorial.textContent = text[counter];

returnButton.style.display = "flex";       
}
       
});
