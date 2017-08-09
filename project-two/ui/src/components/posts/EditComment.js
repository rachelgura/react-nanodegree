import React from 'react';
import { Form, FormField } from './forms';

export default ({ onSubmit, handleSubmit }) => {
  return (
    <div className="container">
      <div className="columns">
        <div className="column is-12">
          <Form title="Edit post" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              autoFocus
              name="author"
              label="Author"
              placeholder="Your name..."
              type="text"
              leftIcon="fa-id-card"
            />

            <FormField
              name="body"
              label="Post"
              placeholder="The content your post..."
              type="textarea"
            />
          </Form>
        </div>
      </div>
    </div>
  );
};
