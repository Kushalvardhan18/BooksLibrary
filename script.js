// const api = "https://api.freeapi.app/api/v1/public/books"
const gridView = document.querySelector('#gridView')
const listView = document.querySelector('#listView')
const booksContainer = document.querySelector('.booksContainer')
let pageNo = 1
const url = `https://api.freeapi.app/api/v1/public/books?page=${pageNo}`
const pagination = document.querySelector('.pagination')
let heading = document.querySelector("#heading")
// const totalPages = api.data.totalPages

// function paginationFn(totalPages) {

//     for(let i = 1;i<=totalPages;i++){
//         const pageNoLogo = document.createElement('span')
//         pageNoLogo.classList.add('page')
//         pageNoLogo.innerText = i 
//         pagination.append(pageNoLogo)
//         pageNoLogo.addEventListener('click',()=>{
//             // changePageFn(i)
//             console.log(i);

//         })
//     }
// }
// paginationFn()

function getData() {
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((books) => {
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

    // console.log(description);

    books.addEventListener('click', () => {
        // console.log(description);
        booksDetails(title,bookAuthor,description,thumbnail)

    })
}
const bookDetails = document.querySelector('.bookDetails')
function booksDetails(title,bookAuthor,description,thumbnail) {
    heading.innerText = `${title.innerText}` || "Books Library"
    booksContainer.style.display = 'none'
    const bookDescription = document.createElement('p')
    const author = document.createElement('h4')
    author.innerText = bookAuthor
    console.log(author);
    
    bookDescription.innerText = description
    bookDetails.append(thumbnail,author,bookDescription)


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