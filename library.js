const myLibrary = [];

function Book(title, author, pages, hasRead) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, hasRead) {
    // take params, create a book then store it in the array
    const book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
}

function displayBooks() {
    // loops through the array and displays each book on the page
}