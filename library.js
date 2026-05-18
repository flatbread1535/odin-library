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
    const container = document.querySelector(".container");
    for (let i = 0; i < myLibrary.length; i++) {
        const book = document.createElement("div");
        // styling the book itself, i.e., it's "structure"
        book.classList.add(".book");
        // TODO: Create more elements and styling and append to book
        // TODO: Modify text content for new elements to append to book reflecting book info
        container.appendChild(book);
    }
}

function createBook() {
    
}