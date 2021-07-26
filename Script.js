
//const MAXHEIGTH = 100;
//const MAXWIDTH = Math.floor(document.width * 0.4);
let curColor = "black";
const numColors = 9;
let height = 34;
let width = 90;
let pixels = null;

// Deletes an element
function clear(elementID) {
    document.getElementById(elementID).innerHTML = "";
}

// Takes grid div-element and fills it with pixel divs
function fillTable(grid) {
    for (var i=0; i<height; i++) {
        for (var j=0; j<width; j++) {
            let pixel = document.createElement("div");
            pixel.className = "pixel";
            grid.appendChild(pixel);
        }
        document.getElementById("grid").innerHTML += "<br>";
    }
}

// Sets all pixels to white, resetting the image
function resetGrid() {
    pixels = document.getElementsByClassName("pixel");
    for (var i=0; i<pixels.length; i++) {
        pixels[i].style.backgroundColor = "white";
    }
}

// Works right when the page is loaded
function starting(){
    // The page is loaded with an existing standard 34*90 grid
    const grid = document.getElementById("grid");
    fillTable(grid);
    // Add click event as the pixel is created. On click -> change color to curColor
    pixels = document.getElementsByClassName("pixel");
    for (var i=0; i<height*width; i++) {
        pixels[i].addEventListener("click", changePixelColor);
        pixels[i].addEventListener("mousemove", changePixelColor);
    }

    // Adding event listeners to each color option
    let options = document.getElementsByClassName("color");
    for (var i = 0; i<numColors; i++) {
        options[i].addEventListener("click", changeColor);
    }
    return grid;
}

// Sets the curColor as the color of a clicked pallet option
function changeColor(event) {
    curColor = window.getComputedStyle(event.target).getPropertyValue("background-color");
    document.getElementById("curColor").style.setProperty("background-color", curColor);
}

function resizeGrid() {
    // TODO change resetting to changing size, so that clear() won't reset the pic
    clear("grid");
    const grid = document.getElementById("grid");
    height = document.getElementById("height").value;
    width = document.getElementById("width").value;
    fillTable(grid);
    let pixels = document.getElementsByClassName("pixel");

    // Add click event as the pixel is created. On click -> change color to curColor
    for (var i=0; i<height*width; i++) {
        pixels[i].addEventListener("click", changePixelColor);
        pixels[i].addEventListener("mousemove", changePixelColor);
    }
    return grid;
}

function buttonPressed(event) {
    if (event.buttons == null)
        return event.which != 0;
    else
        return event.buttons != 0;
}

function changePixelColor(event){
    if (!buttonPressed(event)) {
        window.removeEventListener("mousemove", changePixelColor);
    }
    else {
        event.target.style.setProperty("background-color", curColor);
        event.target.style.setProperty("border-color", curColor);
    }
}