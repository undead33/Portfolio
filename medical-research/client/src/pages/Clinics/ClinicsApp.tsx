import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Clinics from 'pages/Clinics/Routes/Clinics';
import Clinic from 'pages/Clinics/Routes/Clinic';
import { useTypedSelector } from 'hooks/useTypedSelector';

const ClinicsApp: React.FC = () => {
    const { userName } = useTypedSelector((state) => state.user);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!userName) {
            navigate('/home');
        }
    }, [userName, navigate]);

    return (
        <>
            <Routes>
                <Route index element={<Clinics />} />
                <Route path='/:id' element={<Clinic />} />
            </Routes>
        </>
    );
};

export default ClinicsApp;
