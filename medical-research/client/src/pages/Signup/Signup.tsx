import React from 'react';
import Loader from 'components/base/Loader';
import Box from '@mui/material/Box';
import { LogInPageArea, LogInPageImage } from 'pages/Login/Login';
import SignupForm from 'pages/Signup/components/SignupForm';
import { useTypedSelector } from 'hooks/useTypedSelector';

const Signup: React.FC = () => {
    const { loading } = useTypedSelector(state => state.user);

    if (loading) {
        return (
            <>
                <Loader />
            </>
        );
    }

    return (
        <LogInPageArea
            gridTemplateColumns={['1fr', '1fr 1fr']}
            gridTemplateAreas={['"form"', '"image form"']}
        >
            <Box display={['none', 'flex']}>
                <LogInPageImage src={require('../../images/loginAside.jpg')} />
            </Box>

            <SignupForm />
        </LogInPageArea>
    );
};

export default Signup;
