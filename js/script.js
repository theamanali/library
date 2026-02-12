function Library () {
    if (!new.target) {
        throw Error("Use new");
    }

    this.books = [];

    this.addBook = function (book) {
        this.books.push(book);
    }

    this.removeBook = function (id) {
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].id === id) {
                this.books.splice(i, 1);
                break;
            }
        }
    }
}

function Book(title, author, pages, wasRead) {
    if (!new.target) {
        throw Error("Use new");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead;
    this.id = crypto.randomUUID();

    this.markRead = function () {
        this.wasRead = !this.wasRead;
    }
}

function DisplayController() {
    this.noBooksText = document.querySelector(".no-books-text");
    this.booksContainer = document.querySelector(".books-container");

    this.showNoBooksText = () => {
        this.noBooksText.hidden = false;
    }

    this.hideNoBooksText = () => {
        this.noBooksText.hidden = true;
    }

    this.hideBook = (id) => {
        const bookCards = document.querySelectorAll(`.book-card`);

        if (bookCards.length === 1) {
            this.showNoBooksText()
        }

        for (let i = 0; i < bookCards.length; i++) {
            if (bookCards[i].dataset.id === id) {
                this.booksContainer.removeChild(bookCards[i]);
                return;
            }
        }
    }

    this.displayNewBook = (book) => {
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

function FormController() {
    this.form = document.getElementById("add-book-form");

    this.getBookData = () => {
        const formData = new FormData(this.form);

        return {
            title: String(formData.get("title") || "").trim(),
            author: String(formData.get("author") || "").trim(),
            pages: Number(formData.get("pages")),
            wasRead: this.form.elements["wasRead"].value === "true"
        };
    }

    this.resetForm = () => {
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
        bookID = e.target.parentElement.parentElement.dataset.id
        displayController.hideBook(bookID)
        myLibrary.removeBook(bookID)

        console.log(myLibrary)
    }
    else if (e.target.matches(".read-button")) {

    }
});

formController.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const bookData = formController.getBookData();

    const newBook = new Book(bookData.title, bookData.author, bookData.pages, bookData.wasRead);
    myLibrary.addBook(newBook);
    displayController.displayNewBook(newBook);
    displayController.hideNoBooksText();
    addBookDialog.close();
    formController.resetForm();
})











