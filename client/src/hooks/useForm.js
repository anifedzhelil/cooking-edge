import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler, onResetHandler) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}));
    };

    const checkChangeHandler = (e) =>{
        setValues(state => ({...state, [e.target.name]: e.target.checked}));        
    }

    const fileChangeHandler = (e) =>{
        setValues(state => ({...state, [e.target.name]: e.target.files})); 
    }

    const onSubmit = (e) => {
        e.preventDefault();

        onSubmitHandler(values);
    };

    const onReset = () => {
        setValues(initialValues);
        onResetHandler();
    };

    const changeValues = (newValues) =>{
        
        setValues(newValues);
    };

    
    return {
        values,
        changeHandler,
        onSubmit,
        changeValues,
        checkChangeHandler,
        fileChangeHandler,
        onReset,
    };
};