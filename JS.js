let form = document.querySelector("form");

let allNotesList = [];

let toggleAllBtn = document.querySelector("#toggle-all");

showFooterAndToggleBtn();

form.onsubmit = (event) => {
  event.preventDefault();

  let input = form.notetext.value;

  if (input != "") {
    let noteList = document.querySelector("ul");

    let newNote = document.createElement("li");
    newNote.addEventListener("mouseover", showDeleteBtn);
    newNote.addEventListener("mouseleave", hideDeleteBtn);

    let noteText = document.createElement("label");
    noteText.textContent = input;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", completeNote);

    var deleteBtn = document.createElement("button");
    deleteBtn.id = "remove-btn";
    deleteBtn.textContent = "❌";
    deleteBtn.className = "visibility-hidden";

    newNote.append(checkbox, noteText, deleteBtn);

    noteList.append(newNote);
    allNotesList.push(newNote);

    deleteBtn.addEventListener("click", function (event) {
      removeItem(allNotesList.length - 1);
    });

    form.reset();
    updateAmountItemsLeft();
    showFooterAndToggleBtn();
  }
};

let allNotes = document.querySelector("#all");
let activeNotes = document.querySelector("#active");
let completedNotes = document.querySelector("#complete");

allNotes.addEventListener("click", function () {
  filterNotes("all");
});
activeNotes.addEventListener("click", function () {
  filterNotes("active");
});
completedNotes.addEventListener("click", function () {
  filterNotes("completed");
});

function filterNotes(status) {
  let noteList = document.querySelector("#to-do-list");

  removeListItems();

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

function removeListItems() {
  let noteList = document.querySelector("#to-do-list");

  while (noteList.firstElementChild) {
    noteList.firstElementChild.remove();
  }
}

function removeItem(index) {
  let selectedBtn = event.target;
  selectedBtn.parentNode.remove();

  //Ta bort från listan
  allNotesList.splice(index, 1);
  updateAmountItemsLeft();
  showClearCompletedBtn();
  showFooterAndToggleBtn();
}

function completeNote(event) {
  let selectedCheckbox = event.target;
  let noteLiElement = selectedCheckbox.parentNode;

  let noteText = noteLiElement.querySelector("label");

  if (selectedCheckbox.checked) {
    noteText.className = "text-decoration-line";
  } else {
    noteText.className = "text-decoration-none";
  }

  updateAmountItemsLeft();
  showClearCompletedBtn();
}

function showDeleteBtn(event) {
  let liElement = event.target;
  let deleteBtn = liElement.querySelector("button");

  if (deleteBtn != null) {
    deleteBtn.className = "visibility-visible";
  }
}

function hideDeleteBtn(event) {
  let liElement = event.target;
  let deleteBtn = liElement.querySelector("button");

  deleteBtn.className = "visibility-hidden";
}

function updateAmountItemsLeft() {
  let counter = getAmountNotesLeft();

  let pluralSingular = counter != 1 ? "s" : "";

  let itemLeftlabel = document.querySelector("#itemLeft");

  itemLeftlabel.textContent = `${counter} item${pluralSingular} left`;
}

let clearCompletedBtn = document.querySelector("#clear-completed");

clearCompletedBtn.addEventListener("click", clearCompleted);

function clearCompleted() {
  for (let index = allNotesList.length - 1; index >= 0; index--) {
    let checkBox = allNotesList[index].querySelector('input[type="checkbox"]');

    if (checkBox.checked) {
      allNotesList.splice(index, 1);
      checkBox.parentNode.remove();
    }
  }
  updateAmountItemsLeft();
}

function getAmountNotesLeft() {
  let counter = 0;

  allNotesList.forEach((element) => {
    let checkBox = element.querySelector('input[type="checkbox"]');

    if (!checkBox.checked) {
      counter++;
    }
  });

  return counter;
}

function getAmountNotesDone() {
  let counter = 0;

  allNotesList.forEach((element) => {
    let checkBox = element.querySelector('input[type="checkbox"]');

    if (checkBox.checked) {
      counter++;
    }
  });

  return counter;
}

function showClearCompletedBtn() {
  let clearCompletedBtn = document.querySelector("#clear-completed");

  for (let index = 0; index < allNotesList.length; index++) {
    let checkBox = allNotesList[index].querySelector('input[type="checkbox"]');

    if (checkBox.checked) {
      clearCompletedBtn.className = "visibility-visible";
      break;
    } else {
      clearCompletedBtn.className = "visibility-hidden";
    }
  }
}

toggleAllBtn.addEventListener("mousedown", function (event) {
  event.preventDefault();
  toggleAllNotes();
});

function toggleAllNotes() {
  //Om ingen är selectad eller om minst 1 är det.
  
  //Fixa att den togglar korrekt och filtrerar.

  if (getAmountNotesDone() == allNotesList.length) {
    allNotesActive();
    filterNotes("active");

  } else {
    completeAllNotes();
    filterNotes("completed");
  }
  updateAmountItemsLeft();
  showClearCompletedBtn();
}

function completeAllNotes() {
  allNotesList.forEach((element) => {
    let checkBox = element.querySelector('input[type="checkbox"]');
    checkBox.checked = true;

    let noteText = element.querySelector("label");
    noteText.className = "text-decoration-line";
  });
}
function allNotesActive() {
  //If no note is selected or if more than 1 is selected we select all notes.
  allNotesList.forEach((element) => {
    let checkBox = element.querySelector('input[type="checkbox"]');
    checkBox.checked = false;

    let noteText = element.querySelector("label");

    noteText.className = "text-decoration-none";
  });
}

function showFooterAndToggleBtn() {
  let toDoInfo = document.querySelector("#to-do-info");

  if (allNotesList.length > 0) {
    toggleAllBtn.className = "visibility-visible";
    toDoInfo.className = "display-grid";
  } else {
    toggleAllBtn.className = "visibility-hidden";
    toDoInfo.className = "display-none";
  }
}
