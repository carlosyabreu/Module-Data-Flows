let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

function submit() {
  // Validate all fields (including author)
  if (
    title.value == null ||
    title.value.trim() == "" ||
    author.value == null ||
    author.value.trim() == "" ||
    pages.value == null ||
    pages.value.trim() == ""
  ) {
    alert("Please fill all fields (Title, Author, Pages)!");
    return false;
  }

  // Validate pages is a positive number
  const pagesNum = parseInt(pages.value, 10);
  if (isNaN(pagesNum) || pagesNum <= 0) {
    alert("Please enter a valid number of pages!");
    return false;
  }

  // FIX: use author.value instead of title.value for the second argument
  let book = new Book(
    title.value.trim(),
    author.value.trim(),
    pagesNum,
    check.checked
  );
  myLibrary.push(book);  // FIX: was 'library.push'
  render();

  // Clear form fields for better UX
  title.value = "";
  author.value = "";
  pages.value = "";
  check.checked = false;

  return true;
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  let table = document.getElementById("display");

  // Delete all rows except the header (row 0)
  // FIX: missing ')' in original for-loop – replaced with while loop for clarity
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // Re-populate table with current library
  for (let i = 0; i < myLibrary.length; i++) {
    let row = table.insertRow();  // appends at the end (preserves order)

    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);

    titleCell.innerHTML = myLibrary[i].title;
    authorCell.innerHTML = myLibrary[i].author;
    pagesCell.innerHTML = myLibrary[i].pages;

    // Read status toggle button
    let changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";
    // FIX: correct "Yes" when read, "No" when not read
    changeBut.innerText = myLibrary[i].check ? "Yes" : "No";
    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });
    wasReadCell.appendChild(changeBut);

    // Delete button
    let delButton = document.createElement("button");
    delButton.className = "btn btn-warning";
    delButton.innerHTML = "Delete";
    // FIX: event type 'click' (was 'clicks') and correct variable name
    delButton.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });
    deleteCell.appendChild(delButton);
  }
}
