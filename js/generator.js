"use strict";

const assessments = [
  {
    category: "fysiek",
    titel: "Hoe comfortabel ben je met fysieke uitdagingen?",
    desc: "Denk aan beweging, sport of buitenactiviteiten",
    beginner: "Beginner - Ik hou van rustige activiteiten",
    medium: "Gemiddeld - Ik ben redelijk actief",
    hard: "Gevorderd - Ik verleg graag mijn grenzen"
  },
  {
    category: "mentaal",
    titel: "Hoe sta je tegenover mentale uitdagingen?",
    desc: "Zoals puzzels, probleemoplossing of het leren van nieuwe concepten",
    beginner: "Beginner - Ik geef de voorkeur aan simpele taken",
    medium: "Gemiddeld - Ik geniet van wat hersenwerk",
    hard: "Gevorderd - Ik bloei op bij complexiteit"
  },
  {
    category: "sociaal",
    titel: "Wat is je comfortniveau bij sociale uitdagingen?",
    desc: "Nieuwe mensen ontmoeten, spreken in het openbaar of groepsactiviteiten",
    beginner: "Beginner - Ik doe liever dingen alleen",
    medium: "Gemiddeld - Kleine groepen zijn prima",
    hard: "Gevorderd - Ik hou van sociale interactie"
  },
  {
    category: "creatief",
    titel: "Hoe avontuurlijk ben je met creatieve activiteiten?",
    desc: "Kunst, muziek, schrijven of andere vormen van expressie",
    beginner: "Beginner - Ik ben niet erg creatief",
    medium: "Gemiddeld - Ik doe soms wat creatiefs",
    hard: "Gevorderd - Creativiteit is mijn passie"
  },
  {
    category: "nieuwe_vaardigheden",
    titel: "Hoe graag leer je nieuwe vaardigheden?",
    desc: "Technische skills, talen of praktische vaardigheden",
    beginner: "Beginner - Ik blijf liever op bekend terrein",
    medium: "Gemiddeld - Ik sta open voor nieuwe dingen",
    hard: "Gevorderd - Ik ben altijd aan het leren"
  },
  {
    category: "routine",
    titel: "Hoe bereid ben je om je routine te doorbreken?",
    desc: "Nieuwe ervaringen proberen, nieuwe plekken bezoeken of gewoontes veranderen",
    beginner: "Beginner - Ik hou van mijn routine",
    medium: "Gemiddeld - Af en toe verandering is goed",
    hard: "Gevorderd - Verandering geeft me energie"
  }
];

let questionNumber = document.querySelector(".question-Number");
let percentageNumber = document.querySelector(".percentage-Question");

let title = document.querySelector(".title-Question");
let desc = document.querySelector(".desc-Question");

let CardContainers = document.querySelectorAll(".option-Card");
let radioCards = document.querySelectorAll(".option-Card div");
let textCards = document.querySelectorAll(".option-Card p")

let nextButton = document.querySelector(".generator-Button");

let questionCards = document.querySelector(".questions-Container");

let counter = 0;
textCards[0].textContent = assessments[counter].beginner;
textCards[1].textContent = assessments[counter].medium;
textCards[2].textContent = assessments[counter].hard;

CardContainers.forEach(card =>{

    card.addEventListener('click', () => {

        let radioCard = card.querySelector("div"); 

        CardContainers.forEach(card => {card.classList.remove("active")});
        radioCards.forEach(radio => {radio.classList.remove("active")})

        card.classList.add("active");

        radioCard.classList.add("active");

        nextButton.classList.add("active")

    })

})    
nextButton.addEventListener("click", (e) => {

    if (nextButton.classList.contains("active") && counter < 5) {
        counter++;
        
        questionNumber.textContent = `Vraag ${counter + 1} van 6`;
        percentageNumber.textContent = `${Math.round((counter + 1) * 16.66666667)}%`;
        title.textContent = assessments[counter].titel;
        desc.textContent = assessments[counter].desc;
        textCards[0].textContent = assessments[counter].beginner;
        textCards[1].textContent = assessments[counter].medium;
        textCards[2].textContent = assessments[counter].hard;

        CardContainers.forEach(card => { 
            card.classList.remove("active")})
        radioCards.forEach(radio => {radio.classList.remove("active")})

        nextButton.classList.remove("active");
    }else if(nextButton.classList.contains("active")  && counter === 5){
        window.location.href = "generator.html";

    }
    
 
})

