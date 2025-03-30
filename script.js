// const api = "https://api.freeapi.app/api/v1/public/books"
const gridView = document.querySelector('#gridView')
const listView = document.querySelector('#listView')
const booksContainer = document.querySelector('.booksContainer')
let pageNo = 1
const url = `https://api.freeapi.app/api/v1/public/books?page=${pageNo}`
const pagination = document.querySelector('.pagination')
let heading = document.querySelector("#heading")


function paginationFn(totalPages) {
    for (let i = 1; i <= totalPages; i++) {
        const pageNo = document.createElement('span')
        pageNo.classList.add('pageNo')
        pageNo.innerText = i
        pagination.append(pageNo)
    }

}

function getData() {
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((books) => {
            const totalPages = books.data.totalPages
            paginationFn(totalPages)
            const arrLength = books.data.data.length
            for (let i = 0; i < arrLength; i++) {
                const bookTitle = books.data.data[i].volumeInfo.title
                const bookAuthor = books.data.data[i].volumeInfo.authors
                const bookPublisher = books.data.data[i].volumeInfo.publisher
                const bookPublishedDate = books.data.data[i].volumeInfo.publishedDate
                const bookThumbnail = books.data.data[i].volumeInfo.imageLinks.thumbnail
                const description = books.data.data[i].volumeInfo.description

                booksData(bookTitle, bookAuthor, bookPublisher, bookPublishedDate, bookThumbnail, description)


            }
        })
        .catch((error) => {
            console.error(`Error : ${error}`)
        })
}

function booksData(bookTitle, bookAuthor, bookPublisher, bookPublishedDate, bookThumbnail, description) {
    const books = document.createElement('div')
    const booksFooter = document.createElement('div')
    booksFooter.classList.add("booksFooter")
    const thumbnail = document.createElement('img')
    const title = document.createElement('h2')
    const publisher = document.createElement('h4')
    const pubDate = document.createElement('h4')

    books.classList.add('books')
    thumbnail.classList.add('image')
    thumbnail.src = bookThumbnail
    title.innerText = bookTitle
    publisher.innerText = `Published By : \n \n ${bookPublisher}`
    pubDate.innerText = `Published On : \n \n ${bookPublishedDate}`

    booksFooter.append(publisher, pubDate)
    books.append(title, thumbnail, booksFooter)
    booksContainer.append(books)


    books.addEventListener('click', () => {
        booksDetails(bookTitle, bookAuthor, description, bookThumbnail)


    })
}

const dialog = document.querySelector("#dialog")
function booksDetails(bookTitle, bookAuthor, description, bookThumbnail) {
    dialog.innerHTML = ""
    dialog.classList.add("active")
    const bookDetails = document.createElement("div");
    bookDetails.classList.add("bookDetails");

    const bookDescription = document.createElement('p')
    const modalHeading = document.createElement('h1')
    const author = document.createElement('h4')
    const detailedBookThumbnail = document.createElement('img')
    const closeModal = document.createElement("button");

    // bookDetails.innerHTML = ""
    modalHeading.innerText = bookTitle
    detailedBookThumbnail.src = bookThumbnail
    author.innerText = `By - ${bookAuthor}`
    bookDescription.innerText = description

    closeModal.innerText = "Close";
    closeModal.addEventListener("click", () => {
        dialog.close();
        dialog.classList.remove("active")

    });

    bookDetails.append(modalHeading, detailedBookThumbnail, author, bookDescription, )
    dialog.append(closeModal,bookDetails)
    dialog.showModal()
}

function booksView() {
    if (listView.style.display === "block") {
        booksContainer.classList.add('active')
        listView.style.display = "none";
        gridView.style.display = "block";
    }

    else {
        booksContainer.classList.remove('active')
        gridView.style.display = "none"
        listView.style.display = "block";
    }


}

getData()
gridView.addEventListener('click', booksView)
listView.addEventListener('click', booksView)