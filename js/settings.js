const savedMode = localStorage.getItem("mode");
if (savedMode) {
  document.body.classList.add(savedMode);
}

// Recuperar el color guardado y aplicarlo a los elementos
const CHANGECOLOR = document.querySelectorAll(".changeColor");
const savedColor = localStorage.getItem("color");
const savedHoverColor = localStorage.getItem("hoverColor");
if (savedColor) {
  CHANGECOLOR.forEach((element) => {
    element.style.color = savedColor;
  });
}

const CHANGECOLORBUTTON = document.querySelectorAll(".changeColorButton");
if (savedColor) {
  CHANGECOLORBUTTON.forEach((element) => {
    element.style.backgroundColor = savedColor;
    element.addEventListener("mouseover", () => {
      element.style.background =
        savedHoverColor;
    });
    element.addEventListener("mouseout", () => {
      element.style.background = savedColor;
    });
  });
}

// Cambiar el color y guardarlo cuando se hace clic en los botones
const GREEN = document.getElementById("green");
const TEAL = document.getElementById("teal");
const BLUE = document.getElementById("blue");
const INDIGO = document.getElementById("indigo");
const PURPLE = document.getElementById("purple");
const YELLOW = document.getElementById("yellow");
const ORANGE = document.getElementById("orange");
const RED = document.getElementById("red");
const PINK = document.getElementById("pink");

function changeColor(color, hoverColor) {
  CHANGECOLOR.forEach((element) => {
    element.style.color = color;
  });
  CHANGECOLORBUTTON.forEach((element) => {
     element.style.backgroundColor = color;
     element.addEventListener("mouseover", () => {
      element.style.background =
        hoverColor;
    });
    element.addEventListener("mouseout", () => {
      element.style.background = color;
    });
  });
  localStorage.setItem("color", color);
  localStorage.setItem("hoverColor", hoverColor); 
}

GREEN.addEventListener("click", () => {
  changeColor("#35c65f", "linear-gradient(90deg, rgba(53,198,95,1) 0%, rgba(0,0,0,1) 100%)");
});

TEAL.addEventListener("click", () => {
  changeColor("#32b8a6", "linear-gradient(90deg, rgba(50,184,166,1) 0%, rgba(0,0,0,1) 100%)");
});

BLUE.addEventListener("click", () => {
  changeColor("#3b83f6", "linear-gradient(90deg, rgba(59,131,246,1) 0%, rgba(0,0,0,1) 100%)");
});

INDIGO.addEventListener("click", () => {
  changeColor("#6367f1", "linear-gradient(90deg, rgba(99,103,241,1) 0%, rgba(0,0,0,1) 100%)");
});

PURPLE.addEventListener("click", () => {
  changeColor("#a956f7", "linear-gradient(90deg, rgba(169,86,247,1) 0%,rgba(0,0,0,1) 100%)");
});

YELLOW.addEventListener("click", () => {
  changeColor("#eab307", "linear-gradient(90deg, rgba(234,179,7,1) 0%, rgba(0,0,0,1) 100%)");
});

ORANGE.addEventListener("click", () => {
  changeColor("#f97317", "linear-gradient(90deg, rgba(249,115,23,1) 0%, rgba(0,0,0,1) 100%)");
});

RED.addEventListener("click", () => {
  changeColor("#ef4444", "linear-gradient(90deg, rgba(239,68,68,1) 0%, rgba(0,0,0,1) 100%)");
});

PINK.addEventListener("click", () => {
  changeColor("#ec489a", "linear-gradient(90deg, rgba(236,72,154,1) 0%, rgba(0,0,0,1) 100%)");
});

const TEXTDARK = document.getElementById("textDark");
const TEXTLIGHT = document.getElementById("textLight");

// Cambiar el modo y guardarlo cuando se hace clic en el botón
let darkmode = document.getElementById("darkMode");

if (document.body.classList.contains("white-mode")) {
  darkmode.checked = true;
  TEXTDARK.style.display = "none";
  TEXTLIGHT.style.display = "block";
}

darkmode.addEventListener("click", () => {
  document.body.classList.toggle("white-mode");

  // Guardar el modo actual en localStorage
  if (document.body.classList.contains("white-mode")) {
    TEXTDARK.style.display = "none";
    TEXTLIGHT.style.display = "block";
    localStorage.setItem("mode", "white-mode");
  } else {
    TEXTDARK.style.display = "block";
    TEXTLIGHT.style.display = "none";
    localStorage.setItem("mode", "");
  }
});
