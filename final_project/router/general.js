const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

/**
 * Get the book list available in the shop
 * @returns {Object} - full list of book available in the shop
 */
public_users.get('/', function (req, res) {
  return res.status(200).json({ 'books': books });
});

/**
 * Get book details based on ISBN
 * @param {string} isbn - isbn of a book
 * @return {Object | String} - book returned based of isbn if it match, otherwise a 'Book not found' message
 */
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json({ 'book': book });
  } else {
    return res.status(400).json({ message: `Book not found based on isbn ${isbn}` });
  }
});

/**
 * Get book details based on author
 * @param {string} author - author of a book
 * @return {Object | String} - books returned based of author if it match, otherwise a 'Book not found' message
 */
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let booksByAuthors = [];
  for (let id in books) {
    if (books[id].author === author) {
      booksByAuthors.push(books[id]);
    }
  }
  if (booksByAuthors.length === 0) {
    return res.status(400).json({ message: `Book not found based on author ${author}` });
  }
  return res.status(200).json({ 'books': booksByAuthors });
});

/**
 * Get all books based on title
 * @param {string} title - title of a book
 * @return {Object | String} - books returned based of title if it match, otherwise a 'Book not found' message
 */
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let booksByTitles = [];
  for (let id in books) {
    if (books[id].title === title) {
      booksByTitles.push(books[id]);
    }
  }
  if (booksByTitles.length === 0) {
    return res.status(400).json({ message: `Book not found based on author ${title}` });
  }
  return res.status(200).json({ 'books': booksByTitles });
});


/**
 * Get book review
 * @param {string} isbn - isbn of a book
 * @return {Object | String} - book review returned based of isbn if it match, otherwise a 'Book not found' message
 */
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json({ 'reviews': book.reviews });
  } else {
    return res.status(400).json({ message: `Review not found based on isbn ${isbn}` });
  }
});

module.exports.general = public_users;
