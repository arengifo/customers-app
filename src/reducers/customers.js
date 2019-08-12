import { handleActions } from 'redux-actions'; // Permite manejar las acciones que da reduxActions para manejar los reducers
import { FETCH_CUSTOMERS } from '../constants';

export const customers = handleActions({
    [FETCH_CUSTOMERS]: (state, action) => [ ...action.payload],
}, []); //El primer parámetro es el state y el segundo es el valor por defecto del state