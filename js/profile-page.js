"use strict";

const timelineButton = document.getElementById("timeline-button");
const galleryButton = document.getElementById("gallery-button");
const achievements = document.getElementById("achievements");
const timelineIcon = document.getElementById("timeline-icon");
const galleryIcon = document.getElementById("gallery-icon")

timelineButton.addEventListener("click", () => {
  achievements.classList.remove("gallery");
  achievements.classList.add("timeline");

  timelineButton.classList.add("active");
  galleryButton.classList.remove("active");

  timelineIcon.src = "assets/icons/icon-timeline.png";
  galleryIcon.src = "assets/icons/icon-gallery-gray.png";
});

galleryButton.addEventListener("click", () => {
  achievements.classList.remove("timeline");
  achievements.classList.add("gallery");

  galleryButton.classList.add("active");
  timelineButton.classList.remove("active");

  galleryIcon.src = "assets/icons/icon-gallery.png";
  timelineIcon.src = "assets/icons/icon-timeline-gray.png";
});