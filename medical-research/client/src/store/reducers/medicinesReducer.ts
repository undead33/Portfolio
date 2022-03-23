import { MedicinesState, MedicinesActionS, MedicinesActionTypes } from 'types/medicines';
import initialState from 'store/reducers/initialState';

const medicinesReducer = (state = initialState.medicines, action: MedicinesActionS)
    : MedicinesState => {
    switch (action.type) {
        case MedicinesActionTypes.FETCH_MEDICINES:
            return { medicines: [], loading: true, error: null, };

        case MedicinesActionTypes.FETCH_MEDICINES_SUCCESS:
            return { medicines: action.payload, loading: false, error: null, };

        case MedicinesActionTypes.FETCH_MEDICINES_ERROR:
            return { medicines: [], loading: false, error: action.payload, };

        case MedicinesActionTypes.ADD_MEDICINE:
            return { medicines: [...state.medicines], loading: true, error: null, };

        case MedicinesActionTypes.ADD_MEDICINE_SUCCESS:
            return {
                medicines: [...state.medicines, action.payload], loading: false, error: null,
            };

        case MedicinesActionTypes.EDIT_MEDICINE:
            return { medicines: [...state.medicines], loading: true, error: null, };

        case MedicinesActionTypes.EDIT_MEDICINE_SUCCESS:
            const editedMedicinesState = state.medicines.map(medicine => {
                if (medicine.id === action.payload.id) {
                    return action.payload;
                }

                return medicine;
            });

            return {
                medicines: [...editedMedicinesState], loading: false, error: null,
            };

        case MedicinesActionTypes.DELETE_MEDICINE:
            return { medicines: [...state.medicines], loading: true, error: null, };

        case MedicinesActionTypes.DELETE_MEDICINE_SUCCESS:
            const newMedicinesState = state.medicines.filter(medicine =>
                medicine.id !== action.payload);

            return {
                medicines: [...newMedicinesState], loading: false, error: null,
            };

        default:
            return state;
    }
}

export default medicinesReducer;
