import { styled } from '@mui/system';

export const LogWrapper = styled('div')({
  padding: '80px 20px 0 20px',
  position: 'relative',
  textAlign: 'center',
});

export const Title = styled('div')({
  marginBottom: '16px',
  fontSize: '18px',
  fontWeight: 500,
});

export const LogWidget = styled('div')({
  maxWidth: '410px',
  background: '#fff',
  border: '1px solid #eee',
  borderRadius: '4px',
  padding: '20px',
  position: 'relative',
  margin: '0 auto',
});

export const FormWrapper = styled('div')({});

export const TopImage = styled('div')({
  paddingBottom: '20px',
  textAlign: 'center',
  '&img': {
    width: '200px',
  },
});

export const Copyright = styled('div')({
  marginTop: '40px',
  textAlign: 'center',
  opacity: '.6',
});
