import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({ name:"",email: "", password: "",confirmPassword:"" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            history("/")
        }
        else {
            props.showAlert("Invalid credentials!","danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container">
        <form onSubmit={handleSubmit}>
            <h2 className="mb-3 my-5">Create an Acccount</h2>
                <div className="row my-4">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" name="name" className="form-control" id="name" onChange={onChange}/>
                    </div>
                </div>
              
                <div className="row my-4">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" name="email" className="form-control" id="email" onChange={onChange}/>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" name="password" className="form-control" id="password" onChange={onChange}/>
                    </div>
                </div>
                <div className="row my-4">
                    <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                    <div className="col-sm-10">
                        <input type="password" name="confirmPassword" className="form-control" id="confirmPassword" onChange={onChange}/>
                    </div>
                </div>

                <div className="row my-4">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup;
