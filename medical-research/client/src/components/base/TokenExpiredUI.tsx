import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const TokenExpiredUIContainer = styled(Box)({
    marginTop: 40,
    display: 'grid',
    gridTemplateRows: '60px 60px',
    justifyItems: 'center',
    alignItems: 'center',
    gap: 10,
});

const ErrorMessage = styled(Typography)({
});

interface TokenExpiredUIProps {
    error: string;
}

const TokenExpiredUI: React.FC<TokenExpiredUIProps> = ({ error }) => {
    const navigate = useNavigate();
    const redirectToLogin = () => { navigate('/login'); };

    return (
        <TokenExpiredUIContainer>
            <ErrorMessage>{error}</ErrorMessage>

            <Button sx={{ width: 150 }} onClick={redirectToLogin}>
                go to log in page
            </Button>
        </TokenExpiredUIContainer>
    );
};

export default TokenExpiredUI;
