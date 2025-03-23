

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
            const bookThumbnail =books.data.data[i].volumeInfo.imageLinks.thumbnail
            booksData(bookTitle,bookAuthor,bookPublisher,bookPublishedDate,bookThumbnail)
        }
        

    })
    .catch((error)=>{
        console.error(`Error : ${error}`)
    })
}

getData()


function booksData(bookTitle,bookAuthor,bookPublisher,bookPublishedDate,bookThumbnail){

    const booksContainer = document.querySelector('.booksContainer')
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
    publisher.innerText = `Published By : ${bookPublisher}`
    pubDate.innerText = `Published On : ${bookPublishedDate}`

    booksFooter.append(publisher,pubDate)
    books.append(title,thumbnail,booksFooter)
    booksContainer.append(books)
 
    
}
