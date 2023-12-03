"use strict";
const myLibrary = [];
const bookForm = document.querySelector(".book-form");
const mainTable = document.querySelector(".main-table");

function Book(name, author, read) {
  this.name = name;
  this.author = author;
  this.read = read;
}

function addBookToLibrary(name, author, read) {
  myLibrary.push(new Book(name, author, read));
  displayBook();
}

function displayBook() {
  myLibrary.forEach((book) => {
    let tr = document.createElement("tr");
    for (const key in book) {
      let td = document.createElement("td");
      td.classList.add("tbl-data");
      if(book[key] == "Read" || book[key] =="Not Read") {
        const statusBtn = document.createElement("Button");
    statusBtn.innerText = book[key];
    statusBtn.classList.add("status-btn");
    td.appendChild(statusBtn);
    tr.appendChild(td);
      }
      else {
        td.innerText = book[key];
      tr.appendChild(td);
      }
      
    }
    const td = document.createElement("td");
    td.classList.add("tbl-data");
    const deleteBtn = document.createElement("Button");
    deleteBtn.innerText = "DELETE";
    deleteBtn.dataset.id = myLibrary.length;
    deleteBtn.classList.add("delete-btn");
    td.appendChild(deleteBtn);
    tr.appendChild(td);
    tr.classList.add("tbl-row");
    mainTable.appendChild(tr);
  });
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary(e.target[1].value, e.target[2].value, e.target[3].value);
  bookForm.reset();
});
