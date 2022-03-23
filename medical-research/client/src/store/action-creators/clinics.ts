import { ClinicsActionS, ClinicsActionTypes } from 'types/clinics';
import { Dispatch } from 'redux';
import { getAllClinicsReq, addClinicReq } from 'api/clinics';
import { NewClinicObj } from 'types/clinics';
import axiosErrCatching from 'tools/axiosErrCatching';

export const fetchClinics = () =>
    async (dispatch: Dispatch<ClinicsActionS>) => {
        dispatch({ type: ClinicsActionTypes.FETCH_CLINICS });
        let token: string | null = localStorage.getItem('token');

        try {
            const response = await getAllClinicsReq(token);

            dispatch({
                type: ClinicsActionTypes.FETCH_CLINICS_SUCCESS,
                payload: response.data
            });
        } catch (err: any) {
            let errMessage = axiosErrCatching(err.message, 'fetchClinics');

            dispatch({
                type: ClinicsActionTypes.FETCH_CLINICS_ERROR,
                payload: errMessage,
            });
        }
    };

export const addClinic = (newClinic: NewClinicObj) =>
    async (dispatch: Dispatch<ClinicsActionS>) => {
        dispatch({ type: ClinicsActionTypes.ADD_CLINIC });
        let token: string | null = localStorage.getItem('token');

        try {
            const response = await addClinicReq(newClinic, token);

            if (response.status === 200) {
                dispatch({
                    type: ClinicsActionTypes.ADD_CLINIC_SUCCESS,
                    payload: newClinic,
                });
            }
        } catch (err: any) {
            let errMessage = axiosErrCatching(err.message, 'addClinic');

            dispatch({
                type: ClinicsActionTypes.FETCH_CLINICS_ERROR,
                payload: errMessage,
            });
        }
    };
