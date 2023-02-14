function changeColor() {
    // make 5 different color:
    let color1 = getRandomColor();
    let color2 = getRandomColor();
    let color3 = getRandomColor();
    let color4 = getRandomColor();
    let color5 = getRandomColor();

    // HTML elements for colors
    let colorElements = document.querySelectorAll('.color');
    colorElements[0].style.backgroundColor = color1;
    colorElements[1].style.backgroundColor = color2;
    colorElements[2].style.backgroundColor = color3;
    colorElements[3].style.backgroundColor = color4;
    colorElements[4].style.backgroundColor = color5;

    let hexName = document.querySelectorAll('.hexname');
    hexName[0].innerHTML = color1;
    hexName[1].innerHTML = color2;
    hexName[2].innerHTML = color3;
    hexName[3].innerHTML = color4;
    hexName[4].innerHTML = color5;
}

// random hex code
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });