import React from 'react';
import PropTypes from 'prop-types';

import { ErrorWrapper, ErrorListUl, ErrorListLi } from './UIErrorList';

export const ErrorList = ({ errors }) => {
  if (!errors) return null;
  return (
    <ErrorWrapper>
      <ErrorListUl>
        <ErrorListLi>{errors ? errors.message : null}</ErrorListLi>
      </ErrorListUl>
    </ErrorWrapper>
  );
};

ErrorList.propTypes = {
  errors: PropTypes.shape(),
};
