import styled from '@emotion/styled';
import { MQ } from './Utils';

import './_global.scss';

export const MainWrapper = styled.div({
  position: 'relative',
  overflow: 'hidden',
  margin: '0 auto',
  padding: '70px 0 30px',
  maxWidth: 2040,
});

export const ContentWrapper = styled.div(
  {
    position: 'relative',
    backgroundColor: process.env.COLOR_BACKGROUND,
    minHeight: 500,
    zIndex: 20,
    width: '100%',
    padding: '40px 20px 0px 20px',
    [MQ('960')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
  (props) => ({
    borderTopLeftRadius: props.isOnTop ? 20 : 0,
    borderTopRightRadius: props.isOnTop ? 20 : 0,
    marginTop: props.isOnTop ? -20 : 0,
    [MQ('960')]: {
      display: props.isWrapperFlex ? 'flex' : 'block',
      minHeight:
        props.hasSidebar && props.isHome
          ? 1100
          : props.hasSidebar && !props.isHome
          ? 600
          : 'auto',
      padding: '40px 20px 0px 20px',
    },
    [MQ('1200')]: {
      padding: props.hasSidebar ? '40px 110px 0px 20px' : '40px 20px 0px 20px',
    },
  })
);
