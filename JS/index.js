const imgSlideshow = document.querySelector("#imgSlides");
const slideShowImages = document.querySelectorAll(".slideshows");
const switchBtns = document.querySelector("#switchBtns");
let currentSlidevalue = 0;

// Setting even listeners on both of the switchBtns
switchBtns.addEventListener("click", (e) => {
  const switchBtn = e.target.closest("button");
  if (!switchBtn) return;
  const switchValue = +switchBtn.dataset.slideValue;
  slideImage(switchValue);
});

// Function for sliding next img into view
function slideImage(slideValue = 0) {
  currentSlidevalue += slideValue;
  if (currentSlidevalue >= slideShowImages.length) currentSlidevalue = 0;
  if (currentSlidevalue < 0) currentSlidevalue = slideShowImages.length - 1;
  const slideBy = `-${currentSlidevalue * 100}vw`;
  imgSlideshow.style.transform = `translateX(${slideBy})`;
}
