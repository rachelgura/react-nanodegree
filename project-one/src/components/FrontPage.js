import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BookShelf from './BookShelf';

class FrontPage extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired
    }

    render() {
        const { books, onBookUpdate } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <BookShelf 
                        title='Currently Reading'
                        books={books.filter((book) => (book.shelf === 'currentlyReading'))}
                        onBookUpdate={onBookUpdate}
                    />
                    <BookShelf
                        title='Want to Read'
                        books={books.filter((book) => (book.shelf === 'wantToRead'))}
                        onBookUpdate={onBookUpdate}
                    />
                    <BookShelf
                        title='Read'
                        books={books.filter((book) => (book.shelf === 'read'))}
                        onBookUpdate={onBookUpdate}
                    />
                </div>
                <div className="open-search">
                    <Link to='search'>Add a book</Link>
                </div>
            </div>
        );
    }
};

export default FrontPage;