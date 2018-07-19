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
    if (searchText === '') {
      this.setState({ searchResult : [] })
    }
    else {
      BooksAPI.search(searchText).then((searchResult) => {
        this.setState({ searchResult })
      });
    }

  }

  getBookShelf(bookId) {
    var shelfName = '';
    let book = this.state.books.find(b => b.id === bookId);
    if (book && book.shelf) {
      shelfName = book.shelf;
    } else {
        shelfName = 'none';
    }
    return shelfName;
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            shelves={this.state.shelves}
            onGetBookShelf={this.getBookShelf}
            onMoveBook={this.moveBook}/>
        )}/>

        <Route path="/search" render={() => (
          <SearchBook
            searchResult={this.state.searchResult}
            onGetBookShelf={this.getBookShelf}
            onMoveBook={this.moveBook}
            onSearchBook={this.searchBook}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp;
