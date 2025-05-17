const noBooksText = document.querySelector('.no-books-text');
const libraryContainer = document.querySelector('.library-container');
const mainAddButton = document.querySelector('.addBookMain');
let mainDeleteButtons = document.querySelectorAll('#delete-button');
const addBookDialog = document.querySelector('#add-book-dialog');
const dialogCancelButton = document.querySelector('.cancelDialog');
const dialogSubmitButton = document.querySelector('.addBookFormButton');
const form = document.querySelector('form');

const myLibrary = [];

function Book(title, author, beenRead) {
    this.title = title;
    this.author = author;
    this.hasBeenRead = beenRead;
    this.id = crypto.randomUUID()
    
    this.toggleRead = function() {
        this.hasBeenRead = !this.hasBeenRead;
    }
}

function addBookToLibrary(title, author, beenRead) {
    myLibrary.push(new Book(title, author, beenRead));
}

function hideNoBooksText() {
    noBooksText.hidden = true;
}

function showNoBooksText() {
    noBooksText.hidden = false;
}

function removeBookFromLibrary(id) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === id) {
            myLibrary.splice(i, 1);
        }
    }
    
    if (myLibrary.length === 0) {
        showNoBooksText();
    }
}

function markRead(id) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === id) {
            myLibrary[i].toggleRead();
        }
    }
    
    console.log(myLibrary);
}

function deleteBook(id) {
    const bookCards = document.querySelectorAll('.book-card');
    for (let i = 0; i < bookCards.length; i++) {
        if (bookCards[i].dataset.id === id) {
            libraryContainer.removeChild(bookCards[i]);
            return;
        }
    }
}

function displayNewBook(book) {
    if (myLibrary.length === 0) {
        return;
    }

    hideNoBooksText();
    
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
    libraryContainer.prepend(newBookCard);
    mainDeleteButtons = document.querySelectorAll('#delete-button');
}

document.body.addEventListener('click', (e) => {
    let bookId;
    
    if (e.target.matches('#delete-button')) {
        bookId = e.target.parentElement.parentElement.dataset.id;
        deleteBook(bookId);
        removeBookFromLibrary(bookId);
    }
    else if (e.target.matches('#read')) {
        bookId = e.target.parentElement.parentElement.parentElement.dataset.id;
        markRead(bookId);
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
    const title = form.elements['title'].value;
    const author = form.elements['author'].value;
    const hasBeenRead = form.elements['hasBeenRead'].checked;

    if(hasValidFormInput(title, author)) {
        addBookToLibrary(title, author, hasBeenRead);
        displayNewBook(myLibrary[myLibrary.length - 1]);
        clearForm()
        addBookDialog.close();
    }
    else {
        alert("Please enter a book title and author!")
    }
})

function hasValidFormInput(title, author) {
    return title.trim().length > 0 && author.trim().length > 0;
}

function clearForm() {
    form.elements['title'].value = "";
    form.elements['author'].value = "";
    form.elements['hasBeenRead'].checked = false;
}

