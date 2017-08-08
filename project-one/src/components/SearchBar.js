import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {

    static propTypes = {
        searchTerms: PropTypes.array.isRequired,
        onQuery: PropTypes.func.isRequired,
        onCleanUpSearch: PropTypes.func.isRequired
    }

    state = {
        searchText: '',
        suggestions: []
    }

    handleChange = (event) => {
        const searchText = event.target.value;
        const isSearchTerm = this.props.searchTerms.includes(searchText);

        const nextState = { 
            searchText: searchText,
            suggestions: this.props.searchTerms.filter((term) => (
                term.toLowerCase().includes(searchText.toLowerCase())
            ))
        };

        // Zero suggestions on empty search
        // and if search text is search term
        if (searchText.length === 0 || isSearchTerm) {
            nextState.suggestions = [];
        }
        
        // Do search if is one of given search terms
        // else clean up search so that doesn't show old results
        if (isSearchTerm) {
            this.props.onQuery(searchText);
        }

        else {
            this.props.onCleanUpSearch();
        }

        this.setState(nextState);
    }

    handleSuggestionSelected = (event) => {
        const selectedSuggestion = event.target.getAttribute('value');
        this.props.onQuery(selectedSuggestion);
        this.setState({
            searchText: selectedSuggestion,
            suggestions: []
        });
    }

    render() {
        const { searchText, suggestions } = this.state;

        return (
            <div>
                <div className="search-books-input-wrapper">
                    <input 
                        type='text'
                        placeholder='Search by title or author'
                        onChange={this.handleChange}
                        value={searchText}
                    />
                </div>
                <div className={`search-suggestion-box ${suggestions.length === 0 ? 'invisible' : 'visible'}`}>
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion}
                            value={suggestion}
                            onClick={this.handleSuggestionSelected}>
                        {suggestion}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default SearchBar;