export interface MedicinesState {
    medicines: any[],
    loading: boolean,
    error: null | string
};

export interface MedicineObj {
    id: string,
    type: number | string,
    description: string,
    dosageForm: number | string,
    container: number | string,
    state: number | string,
    expireAt: string,
};

export enum MedicinesActionTypes {
    FETCH_MEDICINES = 'FETCH_MEDICINES',
    FETCH_MEDICINES_SUCCESS = 'FETCH_MEDICINES_SUCCESS',
    FETCH_MEDICINES_ERROR = 'FETCH_MEDICINES_ERROR',
    ADD_MEDICINE = 'ADD_MEDICINE',
    ADD_MEDICINE_SUCCESS = 'ADD_MEDICINE_SUCCESS',
    EDIT_MEDICINE = 'EDIT_MEDICINE',
    EDIT_MEDICINE_SUCCESS = 'EDIT_MEDICINE_SUCCESS',
    DELETE_MEDICINE = 'DELETE_MEDICINE',
    DELETE_MEDICINE_SUCCESS = 'DELETE_MEDICINE_SUCCESS',
}

interface FetchMedicinesAction {
    type: MedicinesActionTypes.FETCH_MEDICINES,
};

interface FetchMedicinesSuccessAction {
    type: MedicinesActionTypes.FETCH_MEDICINES_SUCCESS,
    payload: any[],
};

interface FetchMedicinesErrorAction {
    type: MedicinesActionTypes.FETCH_MEDICINES_ERROR,
    payload: string,
};

interface AddMedicineAction {
    type: MedicinesActionTypes.ADD_MEDICINE,
};

interface AddMedicineSuccessAction {
    type: MedicinesActionTypes.ADD_MEDICINE_SUCCESS,
    payload: MedicineObj,
};

interface EditMedicineAction {
    type: MedicinesActionTypes.EDIT_MEDICINE,
};

interface EditMedicineSuccessAction {
    type: MedicinesActionTypes.EDIT_MEDICINE_SUCCESS,
    payload: MedicineObj,
};

interface DeleteMedicineAction {
    type: MedicinesActionTypes.DELETE_MEDICINE,
};

interface DeleteMedicineSuccessAction {
    type: MedicinesActionTypes.DELETE_MEDICINE_SUCCESS,
    payload: string,
};

export type MedicinesActionS = AddMedicineAction | AddMedicineSuccessAction |
    EditMedicineAction | EditMedicineSuccessAction |
    FetchMedicinesAction | FetchMedicinesSuccessAction | FetchMedicinesErrorAction |
    DeleteMedicineAction | DeleteMedicineSuccessAction;
