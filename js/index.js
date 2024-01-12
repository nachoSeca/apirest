/* Con esto recuperamos el valor del localStorage */
document.addEventListener("DOMContentLoaded", (event) => {
  const savedMode = localStorage.getItem("mode");
  const savedColor = localStorage.getItem("color");
  const savedHoverColor = localStorage.getItem("hoverColor");
  const CHANGECOLOR = document.querySelectorAll(".changeColor");
  const CHANGECOLORBUTTON = document.querySelectorAll(".changeColorButton");


  if (savedMode) {
    document.body.classList.add(savedMode);
  }
  if (savedColor) {
    CHANGECOLOR.forEach((element) => {
      element.style.color = savedColor;
    });
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

});
