const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".button");

let result = false;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (result) {
      screen.value = "";
      result = false;
    }
    if (e.target.value === "AC") {
      screen.value = "";
    } else if (e.target.value === "DEL") {
      screen.value = screen.value.slice(0, -1);
    } else if (e.target.value === "=") {
      screen.value = eval(screen.value);
      result = true;
    } else {
      screen.value += e.target.value;
    }
  });
});