"use strict";

const weekButton = document.getElementById("week-button");
const monthButton = document.getElementById("month-button");

weekButton.addEventListener("click", () => {
  weekButton.classList.add("active");
  monthButton.classList.remove("active");
});

monthButton.addEventListener("click", () => {
  monthButton.classList.add("active");
  weekButton.classList.remove("active");
});
