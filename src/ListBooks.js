import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'

class ListBooks extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (book, e) => {
    console.log(this);
    const value = e.target.value;
    if (this.props.onMoveBook) {
      this.props.onMoveBook(book, value);
    }
  }

  render() {
    const { books, shelves } = this.props;
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
                <ol className="books-grid">
                {books
                  .filter(book => shelf.name.includes(book.shelf))
                  .map(book => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(e) => this.handleChange(book, e)} >
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors[0]}</div>
                      </div>
                    </li>
                    )
                  )
                }
                </ol>
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
