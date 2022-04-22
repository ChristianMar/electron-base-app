import { styled } from '@mui/system';
import { Colors } from '../../styles/UIColors';

export const ErrorWrapper = styled('div')({
  marginBottom: '10px',
});

export const ErrorListUl = styled('ul')({
  padding: 0,
  margin: 0,
  textAlign: 'left',
});

export const ErrorListLi = styled('lli')({
  fontWeight: 600,
  fontSize: '13px',
  color: Colors.error,
  display: 'block',
  marginBottom: '5px',
  listStyleType: 'none',
});
