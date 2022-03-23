import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home/Routes/Home';
import Users from 'pages/Home/Routes/Users';
import User from 'pages/Home/Routes/User';
import Tasks from 'pages/Home/Routes/Tasks';

const HomeApp: React.FC = () => {
    return (
        <>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/users' element={<Users />} />
                <Route path='/users/:id' element={<User />} />
                <Route path='/tasks' element={<Tasks />} />
            </Routes>
        </>
    );
};

export default HomeApp;
