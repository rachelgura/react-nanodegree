import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

class BookList extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired
    }

    render() {
        const { books, onBookUpdate } = this.props;

        return (
            <ol className="books-grid">
                {books.map((book) => (
                    <li key={book.id}>
                        <Book book={book} onBookUpdate={onBookUpdate}/>
                    </li>
                ))}
            </ol>
        );
    }
};

export default BookList;