import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import { createComment } from '../../actions';
import AddComment from './AddComment';

class AddCommentContainer extends Component {
  onSubmit = values => {
    const newCommentValues = {
      ...values,
      id: uuidv1(),
      deleted: false,
      voteScore: 1,
      timestamp: Date.now(),
      parentId: this.props.match.params.id
    };

    this.props.createComment(newCommentValues);
  };

  render() {
    if (this.props.creatingOrUpdating) {
      return <Redirect to={`/posts/${this.props.match.params.id}`} />;
    }

    return <AddComment {...this.props} onSubmit={this.onSubmit} />;
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
    creatingOrUpdating: posts.creatingOrUpdating
  };
}

const Container = reduxForm({ form: 'newcomment', validate })(
  AddCommentContainer
);
export default connect(mapStateToProps, { createComment })(Container);
