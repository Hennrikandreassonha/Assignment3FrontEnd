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
    UpdateAmountItemsLeft();
    ShowFooterAndToggleBtn();
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
  UpdateAmountItemsLeft();
  ShowClearCompletedBtn();
  ShowFooterAndToggleBtn();
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

  UpdateAmountItemsLeft();
  ShowClearCompletedBtn();
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
function UpdateAmountItemsLeft() {
  let counter = GetAmountNotesLeft();

  let pluralSingular = counter != 1 ? "s" : "";

  let itemLeftlabel = document.querySelector("#itemLeft");

  itemLeftlabel.textContent = `${counter} item${pluralSingular} left`;
}

let clearCompletedBtn = document.querySelector("#clear-completed");

clearCompletedBtn.addEventListener("click", ClearCompleted);
function ClearCompleted() {
  allNotesList.forEach((element) => {
    let checkBox = element.querySelector('input[type="checkbox"]');

    if (checkBox.checked) {
      element.remove();
    }
  });
}
function GetAmountNotesLeft() {
  let counter = 0;

  allNotesList.forEach((element) => {
    let checkBox = element.querySelector('input[type="checkbox"]');

    if (!checkBox.checked) {
      counter++;
    }
  });

  return counter;
}
function GetAmountNotesDone() {
  let counter = 0;

  allNotesList.forEach((element) => {
    let checkBox = element.querySelector('input[type="checkbox"]');

    if (checkBox.checked) {
      counter++;
    }
  });

  return counter;
}
function ShowClearCompletedBtn() {
  let clearCompletedBtn = document.querySelector("#clear-completed");

  for (let index = 0; index < allNotesList.length; index++) {
    let checkBox = allNotesList[index].querySelector('input[type="checkbox"]');

    if (checkBox.checked) {
      clearCompletedBtn.style.visibility = "visible";
      break;
    } else {
      clearCompletedBtn.style.visibility = "hidden";
    }
  }
}

let toggleAllBtn = document.querySelector("#toggle-all");

toggleAllBtn.addEventListener("click", ToggleAllNotes);

function ToggleAllNotes() {
  //Om ingen är selectad eller om minst 1 är det.

  if (GetAmountNotesDone() == allNotesList.length) {
    //If no note is selected or if more than 1 is selected we select all notes.
    allNotesList.forEach((element) => {
      let checkBox = element.querySelector('input[type="checkbox"]');
      checkBox.checked = false;

      let noteText = element.querySelector("label");
      noteText.style.textDecoration = "none";
    });
  } else {
    allNotesList.forEach((element) => {
      let checkBox = element.querySelector('input[type="checkbox"]');
      checkBox.checked = true;

      let noteText = element.querySelector("label");
      noteText.style.textDecoration = "line-through";
    });
  }
  UpdateAmountItemsLeft();
}

function ShowFooterAndToggleBtn() {
  let footer = document.querySelector("#to-do-info");

  if (allNotesList.length > 0) {
    toggleAllBtn.style.visibility = "visible";
    footer.style.visibility = "visible";
  } else {
    toggleAllBtn.style.visibility = "hidden";
    footer.style.visibility = "hidden";

  }
}
