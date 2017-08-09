import React from 'react';
import { FormField, Form } from './forms';

export default ({ onSubmit, handleSubmit }) => {
  return (
    <div className="container">
      <div className="columns">
        <div className="column is-12">
          <Form title="New comment" onSubmit={handleSubmit(onSubmit)}>
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
              label="Comment"
              placeholder="The content your comment..."
              type="textarea"
            />
          </Form>
        </div>
      </div>
    </div>
  );
};
