

//for the creation of my elements

function createFragment(itemHTML) {
    const parser = new DOMParser();
    return parser.parseFromString(itemHTML, 'text/html').body.firstElementChild;
}

function makeStruct(variables) {
    var variables = variables.split(' ');
    var count = variables.length;
    function constructor() {
        for (var i = 0; i < count; i++) {
            this[variables[i]] = arguments[i];
        }
    }
    return constructor;
}

var Item = makeStruct("displayType videoPath title text");
var projectsToLoad = [
    new Item("horizontalDisplay", "Assets/videos/merge/mergeVideo.mp4", "Idle Clicker", "A simple idle clicker game. This project helped me understand the usefulness of static scripts and variables, as well as creating an interactable world for the player."),
    new Item("horizontalDisplay", "Assets/videos/horror/horrorVideo.mp4", "Procedural Dungeons", "Generate unique hallways each run! This project helped develop my problem solving mind, as I wrapped my head around difficult math."),
    new Item("horizontalDisplay", "Assets/videos/bounce/bounceVideo.mp4", "Idle Bouncer", "A visually simple idle game. Combines complex physics calculations and vectors in order to give each bounce a satisfying and somewhat realistic feel."),
    new Item("horizontalDisplay", "Assets/videos/fingerGun/landingPageVideo.mp4", "3D FPS Movement", "A satisfying FPS. Smooth movement and a satisfying explosion when getting a shot just right. These both took many hours and a lot of testing to become satisfying enough for the average user."),
    new Item("horizontalDisplay", "Assets/videos/timeHeist/landingPageHeistVideo.mp4", "Multiple interactions", "A potentially confusing premise. Tracking each button the user presses and for how long it is pressed in order to allow the user to solve a variety of puzzles."),
    new Item("horizontalDisplay", "Assets/videos/multiplayer/multiplayerLandingPageVideo.mp4", "Multiplayer Shooter", "This is a simple 2D shooter game. This project taught me that you need to sync pretty much everything up, and they all have their own seperate ways of getting synced. The process was probably the longest I've ever been through, but the end result works perfectly."),
    new Item("verticalDisplay", "Assets/videos/flashcards/flashcardsLandingPageVideo.mp4", "Revision Application", "A useful phone revision app. Using a lot of reflection to be able to load in as many topics as I please and has been made in a way that I am able to easily add new topics and subjects, without the risk of everything breaking."),

]

for (let projectIndex = 0; projectIndex < projectsToLoad.length; projectIndex++) {
    const splitter = createFragment(`<div class="splitter"></div>`);
    const projectItem = projectsToLoad[projectIndex];

    const newItem = createFragment(`<div class="${projectItem.displayType}"> <video class="${projectItem.displayType}Video" autoplay muted loop> <source src="${projectItem.videoPath}"> </video> <div class="displayTextHolder"> <h2 class="displayTitle">${projectItem.title}</h2> <p class="displayText">${projectItem.text}</p> </div> </div>`);

    document.getElementById("newDisplayContainer").appendChild(newItem);

    document.getElementById("newDisplayContainer").appendChild(splitter);
}

//end creation



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


//document.addEventListener('resize', () => {
//    document.body.style.height = (document.documentElement.scrollHeight + 75) + "px";
//    setBordersHeight();
//});

document.addEventListener('DOMContentLoaded', () => {
    //document.body.style.height = document.documentElement.scrollHeight + "px";



    document.getElementById("bottomText").innerText = (new Date().getFullYear()) + " - Portfolio - Ben Feltham";

    //setBordersHeight();
});

//document.body.style.height = (document.documentElement.scrollHeight + 75) + "px";
//setBordersHeight();