function Library () {
    if (!new.target) {
        throw Error("Use new");
    }

    this.books = [];

    this.addBook = function (book) {
        this.books.push(book);
    }

    this.removeBook = function (index) {
        this.books.splice(index, 1);
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

    this.markRead = function () {
        this.wasRead = !this.wasRead;
    }
}

function DisplayController() {

}




