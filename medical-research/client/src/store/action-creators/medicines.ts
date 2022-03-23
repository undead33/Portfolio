import { MedicinesActionS, MedicinesActionTypes } from 'types/medicines';
import { Dispatch } from 'redux';
import { MedicineObj } from 'types/medicines';
import {
    getAllMedicinesReq, addMedicineReq, deleteMedicineReq, editMedicineReq
} from 'api/medicines';
import axiosErrCatching from 'tools/axiosErrCatching';

export const fetchMedicines = () =>
    async (dispatch: Dispatch<MedicinesActionS>) => {
        dispatch({ type: MedicinesActionTypes.FETCH_MEDICINES });
        let token: string | null = localStorage.getItem('token');

        try {
            const response = await getAllMedicinesReq(token);

            dispatch({
                type: MedicinesActionTypes.FETCH_MEDICINES_SUCCESS,
                payload: response.data
            });
        } catch (err: any) {
            let errMessage = axiosErrCatching(err.message, 'fetchMedicines');

            dispatch({
                type: MedicinesActionTypes.FETCH_MEDICINES_ERROR,
                payload: errMessage,
            });
        }
    };


export const addMedicine = (newMedicine: MedicineObj) =>
    async (dispatch: Dispatch<MedicinesActionS>) => {
        dispatch({ type: MedicinesActionTypes.ADD_MEDICINE });
        let token: string | null = localStorage.getItem('token');

        try {
            const response = await addMedicineReq(newMedicine, token);

            if (response.status === 200) {
                dispatch({
                    type: MedicinesActionTypes.ADD_MEDICINE_SUCCESS,
                    payload: newMedicine,
                });
            }
        } catch (err: any) {
            let errMessage = axiosErrCatching(err.message, 'addMedicine');

            dispatch({
                type: MedicinesActionTypes.FETCH_MEDICINES_ERROR,
                payload: errMessage,
            });
        }
    };

export const editMedicine = (editedMedicine: MedicineObj) =>
    async (dispatch: Dispatch<MedicinesActionS>) => {
        dispatch({ type: MedicinesActionTypes.EDIT_MEDICINE });
        let token: string | null = localStorage.getItem('token');

        try {
            const response = await editMedicineReq(editedMedicine, editedMedicine.id, token);

            if (response.status === 200) {
                dispatch({
                    type: MedicinesActionTypes.EDIT_MEDICINE_SUCCESS,
                    payload: editedMedicine,
                });
            }

        } catch (err: any) {
            let errMessage = axiosErrCatching(err.message, 'editMedicine');

            dispatch({
                type: MedicinesActionTypes.FETCH_MEDICINES_ERROR,
                payload: errMessage,
            });
        }
    };

export const deleteMedicine = (medicineId: string) =>
    async (dispatch: Dispatch<MedicinesActionS>) => {
        dispatch({ type: MedicinesActionTypes.DELETE_MEDICINE });
        let token: string | null = localStorage.getItem('token');

        try {
            const response = await deleteMedicineReq(medicineId, token)

            if (response.status === 200) {
                dispatch({
                    type: MedicinesActionTypes.DELETE_MEDICINE_SUCCESS,
                    payload: medicineId,
                });
            }
        } catch (err: any) {
            let errMessage = axiosErrCatching(err.message, 'deleteMedicine');

            dispatch({
                type: MedicinesActionTypes.FETCH_MEDICINES_ERROR,
                payload: errMessage,
            });
        }
    };
