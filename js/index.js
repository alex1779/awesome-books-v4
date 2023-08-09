class BookLibrary {
  constructor() {
    this.books = [];
    this.section = document.querySelector('#book-list');
    this.titleInput = document.querySelector('#title');
    this.authorInput = document.querySelector('#author');
    this.form = document.querySelector('#form');
    this.form.addEventListener('submit', this.addBook.bind(this));
    this.displayBooks();
  }

  saveToLocalStorage() {
    localStorage.setItem('Library', JSON.stringify(this.books));
  }

  getDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('Library'));
    if (data !== null) {
      this.books = data;
    }
  }

  displayBooks() {
    this.getDataFromLocalStorage();
    let booksHTML = '';

    this.books.forEach((book, index) => {
      booksHTML += `
        <article class='book'>
          <p>${book.title} <br> ${book.author}</p>
          <button type='button' id='${index}' class='remove-btn'>Remove</button>
          <hr>
        </article>
      `;
    });

    if (this.books.length === 0) {
      booksHTML = '<p>Library is empty...</p>';
    }

    this.section.innerHTML = booksHTML;

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach((button, index) => {
      button.addEventListener('click', () => this.removeBook(index));
    });
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.saveToLocalStorage();
    this.displayBooks();
  }

  addBook(event) {
    event.preventDefault();
    const bookTitle = this.titleInput.value;
    const bookAuthor = this.authorInput.value;

    if (bookTitle.trim().length !== 0 && bookAuthor.trim().length !== 0) {
      const newBook = { title: bookTitle, author: bookAuthor };
      this.books.push(newBook);
      this.saveToLocalStorage();
      this.displayBooks();
      this.titleInput.value = '';
      this.authorInput.value = '';
    }
  }
}

new BookLibrary();