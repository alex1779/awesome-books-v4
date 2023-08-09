class BookLibrary {
  constructor() {
    this.books = this.getDataFromLocalStorage() || [];
    this.section = document.querySelector('#book-list');
    this.titleInput = document.querySelector('#title');
    this.authorInput = document.querySelector('#author');
    this.form = document.querySelector('#form');
    this.form.addEventListener('submit', this.addBook.bind(this));
    this.attachRemoveButtonListeners();
  }

  saveToLocalStorage() {
    localStorage.setItem('Library', JSON.stringify(this.books));
  }

  getDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('Library'));
    return data !== null ? data : [];
  }

  displayBooks() {
    this.section.innerHTML = this.books.length === 0
      ? '<p>Library is empty...</p>'
      : this.books.map((book, index) => this.renderBook(book, index)).join('');
  }

  renderBook(book, index) {
    return `
      <article class="book">
        <p>${book.title} <br> ${book.author}</p>
        <button type="button" data-index="${index}" class="remove-btn">Remove</button>
        <hr>
      </article>`;
  }

  attachRemoveButtonListeners() {
    this.section.addEventListener('click', event => {
      if (event.target.classList.contains('remove-btn')) {
        const index = event.target.dataset.index;
        this.removeBook(index);
      }
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

const bookLibrary = new BookLibrary();
bookLibrary.displayBooks();