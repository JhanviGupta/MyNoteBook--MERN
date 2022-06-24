import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            props.showAlert("Succesfulyy logged In!","success");
            history('/');
        }
        else {
            props.showAlert("Invalid credentials!","danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className="my-5">Login</h2>
                <div className="mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" value={credentials.email} className="form-control" id="email" onChange={onChange} aria-describedby="email" placeholder="Enter email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={credentials.password} className="form-control" name="password" id="password" onChange={onChange} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;
