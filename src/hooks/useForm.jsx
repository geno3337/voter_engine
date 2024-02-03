import React, { useState } from 'react'
import {omit} from 'lodash'


const useForm = (callback) => {
    
    //Form values
    const [values, setValues] = useState({});
    //Errors
    const [errors, setErrors] = useState({});
    
    
    const validate = (event, name, value) => {
        //A function to validate each input values

        switch (name) {
            case 'username':
                if(value.length <= 4){
                    // we will set the error state

                    setErrors({
                        ...errors,
                        username:'Username atleast have 5 letters'
                    })
                }else{
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "username");
                    setErrors(newObj);
                    
                }
                break;
        
            case 'Email':
                if(
                    !new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value)
                ){
                    setErrors({
                        ...errors,
                        email:'Enter a valid email address'
                    })
                }else{

                    let newObj = omit(errors, "email");
                    setErrors(newObj);
                    
                }
            break;
            
            case 'passWord':
                if(
                    !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
                ){
                    setErrors({
                        ...errors,
                        password:'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
                    })
                }else{

                    let newObj = omit(errors, "password");
                    setErrors(newObj);
                    
                }
            break;
            case 'age':
                if(value<=18){
                    setErrors({
                        ...errors,
                        age:'age must be greate then 18'
                    })
                }
            
            default:
                break;
        }
    }



  //A method to handle form inputs
    const handleChange = (event) => {
        //To stop default events    
        event.persist();

        let name = event.target.name;
        let val = event.target.value;
        
        validate(event,name,val);
        console.log(errors)

        //Let's set these values in state
        setValues({
            ...values,
            [name]:val,
        })

    }

    const handleSubmit = (event) => {
        if(event) event.preventDefault();

        if(Object.keys(errors).length === 0 && Object.keys(values).length !==0 ){
            callback();

        }else{
            alert("There is an Error!");
        }
    }
    return {
        values,
        errors,
        handleChange,
        handleSubmit
    }
}

export default useForm