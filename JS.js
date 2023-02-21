let form = document.querySelector("form");

form.onsubmit = (event) => {
  event.preventDefault();

  let noteList = document.querySelector("ul");

  let newNote = document.createElement("li");

  let noteText = document.createElement("label");
  noteText.textContent = form.notetext.value;

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  var deleteBtn = document.createElement("button");
  deleteBtn.id = "remove-btn";
  deleteBtn.textContent = "❌";
  newNote.append(checkbox, noteText, deleteBtn);

  noteList.append(newNote);
};
