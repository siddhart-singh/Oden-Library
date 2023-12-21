"use strict";

const bookForm = document.querySelector(".book-form");
const mainTable = document.querySelector("tbody");

class Library {
  myLibrary;
  id;

  constructor() {
    this.myLibrary = [];
    this.id = 0;
  }

  addBookToLibrary(sno, name, author, read) {
    this.myLibrary.push(new Book(sno, name, author, read));
    this.displayBook(
      this.myLibrary[this.myLibrary.length - 1],
      this.myLibrary.length
    );
  }

  displayBook(book, sno) {
    let tr = document.createElement("tr");
    for (const key of Object.keys(book)) {
      let td = document.createElement("td");
      td.setAttribute(
        "class",
        "tbl-data border p-2 text-center hover:bg-slate-100"
      );
      if (book[key] == "Read" || book[key] == "Not Read") {
        const statusBtn = document.createElement("Button");
        statusBtn.innerText = book[key];
        statusBtn.dataset.id = book.sno;
        statusBtn.setAttribute(
          "class",
          "status-btn active:bg-blue-700 hover:bg-blue-600 rounded bg-blue-500 px-6 py-2 font-bold text-white text-sm"
        );
        td.appendChild(statusBtn);
      } else if (key === "sno") {
        td.innerText = sno;
      } else {
        td.innerText = book[key];
      }
      tr.appendChild(td);
    }
    const td = document.createElement("td");
    td.setAttribute(
      "class",
      "tbl-data border p-2 text-center hover:bg-slate-100"
    );
    const deleteBtn = document.createElement("Button");
    deleteBtn.innerText = "DELETE";
    deleteBtn.dataset.id = book.sno;
    deleteBtn.setAttribute(
      "class",
      "delete-btn active:bg-red-700 hover:bg-red-600 rounded bg-red-500 px-6 py-2 font-bold text-white text-sm"
    );
    td.appendChild(deleteBtn);
    tr.appendChild(td);
    tr.setAttribute("class", "tbl-row border group-hover:bg-slate-50");
    mainTable.appendChild(tr);
  }

  toggleStatus(e) {
    const target = e.target.closest(".status-btn");
    this.myLibrary.forEach((book, index) => {
      if (book.sno == target.dataset.id) {
        target.innerText = this.myLibrary[index].bookStatus();
      }
    });
  }

  deleteEntry(e) {
    const target = e.target.closest(".delete-btn");
    this.myLibrary.forEach((book, index) => {
      if (book.sno == target.dataset.id) {
        this.myLibrary.splice(index, 1);
      }
    });
    [...mainTable.children].forEach((child) => {
      mainTable.removeChild(child);
    });
    this.myLibrary.forEach((book, index) => {
      myLibrary.displayBook(book, index + 1);
    });
  }

  title(str = "") {
    return str
      .split(" ")
      .map((e) => e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase())
      .join(" ");
  }
}

class Book {
  constructor(sno, name, author, read) {
    this.sno = sno;
    this.name = name;
    this.author = author;
    this.read = read;
  }

  bookStatus() {
    this.read = this.read === "Read" ? "Not Read" : "Read";
    return this.read;
  }
}
const myLibrary = new Library();

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  myLibrary.addBookToLibrary(
    myLibrary.id++,
    myLibrary.title(e.target[1].value),
    myLibrary.title(e.target[2].value),
    e.target[3].value
  );
  bookForm.reset();
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".status-btn")) {
    myLibrary.toggleStatus(e);
  }

  if (e.target.closest(".delete-btn")) {
    myLibrary.deleteEntry(e);
  }
});
