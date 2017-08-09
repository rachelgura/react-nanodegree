import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import New from './New';
import { createPost } from '../../actions';

class NewContainer extends Component {
  onSubmit = values => {
    const newPostValues = {
      ...values,
      id: uuidv1(),
      deleted: false,
      voteScore: 1,
      timestamp: Date.now()
    };

    this.props.createPost(newPostValues);
  };

  render() {
    if (this.props.creatingOrUpdating) return <Redirect to="/posts" />;

    return <New {...this.props} onSubmit={this.onSubmit} />;
  }
}

const validate = values => {
  const errors = {};
  const fields = ['title', 'body', 'author', 'category'];

  fields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Please fill in this field.';
    }
  });

  return errors;
};

export function mapStateToProps({ posts }) {
  return {
    initialValues: { category: 'udacity' },
    creatingOrUpdating: posts.creatingOrUpdating
  };
}

const Container = reduxForm({ form: 'newpost', validate })(NewContainer);
export default connect(mapStateToProps, { createPost })(Container);
