import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { singlePostSelector } from './selectors';
import * as actions from '../../actions';
import EditPost from './EditPost';

class EditPostContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.selectPost(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.dispatch(reset('editpost'))
  }

  onSubmit = values => {
    this.props.editPost(this.props.match.params.id, values);
  };

  render() {
    const { match: { params: { id } }, creatingOrUpdating } = this.props;
    if (creatingOrUpdating) {
      return <Redirect to={`/posts/${id}`} />;
    }

    return <EditPost {...this.props} onSubmit={this.onSubmit} id={id} />;
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
    creatingOrUpdating: posts.creatingOrUpdating,
    initialValues: singlePostSelector(posts)
  };
}

const Container = reduxForm({ form: 'editpost', validate, enableReinitialize: true })(EditPostContainer);

export default connect(mapStateToProps, actions)(Container);
