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

Book.prototype.changeReadStatus = function () {
    if (this.hasRead === "read") {
        this.hasRead = "unread";
    } else {
        this.hasRead = "read";
    }
};

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
    if (book.hasRead === "read") {
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

/* Updates sidebar information when book is deleted */
function removeBookInfo(book) {
    // Subtracts total book number
    const bookNumInfo = document.querySelector(".book-num .info-val");
    let bookNum = Number(bookNumInfo.textContent);
    bookNum--;
    bookNumInfo.textContent = bookNum;

    // Subtracts from complete or incomplete books number
    if (book.hasRead === "read") {
        const completeInfo = document.querySelector(".complete-books .info-val");
        let completeNum = Number(completeInfo.textContent);
        completeNum--;
        completeInfo.textContent = completeNum;
    } else {
        const incompleteInfo = document.querySelector(".incomplete-books .info-val");
        let incompleteNum = Number(incompleteInfo.textContent);
        incompleteNum--;
        incompleteInfo.textContent = incompleteNum;
    }

    // Subtracts from the total page number
    const pageNumInfo = document.querySelector(".total-pages .info-val");
    let pageNum = Number(pageNumInfo.textContent);
    pageNum -= book.pages;
    pageNumInfo.textContent = pageNum;
}

/* Updates sidebar information when changing read status */
function updateReadInfo(oldStatus, newStatus) {
    const completeInfo = document.querySelector(".complete-books .info-val");
    const incompleteInfo = document.querySelector(".incomplete-books .info-val");

    let completeNum = Number(completeInfo.textContent);
    let incompleteNum = Number(incompleteInfo.textContent);

    if (oldStatus === "read" && newStatus === "unread") {
        completeNum--;
        incompleteNum++;
    } else if (oldStatus === "unread" && newStatus === "read") {
        completeNum++;
        incompleteNum--;
    }

    completeInfo.textContent = completeNum;
    incompleteInfo.textContent = incompleteNum;
}

/* Displays each book tab on the webpage */
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
        author.textContent = "by " + bookObject.author;
        pages.textContent = bookObject.pages + " pages";
        bookCardTop.appendChild(title);
        bookCardTop.appendChild(author);
        bookCardTop.appendChild(pages);

        // Adds buttons at bottom of book to indicate if book has been read
        // Or to delete the book from the display
        const bookBtns = document.createElement("div");
        bookBtns.classList.add("book-btns");
        bookCardBottom.appendChild(bookBtns);

        const hasReadBtn = document.createElement("button");
        if (bookObject.hasRead === "read") {
            hasReadBtn.classList.add("read-btn");
            hasReadBtn.textContent = "Read";
        } else {
            hasReadBtn.classList.add("unread-btn");
            hasReadBtn.textContent = "Unread";
        }
        bookBtns.appendChild(hasReadBtn);

        hasReadBtn.addEventListener("click", () => {
            const oldStatus = bookObject.hasRead;
            bookObject.changeReadStatus();
            updateReadInfo(oldStatus, bookObject.hasRead);
            displayBooks();
        });

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.dataset.id = bookObject.id;

        const deleteSvg = document.createElement("img");
        deleteSvg.src = "./svgs/delete.svg";
        deleteSvg.alt = "remove book";
        removeBtn.appendChild(deleteSvg);
        bookBtns.appendChild(removeBtn);

        removeBtn.addEventListener("click", () => {
            removeBook(removeBtn.dataset.id);
        });
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

function removeBook(bookId) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === bookId) {
            const removedBook = myLibrary[i];
            myLibrary.splice(i, 1);
            removeBookInfo(removedBook);
            displayBooks();
            break;
        }
    }
}