// DOM references
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readCheckbox = document.getElementById("check");
const submitBtn = document.getElementById("submitBtn");

let myLibrary = [];

window.addEventListener("load", () => {
  populateStorage();
  render();
  submitBtn.addEventListener("click", submit);
});

function populateStorage() {
  if (myLibrary.length === 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);
    const book2 = new Book("The Old Man and the Sea", "Ernest Hemingway", 127, true);
    myLibrary.push(book1, book2);
  }
}

function submit(event) {
  event.preventDefault(); // prevent any form-like behavior

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pagesRaw = pagesInput.value.trim();
  const isRead = readCheckbox.checked;

  if (!title || !author || !pagesRaw) {
    alert("Please fill all fields (Title, Author, Pages)!");
    return;
  }

  const pagesNum = Number(pagesRaw);
  if (!Number.isInteger(pagesNum) || pagesNum <= 0) {
    alert("Please enter a valid positive number of pages!");
    return;
  }

  const newBook = new Book(title, author, pagesNum, isRead);
  myLibrary.push(newBook);
  render();

  // Clear form
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readCheckbox.checked = false;
}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = isRead;
}

function render() {
  const tableBody = document.querySelector("#display tbody");
  tableBody.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const row = tableBody.insertRow();

    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const readCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;

    // Toggle read button
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "btn btn-success";
    toggleBtn.textContent = book.check ? "Yes" : "No";
    toggleBtn.addEventListener("click", () => {
      book.check = !book.check;
      render();
    });
    readCell.appendChild(toggleBtn);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-warning";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(i, 1);
      alert(`You've deleted title: ${book.title}`);
      render();
    });
    deleteCell.appendChild(deleteBtn);
  }
}
