const descriptionBlob = document.querySelector("#blobTarget");
const descriptionBlobPath = descriptionBlob.getAttribute("d");
const descriptionText = document.querySelector(".description__text");
const body = document.querySelector("body");
// Initially set the transition duration to 0s
descriptionBlob.style.setProperty("--d-transition", "0s");

const carsData = await fetch("./js/cars-data.json").then((data) => data.json());

export function loadDescription(slideValue = 1) {
  const targetBlob = document.querySelector(`#blob${slideValue + 1}`);
  const targetBlobPath = targetBlob.getAttribute("d");
  descriptionBlob.setAttribute("d", targetBlobPath);
  blob1.style.setProperty("--d-transition", "0.8s");
  assignCarData(slideValue);
}

export function assignCarData(slideValue = 0) {
  const car = carsData[slideValue];
  descriptionText.textContent = car.description;
  body.style.setProperty("--basic-color", car.basicColor || "");
  body.style.setProperty("--accent-color", car.basicColor || "");
  body.style.setProperty("--accent-color-light", car.basicColor || "");
}

assignCarData();
