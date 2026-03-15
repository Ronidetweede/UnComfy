"use strict";

import challenges from "../assets/jsonChallenges.json" with  {type : 'json'};

const cardLocation = document.querySelector(".dailyCards");


challenges.forEach(challenge => {


    let card = document.createElement("div");
    card.classList.add("challengeCard");

    // Card Image + Pills
    let cardImage = document.createElement("div");
    cardImage.classList.add("image-challenge");

    let imagePills = document.createElement("div");
    imagePills.classList.add("difficulity-pill");

    // Pills information
    let difficulityPill = document.createElement("h3");
    difficulityPill.textContent = challenge.difficulty;

    let categoryPill = document.createElement("h3");
    categoryPill.textContent = challenge.category;

    imagePills.appendChild(difficulityPill);
    imagePills.appendChild(categoryPill);

    // Information Card
    let infoCard = document.createElement("div");
    infoCard.classList.add("info-Card");

    let titleCard = document.createElement("h2");
    titleCard.classList.add("title-challenge");
    titleCard.textContent = challenge.title;

    // Location + People
    let extraInfo = document.createElement("div");
    extraInfo.classList.add("extra-InfoCard");

    let locationCard = document.createElement("p");
    locationCard.classList.add("location-name");
    locationCard.textContent = ` ${challenge.location}`;

    let amountPeople = document.createElement("p");
    amountPeople.classList.add("people-joined");
    amountPeople.textContent = ` ${challenge.joined_count} mensen`;

    // Logo's extra people + location

    let locationIcon = document.createElement("img");
    locationIcon.src = "assets/icons/green-location.png";

    locationCard.prepend(locationIcon);

    let peopleIcon = document.createElement("img");
    peopleIcon.src = "assets/icons/green-people.png"
    
    amountPeople.prepend(peopleIcon);

    // Button Accept
    const cardButton = document.createElement("button");
    cardButton.classList.add("card-button");
    cardButton.textContent = "Meer info";

    
    cardImage.appendChild(imagePills);


    extraInfo.appendChild(locationCard);
    extraInfo.appendChild(amountPeople);

    infoCard.appendChild(titleCard);
    infoCard.appendChild(extraInfo);
    infoCard.appendChild(cardButton);

    card.appendChild(cardImage);
    card.appendChild(infoCard);

    cardLocation.appendChild(card);
        
});

