import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';

import { SpinnerContainer } from './UISpinner';

export const Spinner = ({
  color,
  max,
  min,
  size,
  style,
  thickness,
  value,
  styleContainer,
}) => (
  <SpinnerContainer style={styleContainer}>
    <CircularProgress
      color={color}
      max={max}
      min={min}
      size={size}
      style={style}
      thickness={thickness}
      value={value}
    />
  </SpinnerContainer>
);

Spinner.propTypes = {
  color: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.shape(),
  thickness: PropTypes.number,
  value: PropTypes.number,
  styleContainer: PropTypes.shape(),
};
