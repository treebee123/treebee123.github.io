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

var Item = makeStruct("videoPath htmlPath title description");
var projectsToLoad = [
    new Item("Assets/videos/moodboard/moodboardVideo.mp4", "moodBoardFiles/moodBoardHTML.html", "Mood Board Creator", "A quick and easy way to create and print a mood board. Mood board may clip images if outside of area."),
    new Item("", "invoiceCreator/invoiceCreatorHTML.html", "Invoice Creator", "Use a given template to create a multitude of invoices."),
]

for (let projectIndex = 0; projectIndex < projectsToLoad.length; projectIndex++) {
    const projectItem = projectsToLoad[projectIndex];

    const newButton = createFragment(`<div class="button relative"> <video class="buttonVideo relative" autoplay muted loop> <source src="${projectItem.videoPath}"> </video> <div class="buttonTextHolder absolute centered"> <h2 class="buttonTitle">${projectItem.title}</h2> <p class="buttonText">${projectItem.description}</p> </div> </div>`);
    newButton.addEventListener("click", () => { window.location.href = `${projectItem.htmlPath}` });

    document.getElementById("HTMLButtonHolder").appendChild(newButton);
}

function clickPortfolio() {
  window.location.href = "portfolioFiles/portfolioHTML.html";
}

function clickMoodBoard(){
  window.location.href = "moodBoardFiles/moodBoardHTML.html";
}
