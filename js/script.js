const myLibrary = [];

function Book(title, author, pageNumber, beenRead) {
    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.beenRead = beenRead;
    this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, pageNumber, beenRead) {
    const newBook = new Book(title, author, pageNumber, beenRead);
    myLibrary.push(newBook);
}

