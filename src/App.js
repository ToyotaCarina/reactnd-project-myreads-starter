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
  }

  state = {
    books: [],
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
      console.log(this);
      this.setState({ books })
    })
  }

  moveBook(book, shelf) {
    BooksAPI.update(book, shelf).then((books) => {
      this.setState(state => ({
        books: state.books.map((b) => (
                  b.id === book.id ? Object.assign(b, { shelf: shelf }) : b
                ))
      }))

    })
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
          <SearchBook  />
      )} />


      </div>
    )
  }
}

export default BooksApp;
