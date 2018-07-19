import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class SearchBook extends Component {
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const value = e.target.value;
      if (this.props.onSearchBook) {
          this.props.onSearchBook(value);
      }
    }
  }

  handleChange = (book, e) => {
    const value = e.target.value;
    if (this.props.onMoveBook) {
      this.props.onMoveBook(book, value);
    }
  }


  render() {
    const { searchResult } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onKeyPress={this.handleKeyPress}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {Array.isArray(searchResult) && searchResult
            .map(book => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{width: 128, height: 193,  backgroundImage: (book.imageLinks) && (book.imageLinks.smallThumbnail) ? `url(${book.imageLinks.smallThumbnail})` : '' }}></div>
                    <div className="book-shelf-changer">
                      <select value={this.props.onGetBookShelf(book.id)} onChange={(e) => this.handleChange(book, e)} >
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors ? book.authors : '' }
                  </div>
                </div>
              </li>
              )
            )
          }
          {!Array.isArray(searchResult) && <p>No results found</p>}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook
