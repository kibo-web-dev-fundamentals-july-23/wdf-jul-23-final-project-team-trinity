import { loadDescription } from "./description.js";

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

document.addEventListener("keydown", (e) => {
  const keyPressed = e.key;
  if (keyPressed !== "ArrowLeft" && keyPressed !== "ArrowRight") return;
  let slideValue = keyPressed == "ArrowLeft" ? -1 : 1;
  slideImage(slideValue);
});

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

function updateSwitchCircles(elementIndex) {
  const currentActive = [...switchCirclesBtns].find((el) =>
    el.classList.contains("switch-btn__circles--item-active")
  );
  currentActive.classList.remove("switch-btn__circles--item-active");
  const newActive = switchCirclesBtns[elementIndex];
  newActive.classList.add("switch-btn__circles--item-active");
}
