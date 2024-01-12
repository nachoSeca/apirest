/* 
    Recuoera el valor de localstorage para cambiar el color de
    los botones con la clase changeColorButton
*/

const savedColor = localStorage.getItem("color");
const savedHoverColor = localStorage.getItem("hoverColor");
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
/* Recuperamos el valor de localstorage para cambiar el color de
    los elementos con la clase changeColor
*/
const CHANGECOLOR = document.querySelectorAll(".changeColor");
if (savedColor) {
  CHANGECOLOR.forEach((element) => {
    element.style.color = savedColor;
    
  });
}