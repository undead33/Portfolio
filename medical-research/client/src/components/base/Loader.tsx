import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LoaderContainer = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
});

const LoaderTittle = styled(Typography)({
    width: '200px',
    height: '40px',
    marginBottom: 20,
    fontSize: 28,
    color: 'var(--colors-ui-base)',
    textAlign: 'center',
});

const LoaderAnimation = styled(Box)({
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    border: '3px dashed teal',
    animation: 'rotate 1s infinite linear',
    marginTop: 40,
});

const Loader = () => {
    return (
        <LoaderContainer>
            <LoaderTittle>Loading...</LoaderTittle>
            <LoaderAnimation />
        </LoaderContainer>
    );
};

export default Loader;
