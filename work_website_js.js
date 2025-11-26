setTimeout(100); //allows the css to load

//makes the borders height equal the same height as the web page
function setBordersHeight() {
    document.body.height = "1500px";

    const borders = document.getElementsByClassName("border");

    for (const border of borders) {
        console.log("set " + border.id + " height to " + document.body.height);
        border.style.height = document.body.height;
    }
}

setBordersHeight();