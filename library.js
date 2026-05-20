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
exitButton.addEventListener("click", (event) => {
    event.preventDefault();
    form.reset();
    dialog.close();
});

/* Listener for submit button to submit the form */
form.addEventListener("submit", (event) => {
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

        // Creates sections of book tab for display styling
        const bookCardTop = document.createElement("div");
        const bookCardBottom = document.createElement("div");
        bookCardTop.classList.add("book-card-top");
        bookCardBottom.classList.add("book-card-bottom");
        bookCard.appendChild(bookCardTop);
        bookCard.appendChild(bookCardBottom);

        // Adds information to the books
        const title = document.createElement("p");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        title.classList.add("book-title");
        author.classList.add("book-author");
        pages.classList.add("book-pages");
        title.textContent = bookObject.title;
        author.textContent = bookObject.author;
        pages.textContent = bookObject.pages;
        bookCardTop.appendChild(title);
        bookCardTop.appendChild(author);
        bookCardTop.appendChild(pages);

        // Adds buttons at bottom of book to indicate if book has been read
        // Or to delete the book from the display
        const hasReadBtn = document.createElement("button");
        if (bookObject.hasRead === "read") {
            hasReadBtn.classList.add("read-btn");
            hasReadBtn.textContent = "Read";
        } else {
            hasReadBtn.classList.add("unread-btn");
            hasReadBtn.textContent = "Unread";
        }
        bookCardBottom.appendChild(hasReadBtn);

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        bookCardBottom.appendChild(removeBtn);
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