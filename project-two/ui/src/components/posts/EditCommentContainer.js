import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions';
import EditComment from './EditComment';
import { singleCommentSelector } from './selectors';

class EditCommentContainer extends Component {
  componentDidMount() {
    const { postid, commentid } = this.props.match.params;

    this.props.fetchComments(postid);
    this.props.selectComment(commentid);
  }

  onSubmit = values => {
    this.props.editComment(this.props.match.params.commentid, values);
  };

  render() {
    const { match: { params: { postid } }, creatingOrUpdating } = this.props;

    if (creatingOrUpdating) {
      return <Redirect to={`/posts/${postid}`} />;
    }

    return <EditComment {...this.props} onSubmit={this.onSubmit} />;
  }
}

const validate = values => {
  const errors = {};
  const fields = ['body', 'author'];

  fields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Please fill in this field.';
    }
  });

  return errors;
};

export function mapStateToProps({ posts }) {
  return {
    creatingOrUpdating: posts.creatingOrUpdating,
    initialValues: singleCommentSelector(posts)
  };
}

const Container = reduxForm({ form: 'editcomment', validate, enableReinitialize: true })(
  EditCommentContainer
);

export default connect(mapStateToProps, actions)(Container);
