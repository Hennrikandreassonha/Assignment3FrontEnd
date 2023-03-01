let form = document.querySelector("form");

let allNotesList = [];

let toggleAllBtn = document.querySelector("#toggle-all");

let activeToggle = false;
let completedToggle = false;

let allNotes = document.querySelector("#all");
let activeNotes = document.querySelector("#active");
let completedNotes = document.querySelector("#complete");

removeBorder();
showFooterAndToggleBtn();

form.onsubmit = (event) => {
  event.preventDefault();

  //Adding a new note.
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

//Options for filtering the notes.
allNotes.addEventListener("click", function () {
  completedToggle = false;
  activeToggle = false;

  removeBorder();
  filterNotes();
});
activeNotes.addEventListener("click", function () {
  activeToggle = true;

  removeBorder();
  filterNotes();
});
completedNotes.addEventListener("click", function () {
  completedToggle = true;
  activeToggle = false;

  removeBorder();
  filterNotes();
});

//Instead of using the focus property we use an outline to show foucs.
function removeBorder() {
  if (completedToggle) {
    allNotes.classList.remove("filterBtn-show-outline");
    activeNotes.classList.remove("filterBtn-show-outline");
    completedNotes.classList.add("filterBtn-show-outline");
  } else if (activeToggle) {
    allNotes.classList.remove("filterBtn-show-outline");
    activeNotes.classList.add("filterBtn-show-outline");
    completedNotes.classList.remove("filterBtn-show-outline");
  } else {
    allNotes.classList.add("filterBtn-show-outline");
    activeNotes.classList.remove("filterBtn-show-outline");
    completedNotes.classList.remove("filterBtn-show-outline");
  }
}

function filterNotes() {
  let noteList = document.querySelector("#to-do-list");

  removeListItems();

  if (activeToggle) {
    allNotesList.forEach((element) => {
      let checkBox = element.querySelector('input[type="checkbox"]');

      if (!checkBox.checked) {
        noteList.append(element);
      }
    });
  } else if (completedToggle) {
    allNotesList.forEach((element) => {
      let checkBox = element.querySelector('input[type="checkbox"]');

      if (checkBox.checked) {
        noteList.append(element);
      }
    });
  } else {
    allNotesList.forEach((element) => {
      noteList.append(element);
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

  //Remove item from List.
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
  filterNotes();
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

//Updates the counter with the amount of notes left.
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
  showClearCompletedBtn();
  showFooterAndToggleBtn();
}
//Keep track on how many items is left.
function getAmountNotesLeft() {
  let counter = 0;

  allNotesList.forEach((element) => {
    let checkBox = element.querySelector('input[type="checkbox"]');

    if (!checkBox.checked) {
      counter++;
    }
  });

  toggleBtnStyle(counter);

  return counter;
}
function toggleBtnStyle(amountLeft){

  if(amountLeft == 0){
    toggleAllBtn.classList.add("zeroOpacity");
    toggleAllBtn.classList.remove("toggle-btn-opacity");

  }
  else{
    toggleAllBtn.classList.add("toggle-btn-opacity");
    toggleAllBtn.classList.remove("zeroOpacity");

  }
}

//Returns the amount of notes which are not completed.
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

//Displays the clear completed button depending on if any notes are completed
function showClearCompletedBtn() {
  let clearCompletedBtn = document.querySelector("#clear-completed");
  let counter = getAmountNotesDone();
  const width = window.innerWidth;

  //Om skärmen är liten och det finns klara notes
  if (width < 430 && counter > 0) {
    clearCompletedBtn.className = "display-inline-block"; 
  }
  //Om skärmen är liten och det inte finns några klara
  else if(width < 430){
    clearCompletedBtn.className = "display-none";
  }
  //Om skärmen är stor och det finns klara notes
  else if (counter > 0) {
    clearCompletedBtn.className = "visibility-visible";
  }
  //Skärmen är stor och det finns inga klara notes.
  else{
    clearCompletedBtn.className = "visibility-hidden";
  }
}

toggleAllBtn.addEventListener("mousedown", function (event) {
  event.preventDefault();
  toggleAllNotes();
});

function toggleAllNotes() {
  //If all notes is done we unmark all of them.
  if (getAmountNotesDone() == allNotesList.length) {
    allNotesActive();
  } else {
    completeAllNotes();
  }
  updateAmountItemsLeft();
  showClearCompletedBtn();
  filterNotes();
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
    toggleAllBtn.classList.add("visibility-visible");
    toggleAllBtn.classList.remove("visibility-hidden");
    
    toDoInfo.className = "display-grid";
  } else {
    toggleAllBtn.classList.remove("visibility-visible");
    toggleAllBtn.classList.add("visibility-hidden");

    toDoInfo.className = "display-none";
  }
}
