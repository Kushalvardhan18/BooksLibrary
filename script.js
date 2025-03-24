const gridView = document.querySelector('#gridView')
const listView = document.querySelector('#listView')
// gridView.style.display = "none"
// listView.style.display = "block"


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

const booksContainer = document.querySelector('.booksContainer')

function booksData(bookTitle,bookAuthor,bookPublisher,bookPublishedDate,bookThumbnail){

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



function booksView(book){
const books = document.querySelector('.books')
    
    if(listView.style.display === "block"){
        listView.style.display = "none";
        gridView.style.display = "block";
        booksContainer.style.flexDirection = "column"
        booksContainer.style.alignItems = "center";
        books.style.flexDirection = "row"
        book.style.width = "90%";

    }
    
    else{
        gridView.style.display = "none"
        listView.style.display = "block";
         booksContainer.style.flexDirection = "row"
         booksContainer.style.justifyContent = "center";
        book.style.flexDirection = "column"
        book.style.width = "30%";

    }
    
}

const books = document.querySelectorAll('.books')
books.forEach(()=>{
    booksView()
})
gridView.addEventListener('click',booksView)
listView.addEventListener('click',booksView)