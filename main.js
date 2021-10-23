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
var array = [];

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
    alert("It seems that an error occurred, please try another url");
    console.log(error);
    boxSend.classList.remove("btn-load");
  }
};

const pintarShortLink = (link) => {
  const obj = {
    linkTextOriginal: link.result.original_link,
    linkTextConvertido: link.result.full_short_link,
    linkHrefConvertido: link.result.full_short_link,
  };
  array.push(obj);
  localStorage.setItem("linksCortados", JSON.stringify(array));
  storage();

  boxSend.classList.remove("btn-load");
};
const storage = () => {
  listaDeLinks = JSON.parse(localStorage.getItem("linksCortados"));

  if (listaDeLinks != null) {
    listaDeLinks.forEach((element) => {
      const containerInfo = document.querySelector(".short-container");
      const templete = document.querySelector(".templete").content;
      const templeteClone = templete.cloneNode(true);
      const fragment = document.createDocumentFragment();

      // Crear Link e insertarlo
      templeteClone.querySelector(".short-content__link").textContent =
        element.linkTextOriginal;
      templeteClone.querySelector(".short-content__short-link").textContent =
        element.linkTextConvertido;
      templeteClone.querySelector(".short-content__short-link").href =
        element.linkHrefConvertido;
      fragment.appendChild(templeteClone);
      containerInfo.appendChild(fragment);

      // Copiar Enlace
      const copyPaste = document.querySelectorAll(".short-content__copy");
      copyPaste.forEach((element) => {
        element.addEventListener("click", () => {
          const prevSiblings = element.previousElementSibling;
          element.classList.add("active-btn");
          element.textContent = "Copied!";
          setTimeout(() => {
            element.textContent = "Copy";
            element.classList.remove("active-btn");
          }, 3500);
          navigator.clipboard.writeText(prevSiblings.textContent);
        });
      });
    });
  }
};
window.addEventListener("DOMContentLoaded", storage);
