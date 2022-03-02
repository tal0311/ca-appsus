import { utilService } from './util-service.js'
import { asyncService } from './async-service.js'
import booksJSON from './../../books.json' assert { type: 'json' }

const BOOKS_KEY = 'books'

_createBooks()

export const booksService = {
  get,
  query,
  remove,
  save,
  getEmptyBook,
  getGoogleBooks,
  setBookReview,
}

function getGoogleBooks(searchTerm) {
  console.log(searchTerm)
  let googleBooksURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyCjYxSkJilk73DHVZremdhVvhmMHPpyHp4`
  return axios.get(googleBooksURL).then((res) => {
    let booksData = res.data.items
    console.log(booksData)
    return setDataForDisplay(booksData)
  })
}

function setDataForDisplay(books) {
  let displayBooks = books.map((book) => {
    console.log(book.volumeInfo.title)
    return {
      id: book.id,
      title: book.volumeInfo.title,
      subtitle: book?.searchInfo?.textSnippet,
      authors: [...book.volumeInfo.authors] || '',
      publishedDate: book.volumeInfo.publishedDate,
      pageCount: book.volumeInfo.pageCount,
      categories: [book.volumeInfo.title],
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      language: book.volumeInfo.language,
      listPrice: {
        amount: 0,
        currencyCode: book.saleInfo.country,
        isOnSale: false,
      },
    }
  })
  console.log(displayBooks)
  return displayBooks
}

function query() {
  return asyncService.query(BOOKS_KEY)
}

function remove(bookId) {
  return asyncService.remove(BOOKS_KEY, bookId)
}

function setBookReview(id, review) {
  console.log(id, review)
  get(id).then((book) => {
    book.review

    console.log(book.reviews)
  })

  // book.reviews = [...book.reviews, review]
  // console.log(book.reviews)
  // booksService.save(book)
}

function save(book) {
  console.log('put')
  if (book.id) return asyncService.put(BOOKS_KEY, book)
  else return asyncService.post(BOOKS_KEY, book)
}

function get(bookId) {
  return asyncService.get(BOOKS_KEY, bookId)
}

function getEmptyBook() {
  return {
    id: '',
    bookName: '',
  }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOKS_KEY)
  if (!books || !books.length) {
    // console.log('no books', booksData)
    utilService.saveToStorage(BOOKS_KEY, booksJSON)
  }
  return books
}

// function _createCar(vendor, maxSpeed = 250) {
//   const car = {
//     id: utilService.makeId(),
//     vendor,
//     maxSpeed,
//   }
//   return car
// }
