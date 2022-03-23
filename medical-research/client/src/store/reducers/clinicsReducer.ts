import { ClinicsState, ClinicsActionS, ClinicsActionTypes } from 'types/clinics';
import initialState from 'store/reducers/initialState';

const clinicsReducer = (state = initialState.clinics, action: ClinicsActionS)
    : ClinicsState => {
    switch (action.type) {
        case ClinicsActionTypes.FETCH_CLINICS:
            return { clinics: [], loading: true, error: null, };

        case ClinicsActionTypes.FETCH_CLINICS_SUCCESS:
            return { clinics: action.payload, loading: false, error: null, };

        case ClinicsActionTypes.FETCH_CLINICS_ERROR:
            return { clinics: [], loading: false, error: action.payload, };

        case ClinicsActionTypes.ADD_CLINIC:
            return { clinics: [...state.clinics], loading: true, error: null, };

        case ClinicsActionTypes.ADD_CLINIC_SUCCESS:
            return {
                clinics: [...state.clinics, action.payload], loading: false, error: null,
            };

        default:
            return state;
    }
}

export default clinicsReducer;
