// Import a function from an external module.
import { loadDescription } from "./description.js";
import "./description.js";

// Select DOM elements using querySelector.
const imgSlideshow = document.querySelector("#imgSlides");
const slideShowImages = document.querySelectorAll(".slideshows");
const switchBtns = document.querySelector("#switchBtns");
const switchCircles = document.querySelector("#switchCircles");
const switchCirclesBtns = document.querySelectorAll("#switchCirclesBtn");

let currentSlideValue = 0;

// Setting even listeners on both of the switchBtns
switchBtns.addEventListener("click", (e) => {
  const switchBtn = e.target.closest("button");
  if (!switchBtn) return;
  const switchValue = +switchBtn.dataset.slideValue;
  slideImage(switchValue);
});

// Add a keydown event listener to handle left and right arrow keys for slide navigation.
document.addEventListener("keydown", (e) => {
  const keyPressed = e.key;
  if (keyPressed !== "ArrowLeft" && keyPressed !== "ArrowRight") return;
  let slideValue = keyPressed == "ArrowLeft" ? -1 : 1;
  slideImage(slideValue);
});

// Add an event listener to handle clicks on the slide navigation circles.
switchCircles.addEventListener("click", (e) => {
  const btn = e.target.closest(".switch-btn__circles--item");
  if (!btn) return;
  currentSlideValue = btn.dataset.slideValue - 1;
  slideImage();
});

// Function for sliding next img into view
function slideImage(slideValue = 0) {
  currentSlideValue += slideValue;
  if (currentSlideValue >= slideShowImages.length) currentSlideValue = 0;
  if (currentSlideValue < 0) currentSlideValue = slideShowImages.length - 1;
  const slideBy = `-${currentSlideValue * 100}vw`;
  imgSlideshow.style.transform = `translateX(${slideBy})`;
  updateSwitchCircles(currentSlideValue);
  loadDescription(currentSlideValue);
}

// Function to update the active circle button in the slide navigation.
function updateSwitchCircles(elementIndex) {
  const currentActive = [...switchCirclesBtns].find((el) =>
    el.classList.contains("switch-btn__circles--item-active")
  );
  currentActive.classList.remove("switch-btn__circles--item-active");
  const newActive = switchCirclesBtns[elementIndex];
  newActive.classList.add("switch-btn__circles--item-active");
}

// const imgSlideshow = document.querySelector("#imgSlides");
const viewTeam = document.querySelector("#viewTeam");
const viewTeamText = document.querySelector(".view-team__text");
const viewTeamIcon = document.querySelector("#view-team__icon");
const theTeam = document.querySelector("#theTeam");
let isTeamView = false;

function changeViewTeamText(open = true) {
  viewTeamText.textContent = open ? "Back" : "Click!";
  viewTeamIcon.style.rotate = open ? "180deg" : "0deg";
  isTeamView = open ? true : false;
}

function openTeamView() {
  if (!isTeamView) {
    theTeam.scrollIntoView({ behavior: "smooth" });
    changeViewTeamText();
    isTeamView = true;
  } else {
    imgSlideshow.scrollIntoView({ behavior: "smooth" });
    changeViewTeamText(false);
    isTeamView = false;
  }
}

viewTeam.addEventListener("click", (e) => {
  openTeamView();
});

let options = {
  rootMargin: "0px",
  threshold: 0.3,
};

let observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting !== true) return changeViewTeamText(false);

  changeViewTeamText();
}, options);

observer.observe(theTeam);
