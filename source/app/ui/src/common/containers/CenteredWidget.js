import React from 'react';
import PropTypes from 'prop-types';

import {
  LogWrapper,
  Title,
  LogWidget,
  FormWrapper,
  TopImage,
  Copyright,
} from './UICenteredWidget';

export const CenteredWidget = ({
  image,
  title,
  loading,
  children,
  copyright,
}) => {
  return (
    <LogWrapper>
      <section>
        {!image ? null : <TopImage>{image}</TopImage>}
        <LogWidget>
          {title ? <Title>{title}</Title> : null}
          {loading ? (
            <Spinner size={32} thickness={3} />
          ) : (
            <FormWrapper>{children}</FormWrapper>
          )}
        </LogWidget>
      </section>
      {!copyright ? null : (
        <Copyright>
          <Footer copyright={copyright} />
        </Copyright>
      )}
    </LogWrapper>
  );
};

CenteredWidget.propTypes = {
  image: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  copyright: PropTypes.string,
};
