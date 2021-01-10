import { useState, useEffect } from "react";

const useValidation = (initialState, validate, fn) => {

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm){
            const noErrors = Object.keys(errors).length === 0;
            
            if(noErrors) {
                fn();
            }

            setSubmitForm(false);
        }
    }, [errors]);

    //when user tipping
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }
    //blur 
    const handleBlur = () => {
        
    }

    //when user hit submit
    const handleSubmit = e => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitForm(true)
        console.log(values);
    }
    return {
        values, 
        errors,
        handleChange,
        handleSubmit,
        handleBlur
    }
}

export default useValidation;