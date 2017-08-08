import React from 'react';
import PropTypes from 'prop-types';

import BookList from './BookList';

class BookShelf extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired
    }

    render() {
        const { title, books, onBookUpdate } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <BookList books={books} onBookUpdate={onBookUpdate}/>
            </div>
        );
    }
};

export default BookShelf;