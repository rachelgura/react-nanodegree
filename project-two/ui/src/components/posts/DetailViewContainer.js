import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions';
import { filteredSinglePostSelector, detailViewCommentsSelector } from './selectors';
import DetailView from './DetailView';

class DetailViewContainer extends Component {
  componentDidMount() {
    const {
      fetchComments,
      changeCategory,
      selectPost,
      posts,
      match: { params: { id, category } }
    } = this.props;

    if (posts.length === 0) {
      this.props.fetchPosts();
    }

    const currentCategory = category === 'posts' ? 'all' : category;

    changeCategory(currentCategory);
    selectPost(id);
    fetchComments(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.creatingOrUpdating && !this.props.creatingOrUpdating) {
      this.props.fetchPosts();
    }

    if (prevProps.posts.length === 0 && this.props.posts.length > 0) {
      const id = this.props.match.params.id;

      this.props.selectPost(id);
      this.fetchComments(id);
    }
  }

  componentWillUnmount() {
    this.props.emptyComments();
  }

  fetchComments(id) {
    this.props.fetchComments(id);
  }

  onSortByClick = category => {
    this.props.changeSortBy(category);
  };

  onVotePostClick = (postId, voteType) => {
    this.props.votePostClick(postId, voteType);
  };

  onVoteCommentClick = (commentId, voteType) => {
    this.props.voteCommentClick(commentId, voteType);
  };

  onDestroyClick = () => {
    const { destroyPostClick, match: { params: { id } } } = this.props;

    destroyPostClick(id);
  };

  onDestroyCommentClick = commentId => {
    const { destroyCommentClick } = this.props;

    destroyCommentClick(commentId);
  };

  render() {
    if (this.props.destroying) {
      return <Redirect to="/posts" />;
    }

    return (
      <DetailView
        {...this.props}
        onSortByClick={this.onSortByClick}
        onVotePostClick={this.onVotePostClick}
        onVoteCommentClick={this.onVoteCommentClick}
        onDestroyClick={this.onDestroyClick}
        onDestroyCommentClick={this.onDestroyCommentClick}
      />
    );
  }
}

export function mapStateToProps({ posts }) {
  return {
    selectedPost: filteredSinglePostSelector(posts),
    posts: posts.posts,
    loading: posts.loading,
    comments: detailViewCommentsSelector(posts),
    sortBy: posts.sortBy,
    destroying: posts.destroying,
    creatingOrUpdating: posts.creatingOrUpdating
  };
}

export default connect(mapStateToProps, actions)(DetailViewContainer);
