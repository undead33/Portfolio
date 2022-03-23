import axios from 'axios';

const hostAndService = 'http://localhost:10001/api/Clinics';
const headersObj = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
};

export const getAllClinicsReq = (token: string | null) =>
    axios.get(`${hostAndService}/FindAll`, {
        headers: {
            Authorization: `Bearer ${token}`,
            ...headersObj,
        },
    });

export const addClinicReq = (newClinic: any, token: string | null) =>
    axios.post(`${hostAndService}/Create`, newClinic, {
        headers: {
            Authorization: `Bearer ${token}`,
            ...headersObj,
        },
    });
