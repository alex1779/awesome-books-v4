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

// ====================== NAVIGATION =========================
function displayTime() {
  const option = {
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const today = new Date();
  let date = today.toLocaleString('en-US', option);
  date = date.replace(' at', ',');
  document.getElementById('date').innerHTML = date;
  setTimeout(displayTime, 1000);
}
displayTime();

// Get all the section
const sections = document.querySelectorAll('section');
const pageTitle = document.querySelector('#page-title');
// Menu Links
const listLink = document.querySelector('#m-list a');
const addLink = document.querySelector('#m-add a');
const contactLink = document.querySelector('#m-contact a');

function displaySection(sectionToDisp) {
  sections.forEach((section) => {
    if (sectionToDisp === 'book-list') {
      pageTitle.style.display = 'block';
      if (!listLink.classList.contains('active')) {
        listLink.classList.add('active');
      }
      addLink.classList.remove('active');
      contactLink.classList.remove('active');
    } else if (sectionToDisp === 'add-book') {
      if (!addLink.classList.contains('active')) {
        addLink.classList.add('active');
      }

      listLink.classList.remove('active');
      contactLink.classList.remove('active');
      pageTitle.style.display = 'none';
    } else {
      if (!contactLink.classList.contains('active')) {
        contactLink.classList.add('active');
      }

      addLink.classList.remove('active');
      listLink.classList.remove('active');
      pageTitle.style.display = 'none';
    }

    if (section.id === sectionToDisp) {
      section.classList.remove('hide-section');
      section.classList.add('show-section');
    } else {
      section.classList.remove('show-section');
      section.classList.add('hide-section');
    }
  });
}

// MENUS
const listMenuLink = document.querySelector('#m-list');
listMenuLink.addEventListener('click', (e) => {
  displaySection('book-list');
  return e;
});
const addMenuLink = document.querySelector('#m-add');
addMenuLink.addEventListener('click', (e) => {
  displaySection('add-book');
  return e;
});
const contactMenuLink = document.querySelector('#m-contact');
contactMenuLink.addEventListener('click', (e) => {
  displaySection('contact');
  return e;
});