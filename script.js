const toggleMenu = document.querySelector(".toggle-menu");
const modal = document.querySelector(".modal");
const nav = document.querySelector(".nav");
const sectionsNav = document.querySelector(".nav__left__links");
const sectionsNavClone = sectionsNav.cloneNode(true);
const logging = document.querySelector(".nav__right__links");
const loggingClone = logging.cloneNode(true);
const inputLink = document.querySelector(".input-form");
const boxUrl = document.querySelector(".box-url");
const boxSend = document.querySelector(".btn-form");
var copyPaste;

toggleMenu.addEventListener("click", () => {
  modal.classList.toggle("active");
  modal.appendChild(sectionsNavClone);
  modal.appendChild(loggingClone);
});

boxUrl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputLink.value == "") {
    inputLink.classList.add("errorLink");
  } else {
    inputLink.classList.remove("errorLink");
    boxSend.classList.add("btn-load");
    obtenerLink(inputLink.value);
    console.log("Procesando...");
  }
});

const obtenerLink = async (convertirLink) => {
  try {
    const res = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${convertirLink}`
    );
    data = await res.json();
    pintarShortLink(data);
    console.log(data.result);
    inputLink.value = "";
  } catch (error) {
    alert("Parece que ocurrio un error");
    console.log(error);
    boxSend.classList.remove("btn-load");
  }
};

const pintarShortLink = (link) => {
  const containerInfo = document.querySelector(".short-container");
  const templete = document.querySelector(".templete").content;
  const templeteClone = templete.cloneNode(true);
  const fragment = document.createDocumentFragment();

  templeteClone.querySelector(".short-content__link").textContent =
    link.result.original_link;
  templeteClone.querySelector(".short-content__short-link").textContent =
    link.result.full_short_link;
  templeteClone.querySelector(".short-content__short-link").href =
    link.result.full_short_link;

  fragment.appendChild(templeteClone);
  containerInfo.appendChild(fragment);
  boxSend.classList.remove("btn-load");

  // Copiar Enlace
  copyPaste = document.querySelectorAll(".short-content__copy");
  copyPaste.forEach((element) => {
    element.addEventListener("click", () => {
      let prevSiblings = element.previousElementSibling;
      element.classList.add("active-btn");
      element.textContent = "Copied!";
      setTimeout(() => {
        element.textContent = "Copy";
        element.classList.remove("active-btn");
      }, 3500);

      var aux = document.createElement("input");
      aux.setAttribute("value", prevSiblings.innerHTML);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
    });
  });
};
