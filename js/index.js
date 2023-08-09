class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.getDataFromLocalStorage();
    this.getBooks();
  }

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
      this.saveToLocalStorage(); // Call the class method
    }
  }

  addBook() {
    const form = document.querySelector('#form');
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const bookTitle = title.value;
    const bookAuthor = author.value;

    if (bookTitle.trim().length !== 0 && bookAuthor.trim().length !== 0) {
      const objBook = new Book(bookTitle, bookAuthor);
      this.books.push(objBook);
      this.saveToLocalStorage();
      this.getBooks();
      form.reset();
    }
  }

  getBooks() {
    const section = document.querySelector('#book-list');
    let booksHtml = '<table>';
    this.books.forEach((book, index) => {
      booksHtml += `<tr>
        <td>
          <article class="book">
            <p>"${book.title}" by ${book.author}</p>
            <button type="button" data-id="${index}" class="btn remove-btn">Remove</button>
          </article>
        </td>
      </tr>`;
    });
    if (this.books.length === 0) {
      booksHtml += '<tr><td><p class="empty-library">Library is empty...</p></td></tr>';
    }
    booksHtml += '</table>';
    section.innerHTML = booksHtml;

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
      button.addEventListener('click', this.removeBook.bind(this));
    });
  }

  removeBook(event) {
    const bookId = parseInt(event.target.getAttribute('data-id'));
    const filteredBooks = this.books.filter((book, index) => bookId !== index);
    this.books = filteredBooks;
    this.saveToLocalStorage();
    this.getBooks();
  }
}

const listBooks = new Library();

const form = document.querySelector('#form');
form.addEventListener('submit', event => {
  event.preventDefault();
  listBooks.addBook();
});
