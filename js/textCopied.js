const COPIEDJSON = document.getElementById("copyJson");
const COPIEDCRUDO = document.getElementById("copyCrudo");

function copyTextToClipboard(elementId) {
  const textCopied = document.getElementById(elementId).value;
  // Copiar el texto al portapapeles
  navigator.clipboard
    .writeText(textCopied)
    .then(function () {
      console.log("Texto copiado al portapapeles");
    })
    .catch(function () {
      console.log("No se pudo copiar el texto");
    });
}

COPIEDJSON.addEventListener("click", () => {
  copyTextToClipboard("jsonCode");
  
});

COPIEDCRUDO.addEventListener("click", () => {
  
  copyTextToClipboard("crudoCode");
});

