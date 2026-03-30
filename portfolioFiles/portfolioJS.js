

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

var Item = makeStruct("displayType videoPath posterPath title text");
var projectsToLoad = [
    new Item("horizontalDisplay", "../Assets/portfolioAssets/merge/mergeVideo.mp4", "../Assets/portfolioAssets/merge/mergePoster.png", "Idle Clicker", "A simple idle clicker game. This project helped me understand the usefulness of static scripts and variables, as well as creating an interactable world for the player."),
    new Item("horizontalDisplay", "../Assets/portfolioAssets/horror/horrorVideo.mp4", "../Assets/portfolioAssets/horror/horrorPoster.png", "Procedural Dungeons", "Generate unique hallways each run! This project helped develop my problem solving mind, as I wrapped my head around difficult math."),
    new Item("horizontalDisplay", "../Assets/portfolioAssets/bounce/bounceVideo.mp4", "../Assets/portfolioAssets/bounce/bouncePoster.png", "Idle Bouncer", "A visually simple idle game. Combines complex physics calculations and vectors in order to give each bounce a satisfying and somewhat realistic feel."),
    new Item("horizontalDisplay", "../Assets/portfolioAssets/fingerGun/fingerGunVideo.mp4", "../Assets/portfolioAssets/fingerGun/fingerGunPoster.png", "3D FPS Movement", "A satisfying FPS. Smooth movement and a satisfying explosion when getting a shot just right. These both took many hours and a lot of testing to become satisfying enough for the average user."),
    new Item("horizontalDisplay", "../Assets/portfolioAssets/timeHeist/heistVideo.mp4", "../Assets/portfolioAssets/timeHeist/heistPoster.png", "Multiple interactions", "A potentially confusing premise. Tracking each button the user presses and for how long it is pressed in order to allow the user to solve a variety of puzzles."),
    new Item("horizontalDisplay", "../Assets/portfolioAssets/multiplayer/multiplayerVideo.mp4", "../Assets/portfolioAssets/multiplayer/multiplayerPoster.png", "Multiplayer Shooter", "This is a simple 2D shooter game. This project taught me that you need to sync pretty much everything up, and they all have their own seperate ways of getting synced. The process was probably the longest I've ever been through, but the end result works perfectly."),
    new Item("verticalDisplay", "../Assets/portfolioAssets/flashcards/flashcardsVideo.mp4", "../Assets/portfolioAssets/flashcards/flashcardsPoster.png", "Revision Application", "A useful phone revision app. Using a lot of reflection to be able to load in as many topics as I please and has been made in a way that I am able to easily add new topics and subjects, without the risk of everything breaking."),
    new Item("horizontalDisplay", "../Assets/portfolioAssets/textVisuals/textVisualsVideo.mp4", "../Assets/portfolioAssets/textVisuals/textVisualsPoster.png", "Image From Text", "Load custom images and convert them into an image made up of a specific text, binary numbers, or random alphanumeric characters. This program allows for the user to rearrange the images around and order them however the user pleases, using original or chosen colours."),
    new Item("horizontalDisplay", "../Assets/portfolioAssets/carAI/carAIProjectVideo.mp4", "../Assets/portfolioAssets/carAI/carAIPoster.png", "Self Driving Car", "Simulates F1 cars driving around multiple different Formula 1 tracks that can be customised by the user."),
    new Item("verticalDisplay", "../Assets/portfolioAssets/teachingTracker/teachingTrackerVideo.mp4", "../Assets/portfolioAssets/teachingTracker/teachingTrackerPoster.png", "Teaching Tracker", "An application that helps track: Where you worked, what day you worked, what role you played, and the description of what happened during the lesson"),
    new Item("horizontalDisplay", "../Assets/portfolioAssets/moodboard/moodboardVideo.mp4", "../Assets/portfolioAssets/moodboard/moodboardPoster.png", "Moodboard Creator", "A webpage used for creating custom moodboards out of many images."),
]

for (let projectIndex = 0; projectIndex < projectsToLoad.length; projectIndex++) {
    const splitter = createFragment(`<div class="splitter"></div>`);
    const projectItem = projectsToLoad[projectIndex];

    const newItem = createFragment(`<div class="${projectItem.displayType}"> <video class="${projectItem.displayType}Video" poster="${projectItem.posterPath}" autoplay muted loop> <source src="${projectItem.videoPath}"> </video> <div class="displayTextHolder"> <h2 class="displayTitle">${projectItem.title}</h2> <p class="displayText">${projectItem.text}</p> </div> </div>`);

    document.getElementById("newDisplayContainer").appendChild(newItem);

    document.getElementById("newDisplayContainer").appendChild(splitter);
}

setTimeout(() => {
    setDarkenSize();
}, 100)

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

function setDarkenSize() {
    const darkenBackground = document.getElementById("darkenBackground");
    darkenBackground.style.height = document.body.clientHeight + "px";
}

//document.body.style.height = (document.documentElement.scrollHeight + 75) + "px";
//setBordersHeight();
