"use strict";

const myLibrary = [];

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
