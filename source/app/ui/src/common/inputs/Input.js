import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

export const Input = ({
  error,
  helperText,
  floatingLabelStyle,
  inputStyle,
  style,
  margin,
  placeholder,
  children,
  label,
  value,
  fullWidth,
  InputLabelProps,
  InputProps,
  disabled,
  classes,
  ...rest
}) => (
  <TextField
    label={label}
    classes={classes}
    placeholder={placeholder}
    margin={margin ? margin : 'dense'}
    style={{
      ...style,
    }}
    value={value}
    children={children}
    {...rest}
    fullWidth={fullWidth}
    error={error}
    helperText={<span id={!error ? '' : '__input_error'}>{helperText}</span>}
    InputLabelProps={InputLabelProps}
    InputProps={InputProps}
    disabled={disabled}
  />
);

Input.propTypes = {
  children: PropTypes.any,
  error: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  floatingLabelStyle: PropTypes.shape(),
  InputLabelProps: PropTypes.shape(),
  InputProps: PropTypes.shape(),
  inputStyle: PropTypes.shape(),
  style: PropTypes.shape(),
  classes: PropTypes.shape(),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.string,
};

Input.defaultProps = {};
