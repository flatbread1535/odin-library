const myLibrary = [];

const form = document.querySelector("form");
const newBookButton = document.querySelector(".new-book-btn");
const dialog = document.querySelector(".book-dialog");

/* Listener for new book button to display modal */
newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

/* Listener for exit button to exit the modal */
const exitButton = document.querySelector(".form-exit-btn");
exitButton.addEventListener("click", () => {
    event.preventDefault();
    form.reset();
    dialog.close();
});

/* Listener for submit button to submit the form */
const submit = document.querySelector("button[type=\"submit\"]");
submit.addEventListener("click", () => {
    event.preventDefault();
    createBook();
    form.reset();
    dialog.close();
});

/* Book constructor */
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = crypto.randomUUID();
}

/* Constructs a new book object and adds the book to the library */
function addBookToLibrary(title, author, pages, hasRead) {
    // take params, create a book then store it in the array
    const book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
}

function displayBooks() {
    // loops through the array and displays each book on the page
    const container = document.querySelector(".container");
    for (let i = 0; i < myLibrary.length; i++) {
        const bookObject = myLibrary[i];
        const book = document.createElement("div");
        container.appendChild(book);
    }
}

/* Gets data from form  to create a book */
function createBook() {
    const title = form.elements["title"].value;
    const author = form.elements["author"].value;
    const pages = Number(form.elements["pages"].value);
    const hasRead = form.elements["has-read"].value;

    addBookToLibrary(title, author, pages, hasRead);   
}