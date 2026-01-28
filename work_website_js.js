
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

document.addEventListener('resize', () => {
    document.body.style.height = (document.documentElement.scrollHeight + 75) + "px";
    setBordersHeight();
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.height = (document.documentElement.scrollHeight + 75) + "px";

    document.getElementById("bottomText").innerText = (new Date().getFullYear()) + " - Portfolio - Ben Feltham";

    setBordersHeight();
});

//document.body.style.height = (document.documentElement.scrollHeight + 75) + "px";
//setBordersHeight();