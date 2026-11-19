const themePicker = document.querySelector("#theme");
const themeStorageKey = "raion-theme";

try {
  if (localStorage.getItem(themeStorageKey) === "light") {
    themePicker.value = "light";
  }
} catch {
  // The selector still works when browser storage is unavailable.
}

document.documentElement.dataset.theme = themePicker.value;
themePicker.closest("label").hidden = false;
themePicker.addEventListener("change", () => {
  document.documentElement.dataset.theme = themePicker.value;
  try {
    localStorage.setItem(themeStorageKey, themePicker.value);
  } catch {
    // The current page keeps the selected theme.
  }
});

const photos = [...document.querySelectorAll(".hero-photos img")];
const frames = [...document.querySelectorAll(".hero-frames button")];
const controls = document.querySelector(".hero-controls");
const pauseButton = document.querySelector(".hero-pause");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const photoInterval = 5000;
let currentPhoto = 0;
let paused = false;
let rotation;

function showPhoto(index) {
  if (index === currentPhoto) return;

  photos.forEach((photo, photoIndex) => {
    photo.classList.toggle("previous", photoIndex === currentPhoto);
    photo.classList.toggle("active", photoIndex === index);
    photo.classList.toggle("reveal", photoIndex === index);
    frames[photoIndex].setAttribute("aria-pressed", String(photoIndex === index));
  });
  currentPhoto = index;
}

function scheduleRotation() {
  window.clearInterval(rotation);
  if (motionPreference.matches || paused || document.hidden) return;

  rotation = window.setInterval(() => {
    const nextPhoto = (currentPhoto + 1) % photos.length;
    if (photos[nextPhoto].complete && photos[nextPhoto].naturalWidth) showPhoto(nextPhoto);
  }, photoInterval);
}

frames.forEach((frame, index) => frame.addEventListener("click", () => {
  showPhoto(index);
  scheduleRotation();
}));
pauseButton.addEventListener("click", () => {
  paused = !paused;
  pauseButton.textContent = paused ? "Reanudar" : "Pausar";
  scheduleRotation();
});
function updateMotionPreference() {
  pauseButton.hidden = motionPreference.matches;
  scheduleRotation();
}
motionPreference.addEventListener("change", updateMotionPreference);
document.addEventListener("visibilitychange", scheduleRotation);
controls.hidden = false;
updateMotionPreference();

const demoForm = document.querySelector("#demo-form");
const demoUrl = document.querySelector("#demo-url");
demoForm.hidden = false;

demoUrl.addEventListener("input", () => demoUrl.setCustomValidity(""));
demoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = new URL(demoUrl.value);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    demoUrl.setCustomValidity("Ingresa un enlace que empiece con https:// o http://.");
    demoUrl.reportValidity();
    return;
  }

  const body = encodeURIComponent("Enlace privado: " + url.href);
  window.location.href = "mailto:javierpoblete@raionrecords.com?subject=%5BRAION%5D%20Demo&body=" + body;
});
