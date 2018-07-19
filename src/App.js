import React, { Component }  from 'react';
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'

import './App.css'

class BooksApp extends Component {
  constructor() {
    super();
    this.moveBook = this.moveBook.bind(this);
    this.searchBook = this.searchBook.bind(this);
    this.getBookShelf = this.getBookShelf.bind(this);
  }

  state = {
    books: [],
    searchResult: [],
    shelves: [
      {
        "name": "currentlyReading",
        "description": "Currently Reading"
      },
      {
        "name": "wantToRead",
        "description": "Want to Read"
      },
      {
        "name": "read",
        "description": "Read"
      }
    ]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(books);
    })
  }

  moveBook(book, shelf) {
    BooksAPI.update(book, shelf).then((booksPosition) => {
      // Add to library if book not exist
      if (this.state.books.find(b => b.id === book.id)  === undefined) {
        this.setState(state => ({
          books: state.books.concat([ book ])
        }))
      }

      this.setState(state => ({
        books: state.books.map((b) => (
          b.id === book.id ? Object.assign(b, { shelf: shelf }) : b
        ))
      }))
    })
  }

  searchBook(searchText) {
    BooksAPI.search(searchText).then((searchResult) => {
      console.log(searchResult);
        this.setState({ searchResult });
    });
  }

  getBookShelf(bookId) {
    console.log(bookId);
    var shelfName = '';
    let book = this.state.books.find(b => b.id === bookId);
    if (book && book.shelf) {
      shelfName = book.shelf;
    } else {
        shelfName = 'none';
    }
    console.log(shelfName);
    return shelfName;

  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            shelves={this.state.shelves}
            onMoveBook={this.moveBook}/>
        )}/>

        <Route path="/search" render={() => (
          <SearchBook
            searchResult={this.state.searchResult}
            onSearchBook={this.searchBook}
            onMoveBook={this.moveBook}
            onGetBookShelf={this.getBookShelf}
            />
      )} />


      </div>
    )
  }
}

export default BooksApp;
