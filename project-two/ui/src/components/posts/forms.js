import React from 'react';
import { Field } from 'redux-form';
import { PropTypes } from 'prop-types';

export const Form = props => {
  const {
    children,
    error = '',
    onSubmit,
    submitText = 'Submit',
    title,
    altButton = null
  } = props;

  const renderError = (
    <div className="notification is-danger">
      {error}
    </div>
  );

  return (
    <div className="container">
      <div className="columns is-vcentered">
        <div className="column is-6 is-offset-3">
          <h2 className="subtitle is-2">
            {title}
          </h2>
          <div className="box form-box">
            <form className="control" onSubmit={onSubmit}>
              {error && renderError}

              {children}
              <button className="button is-info">
                {submitText}
              </button>

              {altButton}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  title: PropTypes.string.isRequired
};

const renderSelect = props => {
  const { label, input, options, meta: { touched, error } } = props;

  const renderOptions = () =>
    options.map(option => {
      const { value, text } = option;
      return (
        <option key={value} value={value}>
          {text}
        </option>
      );
    });

  return (
    <div className="field">
      <label className="label" htmlFor={label}>
        {label}
      </label>
      <p className="control">
        <span className="select">
          <select {...input}>
            {renderOptions()}
          </select>
        </span>
      </p>
      {touched &&
        error &&
        <p className="help is-danger">
          {error}
        </p>}
    </div>
  );
};

const renderInput = props => {
  const {
    leftIcon,
    rightIcon,
    label,
    type,
    name,
    input,
    placeholder,
    autoFocus,
    meta: { error, touched }
  } = props;

  let controlClassName = 'control';

  if (leftIcon) {
    controlClassName += ' has-icons-left';
  }

  if (rightIcon) {
    controlClassName += ' has-icons-right';
  }

  const renderLeftIcon = (
    <span className="icon is-small is-left">
      <i className={`fa ${leftIcon}`} />
    </span>
  );

  const renderRightIcon = (
    <span className="icon is-small is-right">
      <i className={`fa ${rightIcon}`} />
    </span>
  );

  const Tag = type === 'textarea' ? 'textarea' : 'input';
  const isTextarea = Tag === 'textarea';

  return (
    <div className="field">
      <label className="label" htmlFor={label}>
        {label}
      </label>
      <p className={controlClassName}>
        <Tag
          {...input}
          className={Tag}
          autoFocus={autoFocus}
          name={name}
          placeholder={placeholder}
          type={type}
          cols={isTextarea && '50'}
          rows={isTextarea && '4'}
        />
        {leftIcon && renderLeftIcon}
        {rightIcon && renderRightIcon}
      </p>
      {touched &&
        error &&
        <p className="help is-danger">
          {error}
        </p>}
    </div>
  );
};

export const FormField = ({
  autoFocus = false,
  label,
  name,
  options = {},
  placeholder = '',
  type = 'text',
  leftIcon = '',
  rightIcon = ''
}) => {
  let renderFormField;

  switch (type) {
    case 'select':
      renderFormField = renderSelect;
      break;
    default:
      renderFormField = renderInput;
  }

  return (
    <Field
      autoFocus={autoFocus}
      component={renderFormField}
      label={label}
      name={name}
      options={options}
      placeholder={placeholder}
      rightIcon={rightIcon}
      leftIcon={leftIcon}
      type={type}
    />
  );
};

FormField.propTypes = {
  autoFocus: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string
};
