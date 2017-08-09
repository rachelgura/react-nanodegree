import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Posts from './Posts';
import { filteredPostsSelector } from './selectors';

class PostsContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts();

    const route = this.props.match.url.substring(1);

    if (this.props.match.url !== '/posts') {
      this.props.changeCategory(route);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.destroying && !this.props.destroying) {
      this.props.fetchPosts();
    }
  }

  onCategoryClick = category => {
    const route = category === 'all' ? 'posts' : category;

    this.props.changeCategory(category);
    this.props.history.push(`/${route}`);
  };

  onSortByClick = category => {
    this.props.changeSortBy(category);
  };

  onVoteClick = (postId, voteType) => {
    this.props.votePostClick(postId, voteType);
  };

  onDestroyClick = postId => {
    this.props.destroyPostClick(postId);
  };

  render() {
    const { posts, category, sortBy } = this.props;

    return (
      <Posts
        category={category}
        onCategoryClick={this.onCategoryClick}
        onDestroyClick={this.onDestroyClick}
        onSortByClick={this.onSortByClick}
        onVoteClick={this.onVoteClick}
        posts={posts}
        sortBy={sortBy}
      />
    );
  }
}

export function mapStateToProps({ posts }) {
  return {
    posts: filteredPostsSelector(posts),
    sortBy: posts.sortBy,
    category: posts.category
  };
}

export default connect(mapStateToProps, actions)(PostsContainer);
