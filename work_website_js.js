
setTimeout(100);

//makes the borders height equal the same height as the web page
function setBordersHeight() {
    //document.body.height = "1500px";

    const borders = document.getElementsByClassName("border");

    for (const border of borders) {
        //console.log("set " + border.id + " height to " + height);
        //border.style.height = document.body.height;
        border.style.height = (document.documentElement.scrollHeight) + "px";
    }

    //document.getElementById("bottomBar").style.bottom = document.body.bottom;
}

function maxHeight() {
    return Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
}

//function rgbToHex(r, g, b) {
//    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
//}

//function changeBottomColour() {
//    var gradient = new Rainbow();
//    gradient.setNumberRange(0, document.documentElement.scrollHeight - window.innerHeight);
//    gradient.setSpectrum(rgbToHex(77, 77, 77), rgbToHex(227, 227, 227));

//    document.getElementById("bottomBar").style.backgroundColor = '#' + gradient.colorAt(window.scrollY / 5);
//}

//document.addEventListener("scroll", changeBottomColour);

document.addEventListener('resize', () => {
    document.body.style.height = (document.documentElement.scrollHeight + 75) + "px";
    setBordersHeight();
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.height = (document.documentElement.scrollHeight + 75) + "px";
    setBordersHeight();
});

//document.body.style.height = (document.documentElement.scrollHeight + 75) + "px";
//setBordersHeight();