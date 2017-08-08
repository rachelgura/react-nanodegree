import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import FrontPage from './FrontPage';
import SearchPage from './SearchPage';

import * as BooksAPI from '../BooksAPI';
import searchTerms from '../SearchTerms';

class BookShelfes {
  static CURRENTLY_READING = 'currentlyReading';
  static WANT_TO_READ = 'wantToRead';
  static READ = 'read';
  static NONE = 'none';
}

class App extends Component {

  state = {
    listedBooks: [],
    searchBooks: []
  }

  onBookUpdate = (book, shelf) => {
      BooksAPI.update(book, shelf).then((bookShelfes) => {
        this.setState((currentState) => {
          // Create next state with books in correct shelfes
          const { listedBooks, searchBooks } = currentState;

          const nextState = {
            listedBooks: this._mapCorrectShelfForBooks(listedBooks, bookShelfes),
            searchBooks: this._mapCorrectShelfForBooks(searchBooks, bookShelfes)
          }

          // Add newly added books from search books to listed books
          const listedBookIds = nextState.listedBooks.map((listedBook) => (listedBook.id));
          const newListedBooks = nextState.searchBooks.filter((searchBook) => (
            searchBook.shelf !== BookShelfes.NONE && !listedBookIds.includes(searchBook.id)
          ));

          nextState.listedBooks = nextState.listedBooks.concat(newListedBooks);

          return nextState;
        });
      });
  }

  onSearchBooks = (searchText) => {
      BooksAPI.search(searchText).then((books) => {
          if (books.error) {
            this.setState({ searchBooks: [] });
          }

          else {
            this.setState((currentState) => (
              {
                searchBooks: this._mapCorrectShelfForBooks(books, this._getBookShelfes(currentState.listedBooks))
              }
            ));
          }
      });
  }

  onCleanUpSearch = () => {
    this.setState({ searchBooks: [] });
  }

  _getBookShelfes = (books) => (
    {
      currentlyReading: books
            .filter((book) => (book.shelf === BookShelfes.CURRENTLY_READING))
            .map((book) => (book.id)),

      wantToRead: books
            .filter((book) => (book.shelf === BookShelfes.WANT_TO_READ))
            .map((book) => (book.id)),

      read: books
            .filter((book) => (book.shelf === BookShelfes.READ))
            .map((book) => (book.id))
    }
  )

  _mapCorrectShelfForBooks = (books, bookShelfes) => {
    return books.map((book) => {
      book.shelf = this._findShelfForBook(book.id, bookShelfes);
      return book;
    });
  }

  _findShelfForBook = (bookId, bookShelfes) => {
    if (bookShelfes.currentlyReading.includes(bookId)) return BookShelfes.CURRENTLY_READING;
    if (bookShelfes.wantToRead.includes(bookId)) return BookShelfes.WANT_TO_READ;
    if (bookShelfes.read.includes(bookId)) return BookShelfes.READ;
    return BookShelfes.NONE;
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({ listedBooks: books });
      });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <FrontPage
            books={this.state.listedBooks}
            onBookUpdate={this.onBookUpdate}
          />
        )}>
        </Route>
        <Route exact path='/search' render={() => (
          <SearchPage
            books={this.state.searchBooks}
            searchTerms={searchTerms}
            onSearchBooks={this.onSearchBooks}
            onBookUpdate={this.onBookUpdate}
            onCleanUpSearch={this.onCleanUpSearch}
          />
        )}>
        </Route>
      </div>
    );
  }
}

export default App;
