import React from 'react';
import { Form, FormField } from './forms';
import { CATEGORIES } from '../../options';
import BackButton from './BackButton';

const options = CATEGORIES.filter(
  category => category !== 'All'
).map(category => ({ value: category.toLowerCase(), text: category }));

export default ({ onSubmit, handleSubmit, id }) => {
  return (
    <div className="container">
      <BackButton />

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
              label="Title"
              name="title"
              placeholder="A title for your post..."
              type="text"
              leftIcon="fa-font"
            />

            <FormField
              name="body"
              label="Post"
              placeholder="The content your post..."
              type="textarea"
            />

            <FormField
              label="Category"
              name="category"
              type="select"
              options={options}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};
