const imgSlideshow = document.querySelector("#imgSlides");
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
