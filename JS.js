let form = document.querySelector("form");

let allNotesList = [];

form.onsubmit = (event) => {
  event.preventDefault();

  let input = form.notetext.value;

  if (input != "") {
    let noteList = document.querySelector("ul");

    let newNote = document.createElement("li");
    newNote.addEventListener("mouseover", ShowDeleteBtn);
    newNote.addEventListener("mouseleave", HideDeleteBtn);

    let noteText = document.createElement("label");
    noteText.textContent = input;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", CompleteNote);

    var deleteBtn = document.createElement("button");
    deleteBtn.id = "remove-btn";
    deleteBtn.textContent = "❌";

    newNote.append(checkbox, noteText, deleteBtn);

    noteList.append(newNote);
    allNotesList.push(newNote);

    deleteBtn.addEventListener("click", function (event) {
      RemoveItem(allNotesList.length - 1);
    });

    form.reset();
  }
};

let allNotes = document.querySelector("#all");
let activeNotes = document.querySelector("#active");
let completedNotes = document.querySelector("#complete");

allNotes.addEventListener("click", function () {
  FilterNotes("all");
});
activeNotes.addEventListener("click", function () {
  FilterNotes("active");
});
completedNotes.addEventListener("click", function () {
  FilterNotes("completed");
});

function FilterNotes(status) {
  let noteList = document.querySelector("#to-do-list");

  RemoveListItems();

  if (status == "all") {
    allNotesList.forEach((element) => {
      noteList.append(element);
    });
  } else if (status == "completed") {
    allNotesList.forEach((element) => {

      let checkBox = element.querySelector('input[type="checkbox"]');

      if (checkBox.checked) {
        noteList.append(element);
      }
    });
  } else if (status == "active") {
    allNotesList.forEach((element) => {

      let checkBox = element.querySelector('input[type="checkbox"]');

      if (!checkBox.checked) {
        noteList.append(element);
      }
    });
  }
}

function RemoveListItems() {
  let noteList = document.querySelector("#to-do-list");

  while (noteList.firstElementChild) {
    noteList.firstElementChild.remove();
  }
}

function RemoveItem(index) {
  let selectedBtn = event.target;
  selectedBtn.parentNode.remove();

  //Ta bort från listan
  allNotesList.splice(index, 1);
}

function CompleteNote(event) {
  let selectedCheckbox = event.target;
  let noteLiElement = selectedCheckbox.parentNode;

  let noteText = noteLiElement.querySelector("label");

  if (selectedCheckbox.checked) {
    noteText.style.textDecoration = "line-through";
  } else {
    noteText.style.textDecoration = "none";
  }
}
function ShowDeleteBtn(event) {
  let liElement = event.target;
  let deleteBtn = liElement.querySelector("button");

  if (deleteBtn != null) {
    deleteBtn.style.visibility = "visible";
  }
}
function HideDeleteBtn(event) {
  let liElement = event.target;
  let deleteBtn = liElement.querySelector("button");

  deleteBtn.style.visibility = "hidden";
}
