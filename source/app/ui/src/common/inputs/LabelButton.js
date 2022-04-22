import React from 'react';
import PropTypes from 'prop-types';

import { Spinner } from '../components';

export const LabelButton = ({
  label,
  loading,
  spinnerSize,
  spinnerThickness,
  spinnerColor,
}) => {
  return (
    <span
      style={{
        display: 'inherit',
        alignItems: 'inherit',
        justifyContent: 'inherit',
      }}
    >
      {loading ? (
        <Spinner
          size={spinnerSize ? spinnerSize : 21}
          thickness={spinnerThickness ? spinnerThickness : 2}
          color={spinnerColor ? spinnerColor : 'inherit'}
        />
      ) : (
        label
      )}
    </span>
  );
};

LabelButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  loading: PropTypes.bool,
  spinnerSize: PropTypes.number,
  spinnerThickness: PropTypes.number,
  spinnerColor: PropTypes.string,
};
