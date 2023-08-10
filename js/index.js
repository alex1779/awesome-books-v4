import Book from './class.js';

class Library {
  constructor() {
    this.books = [];
  }

  // Local Storage
  saveToLocalStorage() {
    localStorage.setItem('Library', JSON.stringify(this.books));
  }

  getDataFromLocalStorage() {
    try {
      const data = JSON.parse(localStorage.getItem('Library'));
      if (data !== null) {
        this.books = data;
      }
    } catch (error) {
      this.saveToLocalStorage();
    }
  }

  // Add book method
  addBook() {
    const form = document.querySelector('#form');
    const bookTitle = document.querySelector('#title').value;
    const bookAuthor = document.querySelector('#author').value;
    const objBook = new Book(bookTitle, bookAuthor);
    this.books.push(objBook);
    this.saveToLocalStorage();
    this.getBooks();
    form.reset();
  }

  getBooks() {
    const section = document.querySelector('#book-list');
    this.getDataFromLocalStorage();
    let books = '<table>';
    this.books.forEach((book, index) => {
      books += `<tr>
      <td>
        <article class="book">
          <p>"${book.title}" by ${book.author}</p>
          <button type="button" id="${index}" class="btn remove-btn" >Remove</button>
        </article>
      </td>
    </tr>
    `;
    });
    if (this.books.length === 0) {
      books
        += '<tr><td<p class="empty-libray">Library is empty...</p></td></tr>';
    }
    books += '</table>';
    section.innerHTML = books;
  }

  removeBook(bookId) {
    const filteredBooks = this.books.filter((book, index) => bookId !== index);
    this.books = filteredBooks;
    this.saveToLocalStorage();
    const books = document.getElementsByClassName('book');
    books[bookId].remove();
    window.location.reload();
  }
}

// let listBooks
const listBooks = new Library();

function removeBookFromDOM(id) {
  if (id !== -1) {
    listBooks.removeBook(id);
  }

function deleteButtons1() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button, index) => {
    if (Number.isInteger(parseInt(button.id, 10))) {
      button.addEventListener('click', (e) => {
        removeBookFromDOM(index);
        return e;
      });
    }
  });
}

const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  listBooks.addBook();
  deleteButtons1();
});

listBooks.getDataFromLocalStorage();
listBooks.getBooks();
deleteButtons1();
removeBookFromDOM(-1);
