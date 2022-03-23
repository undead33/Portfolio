import axios from 'axios';

const hostAndService = 'http://localhost:10001/Medicines';
const headersObj = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
};

export const getAllMedicinesReq = (token: string | null) =>
    axios.get(`${hostAndService}/FindAll`, {
        headers: {
            Authorization: `Bearer ${token}`,
            ...headersObj,
        },
    });

export const addMedicineReq = (newMedicine: any, token: string | null) =>
    axios.post(`${hostAndService}/Create`, newMedicine, {
        headers: {
            Authorization: `Bearer ${token}`,
            ...headersObj,
        },
    });

export const editMedicineReq = (
    editedMedicine: any, editedMedicineId: string | null, token: string | null
) => axios.put(`${hostAndService}/Update?id=${editedMedicineId}`, editedMedicine, {
    headers: {
        Authorization: `Bearer ${token}`,
        ...headersObj,
    },
});

export const deleteMedicineReq = (medicineId: string | null, token: string | null) =>
    axios.delete(`${hostAndService}/Delete?id=${medicineId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            ...headersObj,
        },
    });
