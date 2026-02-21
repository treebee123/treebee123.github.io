const notepadDisplay = document.getElementById("notepadDisplay");
const notepad = document.getElementById("notepad");

const noteNameInput = document.getElementById("noteName");
const noteValueInput = document.getElementById("notepadInput");

const noteSelect = document.getElementById("noteChooser");

const autoSaveToggle = document.getElementById("autosaveCheckbox");

function createFragment(itemHTML) {
    const parser = new DOMParser();
    return parser.parseFromString(itemHTML, 'text/html').body.firstElementChild;
}

function selectedNote() {
    switch (noteSelect.value) {

        case "selectOption":
            return;

        case "newOption":
            noteNameInput.value = "";
            noteValueInput.value = "";
            return;

        default:
            const noteKey = noteSelect.value;
            const noteValue = localStorage.getItem(noteKey);

            noteNameInput.value = noteKey;
            noteValueInput.value = noteValue;
            return;
    }
}

function changeNoteName() {
    noteSelect.value = "selectOption";
}

function saveAutoSavePreset() {
    console.log(`autosave: ${autoSaveToggle.checked}`);
    localStorage.setItem("autosaveState", autoSaveToggle.checked);
}

function deleteNote() {
    if (noteSelect.value == "selectOption" || noteSelect.value == "newOption") return;

    localStorage.removeItem(noteSelect.value);

    loadOptions();
}

function saveNote() {

    const noteKey = noteNameInput.value;
    const noteValue = noteValueInput.value;

    if (noteKey.length == 0 || noteValue.length == 0) {
        window.alert(`note key contains nothing ${noteKey.length == 0}.\nnote value contains nothing ${noteValue.length == 0}`);
        return;
    }

    localStorage.setItem(noteKey, noteValue);

    noteNameInput.value = "";
    noteValueInput.value = "";

    loadOptions();
}

function isNotepadNameEmpty() {
    return noteNameInput.value.length === 0;
}

function isNotepadEmpty() {
    console.log(`noteKey length: ${noteNameInput.value.length}\nnoteValue length: ${noteValueInput.value.length}`);

    return (noteNameInput.value.length === 0 || noteValueInput.value.length === 0);
}

function notepadTextChange(keyPressed) {
    console.log("autosaving...");
    autosave();
}

function autosave() {
    if (!autoSaveToggle.checked) return;

    console.log("autosave on");

    if (isNotepadNameEmpty() === true) return;

    console.log("autosaved");

    const noteKey = noteNameInput.value;
    const noteValue = noteValueInput.value;

    localStorage.setItem(noteKey, noteValue);

    loadOptions();
}

function loadOptions() {
    for (let optionIndex = noteSelect.childElementCount - 1; optionIndex >= 0; optionIndex--) {
        const child = noteSelect.children[optionIndex];

        noteSelect.removeChild(child);
    }

    const baseOptions = [
        ["selectOption", "Select Note"],
        ["newOption", "New Note"],
    ]

    for (const option of baseOptions) {
        const newOption = createFragment(`<option value="${option[0]}" class="fitContent">${option[1]}</option>`)
        noteSelect.appendChild(newOption);
    }


    for (let optionIndex = 0; optionIndex < localStorage.length; optionIndex++) {

        if (localStorage.key(optionIndex) == "autosaveState") continue;

        const optionItem = localStorage.getItem(localStorage.key(optionIndex));

        const optionKey = localStorage.key(optionIndex);

        const newOption = createFragment(`<option value="${optionKey}" class="fitContent">${optionKey}</option>`);

        noteSelect.appendChild(newOption);
    }
}

loadOptions();

function updateInvoiceContainerSize() {
    const YPos = notepadDisplay.getBoundingClientRect().y;

    const newHeight = document.documentElement.clientHeight - YPos;

    notepadDisplay.style.height = (newHeight - 20) + "px";
}

function updateInvoicesSize() {
    const maxHeight = notepadDisplay.getBoundingClientRect().height;
    const maxWidth = notepadDisplay.getBoundingClientRect().width;

    const width = 794;
    const height = 1123;
    const ratio = height / width;

    let newWidth = maxWidth;
    let newHeight = newWidth * ratio;

    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight / ratio;
    }

    notepad.style.width = newWidth + "px";
    notepad.style.height = newHeight + "px";
}

window.addEventListener('resize', () => {
    updateInvoiceContainerSize();
    updateInvoicesSize();
});

window.addEventListener('DOMContentLoaded', () => {
    updateInvoiceContainerSize();
    updateInvoicesSize();

    if (localStorage.getItem("autosaveState") === null) {
        console.log("autosave is null");
        localStorage.setItem("autosaveState", true);
    }

    autoSaveToggle.checked = JSON.parse(localStorage.getItem("autosaveState"));

    noteValueInput.addEventListener('keydown', (event) => {
        notepadTextChange(event.key);
    });
});