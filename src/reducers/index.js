import { combineReducers } from 'redux';
import { customers } from './customers';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
    customers,
    form: reduxForm //Es importante que se utilice el key form, ya que es lo que está esperando la librería redux-form
});