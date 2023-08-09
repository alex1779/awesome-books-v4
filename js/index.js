class Library {
  constructor() {
    this.books = this.getDataFromLocalStorage() || [];
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
    return data !== null ? data : [];
  }

  displayBooks() {
    let booksHtml = '';

    this.books.forEach((book, index) => {
      booksHtml += `<article class="book">
        <p>${book.title} <br> ${book.author}</p>
        <button type="button" data-index="${index}" class="remove-btn">Remove</button>
        <hr>
      </article>`;
    });

    if (this.books.length === 0) {
      booksHtml = '<p>Library is empty...</p>';
    }

    this.section.innerHTML = booksHtml;

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
      button.addEventListener('click', this.removeBook.bind(this));
    });
  }

  removeBook(event) {
    const index = parseInt(event.target.getAttribute('data-index'));
    this.books.splice(index, 1);
    this.saveToLocalStorage();
    this.displayBooks();
  }

  addBook(event) {
    event.preventDefault();

    const bookTitle = this.titleInput.value.trim();
    const bookAuthor = this.authorInput.value.trim();

    if (bookTitle.length !== 0 && bookAuthor.length !== 0) {
      const newBook = { title: bookTitle, author: bookAuthor };
      this.books.push(newBook);
      this.saveToLocalStorage();
      this.displayBooks();
      this.titleInput.value = '';
      this.authorInput.value = '';
    }
  }
}

const library = new Library();