import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '../inputs/Input';

export const RenderTextField = ({
  input,
  label,
  color,
  meta: { touched, error },
  ...props
}) => (
  <Input
    label={label}
    color={color}
    error={touched && typeof error !== 'undefined'}
    helperText={touched && typeof error !== 'undefined' ? error : null}
    {...input}
    {...props}
  />
);

RenderTextField.propTypes = {
  input: PropTypes.shape(),
  label: PropTypes.string,
  color: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};
