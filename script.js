

const url = "https://api.freeapi.app/api/v1/public/books"
function getData(){
    fetch(url)
    .then((response)=>{
        return response.json()
    })
    .then((books)=>{
        for(let i =0;i<=9;i++){
            const bookTitle =books.data.data[i].volumeInfo.title
            const bookAuthor =books.data.data[i].volumeInfo.authors
            const bookPublisher =books.data.data[i].volumeInfo.publisher
            const bookPublishedDate =books.data.data[i].volumeInfo.publishedDate
            const bookSmallThumbnail =books.data.data[i].volumeInfo.imageLinks.smallThumbnail
            const bookBigThumbnail =books.data.data[i].volumeInfo.imageLinks.thumbnail
            booksData(bookTitle,bookAuthor,bookPublisher,bookPublishedDate,bookSmallThumbnail)
        }
        

    })
    .catch((error)=>{
        console.error(`Error : ${error}`)
    })
}

getData()


function booksData(bookTitle,bookAuthor,bookPublisher,bookPublishedDate,bookSmallThumbnail){

    const booksContainer = document.querySelector('.booksContainer')
    const books = document.createElement('div')

    const smallThumbnail = document.createElement('img')
    const title = document.createElement('h3')

    books.classList.add('books')
    smallThumbnail.src = bookSmallThumbnail
    title.innerText = bookTitle
    books.append(title)
    books.append(smallThumbnail)
    booksContainer.append(books)
    
}
