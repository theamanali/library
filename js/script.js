const libraryContainer = document.querySelector('.library-container');
const myLibrary = [];

function Book(title, author, beenRead) {
    this.title = title;
    this.author = author;
    this.hasBeenRead = beenRead;
    this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, beenRead) {
    const newBook = new Book(title, author, beenRead);
    myLibrary.push(newBook);
}

function displayBooks() {
    if (myLibrary.length === 0) {
        return;
    }
    
    myLibrary.forEach((book) => {
        // create all HTML elements
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
        libraryContainer.appendChild(newBookCard);
    })
}
