const mainAddButton = document.querySelector('.addBookMain');
const dialogCancelButton = document.querySelector('.cancelDialog');
const addBookDialog = document.querySelector('#add-book-dialog');
const dialogSubmitButton = document.querySelector('.addBookFormButton');

class Library {
    libraryArray;

    constructor() {
        this.libraryArray = []
    }

    get libraryArray() {
        return this.libraryArray;
    }

    addBookToLibrary(title, author, beenRead) {
        this.libraryArray.push(new Book(title, author, beenRead));
    }

    removeBookFromLibrary(id) {
        for (let i = 0; i < this.libraryArray.length; i++) {
            if (this.libraryArray[i].id === id) {
                this.libraryArray.splice(i, 1);
            }
        }
    }

    markRead(id) {
        for (let i = 0; i < this.libraryArray.length; i++) {
            if (this.libraryArray[i].id === id) {
                this.libraryArray[i].toggleRead();
            }
        }
    }
}

class Book {
    constructor(title, author, beenRead) {
        this.title = title;
        this.author = author;
        this.beenRead = beenRead;
    }

    toggleRead() {
        this.beenRead = !this.beenRead;
    }
}

class DisplayController {
    constructor() {
        this.noBooksText = document.querySelector('.no-books-text');
        this.libraryContainer = document.querySelector('.library-container');
    }

    hideNoBooksText() {
        this.noBooksText.hidden = true;
    }

    showNoBooksText() {
        this.noBooksText.hidden = false;
    }

    deleteBook(id) {
        const bookCards = document.querySelectorAll('.book-card');

        if (bookCards.length === 1) {
            this.showNoBooksText()
        }

        for (let i = 0; i < bookCards.length; i++) {
            if (bookCards[i].dataset.id === id) {
                this.libraryContainer.removeChild(bookCards[i]);
                return;
            }
        }
    }

    displayNewBook(book) {
        if (library.libraryArray.length === 0) {
            return;
        }

        this.hideNoBooksText();

        const newBookCard = document.createElement('div');
        const newBookContent = document.createElement('div');
        const title = document.createElement('h3');
        const author = document.createElement('p');
        const buttonContainer = document.createElement('div');
        const readLabel = document.createElement('label');
        const readButton = document.createElement('input');
        const deleteButton = document.createElement('button');

        // add values and styles to elements
        newBookCard.classList.add('book-card');
        newBookCard.setAttribute('data-id', book.id);
        newBookContent.classList.add('book-content');
        title.textContent = book.title;
        author.textContent = book.author;
        buttonContainer.classList.add('button-container');
        readLabel.setAttribute('for', 'read');
        readButton.setAttribute('type', 'checkbox');
        readButton.setAttribute("name", "read")
        readButton.setAttribute("id", "read");
        if (book.hasBeenRead) {
            readButton.checked = true;
        }
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("id", "delete-button");
        deleteButton.textContent = "Delete";

        // put elements in order
        readLabel.appendChild(readButton);
        newBookContent.appendChild(title);
        newBookContent.appendChild(author);
        buttonContainer.appendChild(readLabel);
        buttonContainer.appendChild(deleteButton);
        newBookCard.appendChild(newBookContent);
        newBookCard.appendChild(buttonContainer);
        this.libraryContainer.prepend(newBookCard);
    }
}

class FormController {
    constructor() {
        this.form = document.querySelector('form');
    }

    get formAuthor() {
        return this.form.elements['author'].value;
    }

    get formTitle() {
        return this.form.elements['title'].value;
    }

    get formHasBeenRead() {
        return this.form.elements['hasBeenRead'].checked;
    }

    clearForm() {
        this.form.elements['title'].value = "";
        this.form.elements['author'].value = "";
        this.form.elements['hasBeenRead'].checked = false;
    }

    static hasValidFormInput(title, author) {
        return title.trim().length > 0 && author.trim().length > 0;
    }
}

const library = new Library();
const displayController = new DisplayController();
const formController = new FormController();

document.body.addEventListener('click', (e) => {
    let bookId;
    
    if (e.target.matches('#delete-button')) {
        bookId = e.target.parentElement.parentElement.dataset.id;
        displayController.deleteBook(bookId);
        library.removeBookFromLibrary(bookId);
    }
    else if (e.target.matches('#read')) {
        bookId = e.target.parentElement.parentElement.parentElement.dataset.id;
        library.markRead(bookId);
    }
});

mainAddButton.addEventListener('click', () => {
    addBookDialog.showModal();
})

dialogCancelButton.addEventListener('click', () => {
    addBookDialog.close();
})

dialogSubmitButton.addEventListener('click', (e) => {
    e.preventDefault()
    const title = formController.formTitle;
    const author = formController.formAuthor;
    const hasBeenRead = formController.formHasBeenRead;

    if(FormController.hasValidFormInput(title, author)) {
        library.addBookToLibrary(title, author, hasBeenRead);
        displayController.displayNewBook(library.libraryArray[library.libraryArray.length - 1]);
        formController.clearForm()
        addBookDialog.close();
    }
    else {
        alert("Please enter a book title and author!")
    }
})

