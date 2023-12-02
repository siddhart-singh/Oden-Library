"use strict";

const myLibrary = [];
const bookForm = document.querySelector(".book-form");

function Book(name, author, read) {
  this.name = name;
  this.author = author;
  this.read = read;
}

function addBookToLibrary(name, author, read) {
  myLibrary.push(new Book(name, author, read));
  console.log(myLibrary);
}

addBookToLibrary("test", "test", true);

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  bookForm.reset();
  console.dir(e.target[1].value);
});
