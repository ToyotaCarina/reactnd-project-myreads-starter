import React, { Component } from 'react';

class BooksGrid extends Component {

  handleChange = (book, e) => {
    const value = e.target.value;
    if (this.props.onMoveBook) {
      this.props.onMoveBook(book, value);
    }
  }

  render() {
    const { books, onGetBookShelf} = this.props;
    return (
      <ol className="books-grid">
       {Array.isArray(books) && books
         .map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{width: 128, height: 193,  backgroundImage: (book.imageLinks) && (book.imageLinks.smallThumbnail) ? `url(${book.imageLinks.smallThumbnail})` : '' }}></div>
                <div className="book-shelf-changer">
                  <select value={onGetBookShelf(book.id)} onChange={(e) => this.handleChange(book, e)} >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors ? book.authors : '' }</div>
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default BooksGrid
