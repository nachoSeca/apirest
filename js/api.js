/* Declare constants */
/* const API_URL = "http://pokeapi.co/api/v2/pokemon/1"; */
const API_URL = document.querySelector("#url_api");
const SEND = document.querySelector("#send");
const JSONRESULT = document.querySelector("#jsonCode");
const CRUDORESULT = document.querySelector("#crudoCode");
const HISTORY = document.querySelector(".history");
const LOADER = document.getElementById("loader");
const COLORS = {
  OK: "#35c65f",
  ERROR: "red",
};
const DELETEHISTORTY = document.querySelector(".deleteHistory");

/* Recuperar el historial guardado y aplicarlo a los elementos */
const HISTORY_STORAGE = localStorage.getItem("history");
if (HISTORY_STORAGE) {
  HISTORY.innerHTML += HISTORY_STORAGE;
}

/* Use de API_URL */
const makeAPICall = () => {
  const startTime = performance.now();
  let status;
  const METHOD_SELECT = document.getElementById("data");
  const METHOD_VALUE = METHOD_SELECT.value;
  let statusSize = 0;

  /* Mostramos el icono de carga */
  LOADER.style.display = "block";

  const QUERY_PARAMS = {
    method: METHOD_VALUE,
  };
  fetch(API_URL.value, QUERY_PARAMS)
    .then((response) => {
      status = response.status;
      return response.json();
    })
    .then((data) => {
      LOADER.style.display = "none";
      CRUDORESULT.innerHTML = JSON.stringify(data);
      JSONRESULT.innerHTML = JSON.stringify(data, undefined, 2);
      statusSize = JSON.stringify(data).length;
      /* Añadimos el historial de peticiones */
      addHistory(status);
      /* Añadimos el estado de la petición */
      addStatus(status);
      /* Añadimos el tiempo de respuesta de la petición */
      addStatusTime(startTime, status);
      /* Añadimos el tamaño de la petición en megabytes */
      addStatusSize(status, statusSize);
    })
    .catch(() => {
      LOADER.style.display = "none";
      if (QUERY_PARAMS.method === "post") {
        ADDERROR(QUERY_PARAMS.method, JSONRESULT, CRUDORESULT);
      }
      if (QUERY_PARAMS.method === "delete") {
        ADDERROR(QUERY_PARAMS.method, JSONRESULT, CRUDORESULT);
      }
      /* Añadimos el historial de peticiones */
      addHistory(status);
      /* Añadimos el estado de la petición */
      addStatus(status);
      /* Añadimos el tiempo de respuesta de la petición */
      addStatusTime(startTime, status);
      /* Añadimos el tamaño de la petición */
      addStatusSize(status, statusSize);
    });
};

const ADDERROR = (query, json, crudo) => {
  json.innerHTML =
    "Lo sentimos, no se ha podido realizar la petición por método " +
    query +
    ".";
  crudo.innerHTML =
    "Lo sentimos, no se ha podido realizar la petición por método " +
    query +
    ".";
};

/* Función para crear un elemento. Si ya existe, se elimina */
const addElement = (id, status, text) => {
  const parentElement = document.querySelector(id);
  const existingP = parentElement.querySelector("p");

  // Si ya existe un párrafo, lo borramos
  if (existingP) {
    parentElement.removeChild(existingP);
  }

  const newElement = document.createElement("p");
  newElement.innerHTML = text;
  newElement.style.color = status === 200 ? COLORS.OK : COLORS.ERROR;
  parentElement.appendChild(newElement);
};

const addStatus = (status) => {
  const text = status + (status === 200 ? " - OK" : "- ERROR");
  addElement("#status_code", status, text);
};

const addStatusTime = (startTime, status) => {
  const endTime = performance.now();
  const duration = (endTime - startTime).toFixed(1);
  const text = duration + " ms";
  addElement("#status_time", status, text);
};

const addStatusSize = (status, statusSize) => {
  const text = (statusSize / 1024).toFixed(2) + " KB";
  addElement("#status_size", status, text);
};

const addHistory = (status) => {
  let history = document.createElement("p");
  let image = document.createElement("img");
  history.style.textOverflow = "ellipsis";
  history.style.overflow = "hidden";
  history.style.fontWeight = "bold";
  history.style.textDecoration = "underline";
  history.style.cursor = "pointer";
  history.className = "historyText";
  history.textContent = API_URL.value;
  history.style.color = status === 200 ? COLORS.OK : COLORS.ERROR;
  image.src = "./img/deleteIcon.svg";
  image.className = "deleteIcon";
  image.style.display = "inline-block";
  image.style.verticalAlign = "middle";
  history.appendChild(image);
  document.querySelector(".history").appendChild(history);
  localStorage.setItem("history", HISTORY.innerHTML);

  /* Eliminar historial al pinchar en el icono de papelera */
  image.addEventListener("click", () => {
    history.remove();
    localStorage.setItem("history", HISTORY.innerHTML);
  });

  /* Copiar historial en la barra de búsqueda */
  history.addEventListener("click", () => {
    navigator.clipboard
      .writeText(history.textContent)
      .then(function () {
        console.log("Texto copiado al portapapeles");
      })
      .catch(function () {
        console.log("No se pudo copiar el texto");
      });
    localStorage.setItem("history", HISTORY.innerHTML);
  });
};

/* Eliminar el historial */
DELETEHISTORTY.addEventListener("click", () => {
  localStorage.removeItem("history");
  HISTORY.innerHTML = "";
});

document.addEventListener("DOMContentLoaded", () => {
  const deleteIcons = document.querySelectorAll(".deleteIcon");

  deleteIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.parentNode.remove();
      localStorage.setItem("history", JSON.stringify(getHistoryFromDOM()));
    });
  });
});

function getHistoryFromDOM() {
  const historyElements = document.querySelectorAll(".history p");
  const history = Array.from(historyElements).map((p) => p.textContent);
  return history;
}

/* addListener para cuando se haga click o se de al Enter, ejecute la función */

SEND.addEventListener("click", () => {
  makeAPICall();
});

API_URL.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    makeAPICall();
  }
});
