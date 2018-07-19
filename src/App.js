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
        console.log('added to library');
      }

      this.setState(state => ({
        books: state.books.map((b) => (
          b.id === book.id ? Object.assign(b, { shelf: shelf }) : b
        ))
      }))
      console.log(this.state.books);
    })
  }

  searchBook(searchText) {
    BooksAPI.search(searchText).then((searchResult) => {
      console.log(searchResult);
      // if (Array.isArray(searchResult) && searchResult.length > 0) {
        this.setState({ searchResult });
      // } else {
      //   this.setState({ searchResult : [] });
      // }
    });
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
            myBooks={this.state.books}
            onSearchBook={this.searchBook}
            onMoveBook={this.moveBook}
            />
      )} />


      </div>
    )
  }
}

export default BooksApp;
