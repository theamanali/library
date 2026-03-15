class Library {
    constructor () {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(id) {
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].id === id) {
                this.books.splice(i, 1);
                break;
            }
        }
    }

    getBook(id) {
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].id === id) {
                return this.books[i];
            }
        }
    }
}

class Book {
    constructor(title, author, pages, wasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.wasRead = wasRead;
        this.id = crypto.randomUUID();
    }

    markRead() {
        this.wasRead = !this.wasRead;
    }
}

class DisplayController {
    constructor() {
        this.noBooksText = document.querySelector(".no-books-text");
        this.booksContainer = document.querySelector(".books-container");
    }

    toggleNoBooksText() {
        this.noBooksText.hidden = !this.noBooksText.hidden;
    }

    hideBook(id) {
        const bookCards = document.querySelectorAll(`.book-card`);

        if (bookCards.length === 1) {
            this.toggleNoBooksText()
        }

        for (let i = 0; i < bookCards.length; i++) {
            if (bookCards[i].dataset.id === id) {
                this.booksContainer.removeChild(bookCards[i]);
                return;
            }
        }
    }

    displayNewBook(book) {
        const bookCards = document.querySelectorAll(`.book-card`);

        if (bookCards.length === 0) {
            this.toggleNoBooksText()
        }

        const newBookCard = document.createElement('div');
        const newBookContent = document.createElement('div');
        const title = document.createElement('h3');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const buttonContainer = document.createElement('div');
        const readLabel = document.createElement('label');
        const readButton = document.createElement('input');
        const deleteButton = document.createElement('button');

        // add values and styles to elements
        newBookCard.classList.add('book-card');
        newBookCard.setAttribute('data-id', book.id);
        newBookContent.classList.add('book-content');
        title.textContent = book.title;
        author.textContent = "by " + book.author;
        pages.textContent = book.pages + " pages";
        buttonContainer.classList.add('button-container');
        readLabel.setAttribute('for', 'read');
        readButton.setAttribute('type', 'checkbox');
        readButton.setAttribute("name", "read");
        readButton.classList.add('read-button');
        if (book.wasRead) {
            readButton.checked = true;
        }
        deleteButton.setAttribute("type", "button");
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = "Delete";

        // put elements in order
        readLabel.appendChild(readButton);
        newBookContent.appendChild(title);
        newBookContent.appendChild(author);
        newBookContent.appendChild(pages);
        buttonContainer.appendChild(readLabel);
        buttonContainer.appendChild(deleteButton);
        newBookCard.appendChild(newBookContent);
        newBookCard.appendChild(buttonContainer);
        this.booksContainer.prepend(newBookCard);
    }
}

class FormController {
    constructor() {
        this.form = document.getElementById("add-book-form");
    }

    getBookData() {
        const formData = new FormData(this.form);

        return {
            title: String(formData.get("title") || "").trim(),
            author: String(formData.get("author") || "").trim(),
            pages: Number(formData.get("pages")),
            wasRead: this.form.elements["wasRead"].value === "true"
        };
    }

    resetForm() {
        this.form.reset();
    }
}

const addBookButton = document.getElementById("add-book-button");
const addBookDialog = document.getElementById("add-book-dialog");
const dialogCancelButton = document.querySelector('.cancelDialog');

const myLibrary = new Library();
const formController = new FormController();
const displayController = new DisplayController();

addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
})

dialogCancelButton.addEventListener('click', () => {
    addBookDialog.close();
    formController.resetForm();
})

document.body.addEventListener("click", (e) => {
    let bookID;

    if (e.target.matches(".delete-button")) {
        bookID = e.target.closest(".book-card")?.dataset.id

        displayController.hideBook(bookID)
        myLibrary.removeBook(bookID)
    }
    else if (e.target.matches(".read-button")) {
        bookID = e.target.closest(".book-card")?.dataset.id
        myLibrary.getBook(bookID).markRead();
    }
});

formController.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const bookData = formController.getBookData();

    const newBook = new Book(bookData.title, bookData.author, bookData.pages, bookData.wasRead);
    myLibrary.addBook(newBook);
    displayController.displayNewBook(newBook);
    addBookDialog.close();
    formController.resetForm();
})











