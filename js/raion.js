const slides = [...document.querySelectorAll(".hero-slides img")];
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let currentSlide = 0;
let slideshow;

function updateSlideshow() {
  window.clearInterval(slideshow);
  if (motionPreference.matches || slides.length < 2 || document.hidden) return;

  slideshow = window.setInterval(() => {
    const nextSlide = (currentSlide + 1) % slides.length;
    if (!slides[nextSlide].complete || !slides[nextSlide].naturalWidth) return;
    slides[currentSlide].classList.remove("active");
    slides[nextSlide].classList.add("active");
    currentSlide = nextSlide;
  }, 5000);
}

motionPreference.addEventListener("change", updateSlideshow);
document.addEventListener("visibilitychange", updateSlideshow);
updateSlideshow();

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
