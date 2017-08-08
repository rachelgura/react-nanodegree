import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import BookList from './BookList';

class SearchPage extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        searchTerms: PropTypes.array.isRequired,
        onSearchBooks: PropTypes.func.isRequired,
        onBookUpdate: PropTypes.func.isRequired,
        onCleanUpSearch: PropTypes.func.isRequired
    }

    render() {
        const { books, searchTerms, onSearchBooks, onBookUpdate, onCleanUpSearch } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <SearchBar 
                        searchTerms={searchTerms}
                        onQuery={onSearchBooks}
                        onCleanUpSearch={onCleanUpSearch}
                    />
                </div>
                <div className="search-books-results">
                    <BookList books={books} onBookUpdate={onBookUpdate}/>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        this.props.onCleanUpSearch();
    }
};

export default SearchPage;