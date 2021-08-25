const toggleMenu = document.querySelector(".toggle-menu");
const modal = document.querySelector(".modal");
const nav = document.querySelector(".nav");
const sectionsNav = document.querySelector(".nav__left__links");
const sectionsNavClone = sectionsNav.cloneNode(true);
const logging = document.querySelector(".nav__right__links");
const loggingClone = logging.cloneNode(true);

toggleMenu.addEventListener("click", () => {
  modal.classList.toggle("active");
  modal.appendChild(sectionsNavClone);
  modal.appendChild(loggingClone);
});

fetch("https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html").then(response => {
    return response
})