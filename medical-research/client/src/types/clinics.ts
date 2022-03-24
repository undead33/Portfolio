export interface ClinicsState {
    clinics: any[],
    loading: boolean,
    error: null | string
};

export interface ClinicObj {
    id: string,
    name: null | string,
    city: { id: number, name: string },
    address: null | string,
    phoneNumber: string | null | undefined,
    phone: string | null | undefined,
    medicineId: string | null,
    medicines: string | null,
};

export interface NewClinicValues {
    name: string,
    city: string,
    address: string,
    phone: string,
};

export interface NewClinicObj {
    id: string,
    name: string,
    city: { id: number, name: string },
    address: string,
    phone: string,
};

export enum ClinicsActionTypes {
    FETCH_CLINICS = 'FETCH_CLINICS',
    FETCH_CLINICS_SUCCESS = 'FETCH_CLINICS_SUCCESS',
    FETCH_CLINICS_ERROR = 'FETCH_CLINICS_ERROR',
    ADD_CLINIC = 'ADD_CLINIC',
    ADD_CLINIC_SUCCESS = 'ADD_CLINIC_SUCCESS',
}

interface FetchClinicsAction {
    type: ClinicsActionTypes.FETCH_CLINICS,
};

interface FetchClinicsSuccessAction {
    type: ClinicsActionTypes.FETCH_CLINICS_SUCCESS,
    payload: any[],
}

interface FetchClinicsErrorAction {
    type: ClinicsActionTypes.FETCH_CLINICS_ERROR,
    payload: string,
};

interface AddClinicAction {
    type: ClinicsActionTypes.ADD_CLINIC,
};

interface AddClinicSuccessAction {
    type: ClinicsActionTypes.ADD_CLINIC_SUCCESS,
    payload: NewClinicObj,
};

export type ClinicsActionS = FetchClinicsAction | FetchClinicsSuccessAction
    | FetchClinicsErrorAction | AddClinicAction | AddClinicSuccessAction
