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
            console.log(response.data)/////////////
            dispatch({
                type: ClinicsActionTypes.FETCH_CLINICS_SUCCESS,
                payload: response.data
            });
        } catch (err: any) {
            console.log(err)//////////////
            let errMessage = axiosErrCatching(err.message, 'fetchClinics');
            console.log(errMessage)//////////////
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
        console.log(newClinic)/////////////
        try {
            const response = await addClinicReq(newClinic, token);
            console.log('response.data: ', response.data)/////////////
            if (response.status === 200) {
                dispatch({
                    type: ClinicsActionTypes.ADD_CLINIC_SUCCESS,
                    payload: newClinic,
                });
            }
        } catch (err: any) {
            let errMessage = axiosErrCatching(err.message, 'addClinic');
            console.log(err)//////////////
            dispatch({
                type: ClinicsActionTypes.FETCH_CLINICS_ERROR,
                payload: errMessage,
            });
        }
    };
