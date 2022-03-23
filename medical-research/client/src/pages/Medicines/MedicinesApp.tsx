import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Medicines from 'pages/Medicines/Routes/Medicines';
import Medicine from 'pages/Medicines/Routes/Medicine';
import MedicineEdit from 'pages/Medicines/Routes/MedicineEdit';
import { useTypedSelector } from 'hooks/useTypedSelector';

const MedicinesApp: React.FC = () => {
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
                <Route index element={<Medicines />} />
                <Route path='/:id' element={<Medicine />} />
                <Route path='/:id/edit' element={<MedicineEdit />} />
            </Routes>
        </>
    );
};

export default MedicinesApp;
