import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import BooksGrid from './BooksGrid'

class ListBooks extends Component {

  render() {
    const { books, shelves, onGetBookShelf, onMoveBook } = this.props;
    books.sort(sortBy('shelf', 'title'));
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My library</h1>
        </div>
        <div className="list-books-content">
          <div>
          {shelves.map((shelf) => (
            <div key={shelf.name} className="bookshelf">
              <h2 className="bookshelf-title">{shelf.description}</h2>
              <div className="bookshelf-books">
                <BooksGrid
                  books={books.filter(book => shelf.name.includes(book.shelf))}
                  onGetBookShelf={onGetBookShelf}
                  onMoveBook={onMoveBook}
                />
              </div>
            </div>
          ))}
          </div>
        </div>
        <div className="open-search">
           <Link to="/search">Add a book</Link>
         </div>
      </div>
    )
  }
}

export default ListBooks
