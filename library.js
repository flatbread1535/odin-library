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
    addBookInfo(book);
    displayBooks();
}

/* Updates sidebar information when a book is created */
function addBookInfo(book) {
    // Adds to total book number
    const bookNumInfo = document.querySelector(".book-num .info-val");
    let bookNum = Number(bookNumInfo.textContent);
    bookNum++;
    bookNumInfo.textContent = bookNum;

    // Adds to complete or incomplete books number
    const readValue = document.querySelector('input[name="has-read"]:checked').value;
    if (readValue === "read") {
        const completeInfo = document.querySelector(".complete-books .info-val");
        let completeNum = Number(completeInfo.textContent);
        completeNum++;
        completeInfo.textContent = completeNum;
    } else {
        const incompleteInfo = document.querySelector(".incomplete-books .info-val");
        let incompleteNum = Number(incompleteInfo.textContent);
        incompleteNum++;
        incompleteInfo.textContent = incompleteNum;
    }

    // Adds to the total page number
    const pageNumInfo = document.querySelector(".total-pages .info-val");
    let pageNum = Number(pageNumInfo.textContent);
    pageNum += book.pages;
    pageNumInfo.textContent = pageNum;
}

function displayBooks() {
    // loops through the array and displays each book on the page
    const container = document.querySelector(".container");
    container.replaceChildren();
    for (let i = 0; i < myLibrary.length; i++) {
        // Get book object itself for data
        const bookObject = myLibrary[i];
        
        // Grab the book card, add the class for styling, and append
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        container.appendChild(bookCard);

        const bookCardTop = document.createElement("div");
        const bookCardBottom = document.createElement("div");
        bookCardTop.classList.add("book-card-top");
        bookCardBottom.classList.add("book-card-bottom");
        bookCard.appendChild(bookCardTop);
        bookCard.appendChild(bookCardBottom);
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