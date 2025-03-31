const gridView = document.querySelector('#gridView');
const listView = document.querySelector('#listView');
const booksContainer = document.querySelector('.booksContainer');
const pagination = document.querySelector('.pagination');
const dialog = document.querySelector("#dialog");
let pageNo = 1; // Start from page 1

function paginationFn(totalPages) {
    pagination.innerHTML = "";
    let currentPageSet = Math.ceil(pageNo / 5);
    const pagesPerSet = 5;

    function renderPages() {
        pagination.innerHTML = "";

        let start = (currentPageSet - 1) * pagesPerSet + 1;
        let end = Math.min(start + pagesPerSet - 1, totalPages);

   
        if (currentPageSet > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.innerText = "Prev";
            prevBtn.addEventListener('click', () => {
                currentPageSet--;
                renderPages();
            });
            pagination.appendChild(prevBtn);
        }

        
        for (let i = start; i <= end; i++) {
            const pageNoElement = document.createElement('span');
            pageNoElement.classList.add('pageNo');
            pageNoElement.innerText = i;
            
            if (i === pageNo) {
                pageNoElement.classList.add('active'); 
            }

            pageNoElement.addEventListener('click', () => {
                pageNo = i; 
                getData(); 
            });

            pagination.appendChild(pageNoElement);
        }

       
        if (end < totalPages) {
            const nextBtn = document.createElement('button');
            nextBtn.innerText = "Next";
            nextBtn.addEventListener("click", () => {
                currentPageSet++;
                renderPages();
            });
            pagination.appendChild(nextBtn);
        }
    }
    renderPages();
}

function getData() {
    const url = `https://api.freeapi.app/api/v1/public/books?page=${pageNo}`; // Dynamic URL
    booksContainer.innerHTML = ""; // Clear previous results

    fetch(url)
        .then((response) => response.json())
        .then((books) => {
            const totalPages = books.data.totalPages;
            paginationFn(totalPages);

            books.data.data.forEach(book => {
                const bookTitle = book.volumeInfo.title;
                const bookAuthor = book.volumeInfo.authors;
                const bookPublisher = book.volumeInfo.publisher;
                const bookPublishedDate = book.volumeInfo.publishedDate;
                const bookThumbnail = book.volumeInfo.imageLinks?.thumbnail || 'placeholder.jpg';
                const description = book.volumeInfo.description || "No description available.";

                booksData(bookTitle, bookAuthor, bookPublisher, bookPublishedDate, bookThumbnail, description);
            });
        })
        .catch((error) => console.error(`Error: ${error}`));
}

function booksData(bookTitle, bookAuthor, bookPublisher, bookPublishedDate, bookThumbnail, description) {
    const books = document.createElement('div');
    books.classList.add('books');

    const thumbnail = document.createElement('img');
    thumbnail.classList.add('image');
    thumbnail.src = bookThumbnail;

    const title = document.createElement('h2');
    title.innerText = bookTitle;

    const author = document.createElement('h3');
    author.innerText = `By: ${bookAuthor}`;

    const publisher = document.createElement('h4');
    publisher.innerText = `Published By:\n\n${bookPublisher}`;

    const pubDate = document.createElement('h4');
    pubDate.innerText = `Published On:\n\n${bookPublishedDate}`;

    const booksFooter = document.createElement('div');
    booksFooter.classList.add("booksFooter");
    booksFooter.append(publisher, pubDate);

    books.append(title, thumbnail, author, booksFooter);
    booksContainer.append(books);

    books.addEventListener('click', () => {
        booksDetails(bookTitle, bookAuthor, description, bookThumbnail);
    });
}

function booksDetails(bookTitle, bookAuthor, description, bookThumbnail) {
    dialog.innerHTML = "";
    dialog.classList.add("active");

    const bookDetails = document.createElement("div");
    bookDetails.classList.add("bookDetails");

    const modalHeading = document.createElement('h1');
    modalHeading.innerText = bookTitle;

    const detailedBookThumbnail = document.createElement('img');
    detailedBookThumbnail.src = bookThumbnail;

    const author = document.createElement('h4');
    author.innerText = `By - ${bookAuthor}`;

    const bookDescription = document.createElement('p');
    bookDescription.innerText = description;

    const closeModal = document.createElement("button");
    closeModal.innerText = "Close";
    closeModal.addEventListener("click", () => {
        dialog.close();
        dialog.classList.remove("active");
    });

    bookDetails.append(modalHeading, detailedBookThumbnail, author, bookDescription);
    dialog.append(closeModal, bookDetails);
    dialog.showModal();
}

function booksView() {
    if (listView.style.display === "block") {
        booksContainer.classList.add('active');
        listView.style.display = "none";
        gridView.style.display = "block";
    } else {
        booksContainer.classList.remove('active');
        gridView.style.display = "none";
        listView.style.display = "block";
    }
}

// Initial Call
getData();
gridView.addEventListener('click', booksView);
listView.addEventListener('click', booksView);
