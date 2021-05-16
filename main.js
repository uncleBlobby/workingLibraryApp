let myLibrary = [];
let modal = document.getElementById("modalPopup");
let addBookButton = document.getElementById("addBookBtn");
let modalCloser = document.getElementsByClassName("close")[0];
let bookAddCheck = document.getElementsByClassName("addBook")[0];
let addBookForm = document.getElementById("addBookForm");
let libraryGrid = document.getElementById("libraryDisplay");

let bookClosedIcon = document.createElement("img");
bookClosedIcon.src = "./img/closedBookIcon.png";
bookClosedIcon.classList.add("isReadIcon");

let bookOpenIcon = document.createElement("img");
bookOpenIcon.src = "./img/openBookIcon.png";
bookOpenIcon.classList.add("isReadIcon");

function addBookToLibrary(newBook){
    console.log(newBook);
    drawLibrary(myLibrary);
}

function drawLibrary(myLibrary) {

    while (libraryGrid.firstChild){
        libraryGrid.removeChild(libraryGrid.firstChild);
    }

    for(i = 0; i < myLibrary.length; i++){
        let newLibraryCard = document.createElement("div");
        newLibraryCard.classList.add("libraryCard");
        libraryGrid.appendChild(newLibraryCard);
        newLibraryCard.innerText = myLibrary[i].info;
        addDeleteButton(newLibraryCard, i);
        addReadToggle(newLibraryCard, i);

    }
}

function addDeleteButton(newLibraryCard, i){
    let deleteButton = document.createElement("div");
    deleteButton.classList.add("deleteButton");
    newLibraryCard.appendChild(deleteButton);
    deleteButton.innerText = "X";
    deleteButton.onclick = function() {
        deleteThisBook(deleteButton, i);
    }

}
function addReadToggle(newLibraryCard, i){
    let isReadToggle = document.createElement("div");
    isReadToggle.classList.add("isReadToggle");
    isReadToggle.setAttribute("id", "toggle" + i);
    newLibraryCard.appendChild(isReadToggle);
    isReadToggle.onclick = function(e) {
        myLibrary[i].toggleRead(i);
    }
    if(myLibrary[i].isRead == false){
    isReadToggle.classList.add("bookClosedIcon")
    }
    if(myLibrary[i].isRead == true){
    isReadToggle.classList.add("bookOpenIcon");
    }
       
}



function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = 'Title: ' + title + '\r\nAuthor: ' + author + '\r\nPages: ' + pages + '\r\nRead: ' + isRead;

}

function submitForm(){

    myLibrary[myLibrary.length] = new Book(btitle.value, bauthor.value, bpages.value, bisread.checked);
    addBookToLibrary(myLibrary[myLibrary.length - 1]);
}

function deleteThisBook(thisCard, i){
    myLibrary.splice(i, 1);
    thisCard.parentElement.remove();
}

addBookButton.onclick = function() {
    modal.style.display = "block";
    resetFormInputs();
}

function resetFormInputs(){
    addBookForm.elements[0].value = "Title";
    addBookForm.elements[1].value = "Author";
    addBookForm.elements[2].value = "Pages";
    addBookForm.elements[3] = false;
}

modalCloser.onclick = function() {
    modal.style.display = "none";
}

bookAddCheck.onclick = function() {
    submitForm();
    modal.style.display = "none";
}

window.onclick = function(e) {
    if(e.target == modal) {
        modal.style.display = "none";
    }
}

Book.prototype.toggleRead = function(cardID) {

    let currentBook = myLibrary[cardID];
    switch(currentBook.isRead){
        case true:
            currentBook.isRead = false;
            currentBook.info = 'Title: ' + currentBook.title + '\r\nAuthor: ' + currentBook.author + '\r\nPages: ' + currentBook.pages + '\r\nRead: ' + currentBook.isRead;
            break;
        case false:
            currentBook.isRead = true;
            currentBook.info = 'Title: ' + currentBook.title + '\r\nAuthor: ' + currentBook.author + '\r\nPages: ' + currentBook.pages + '\r\nRead: ' + currentBook.isRead;
            break;
    }
    drawLibrary(myLibrary);
    console.log(myLibrary);
}
