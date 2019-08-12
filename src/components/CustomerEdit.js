import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { setPropsAsInitial } from '../helpers/setPropsAsInitial';
import CustomersActions from './CustomersActions';
import { Prompt } from 'react-router-dom';

// const isRequired = value => (
//     !value && "Este campo es requerido"
// );

const isNumber = value => (
    isNaN(Number(value)) && "El campo debe ser numérico"
);

const validate = values => {
    const error = {};

    if (!values.name) {
        error.name = "El campo nombre es requerido";
    }

    if (!values.dni) {
        error.dni = "El Dni es un campo obligatorio";
    }

    return error;
};

const MyField = ({input, meta, type, label, name}) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <input {...input} type={ !type ? "text" : type }/> {/*Con el spread operator se le pasa todas las propiedades que contiene un campo input normal */}
        {
         meta.touched && meta.error && <span>{meta.error}</span>
        }
    </div>
);

const toNumber = value => value && Number(value);
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
const onlyGrow = (value, previousValue, values) => (
    value && (!previousValue ? value : (value > previousValue ? value : previousValue))
);

const CustomerEdit = ({ name, dni, age, handleSubmit, submitting, onBack, pristine, submitSucceeded }) => {
    return (
        <div>
            <h2>Edición del cliente</h2>
            <form onSubmit={handleSubmit}>
                <Field 
                    name="name" 
                    label="Nombre"
                    component={MyField} 
                    parse={toUpper}
                    format={toLower}
                ></Field>
                <Field 
                    name="dni" 
                    label="Dni"
                    component={MyField}
                ></Field>
                <Field 
                    name="age"
                    label="Edad" 
                    component={MyField}
                    type="number"
                    validate={isNumber}
                    parse={toNumber}
                    normalize={onlyGrow}
                ></Field>
                <CustomersActions>
                    <button type="submit" disabled={pristine || submitting}>
                        Aceptar
                    </button>
                    <button type="button" disabled={submitting} onClick={onBack}>
                        Cancelar
                    </button>
                </CustomersActions>
                <Prompt
                    when={!pristine && !submitSucceeded /* pristine es un booleano para ver si hubo una edición en el form*/}
                    message="Se perderán los datos si continua..."
                ></Prompt>
            </form>
        </div>
    );
};

CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    handleSubmit: PropTypes.func,
    onBack: PropTypes.func.isRequired,
};

const CustomerEditForm = reduxForm(
    { 
        form: 'CustomerEdit',
        validate
    }
)(CustomerEdit);

export default setPropsAsInitial(CustomerEditForm);