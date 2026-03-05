let parentballs = document.querySelector(".tutorial-circles")
let balls = parentballs.querySelectorAll("div");

let continueButton = document.querySelector(".continue-button")

for (let index = 0; index < balls.length; index++) {

        continueButton.addEventListener("click",(e) => {
        e.preventDefault();
        balls[1].classList.add("active");

        console.log(`${continueButton} button pressed`);
    } )


    
}