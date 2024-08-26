import React, { useState } from 'react'
import axios from 'axios'
import UserForm from './UserForm'



const createUser = ()=>{
    const [formValues, setFormValues] = useState({name:'', email:'',amount:''})

    const onSubmit = userObject => {
        axios.post('http://localhost:4000/users/create-user', userObject).then(res => {
            if(res.status === 200){
                alert('User added Successfully')
                window.location = "/user-list"
            } 
            else Promise.reject();
            
        }).catch(err => alert(err));
    }

    return (
        <UserForm initialValues = {formValues}  onSubmit = {onSubmit} setFormValues={setFormValues} enableReinitialize> Create User</UserForm>

    )
}

export default createUser;
