import { useState } from "react";

const UseForm = (initialState) => {

    // The input values using the provided initialState
    const [inputValues, setInputValues] = useState(initialState);

    //Function to reset all form input values to their initial state
    const resetForm = ()=>{
        setInputValues(initialState); 
    };


    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setInputValues({
            ...inputValues,// previous inputvalues update
            [name] : value,
        });
    };

    //  Function to set form inputs with new values programmatically
    const setForm = (newValues)=>{
        setInputValues(newValues);
    };


    // return a objects
    return {
        inputValues,
        handleInputChange,
        resetForm,
        setForm,
    };
};

export default UseForm;



