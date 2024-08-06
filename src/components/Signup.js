import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import FontAwesome icons
import '../App.css'; // Ensure this path is correct
const host = process.env.REACT_APP_URL;

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [showPassword, setShowPassword] = useState(false); // Manage password visibility
    const [showCPassword, setShowCPassword] = useState(false); // Manage confirm password visibility
    const [error, setError] = useState(""); // For error messages

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;

        if (password !== cpassword) {
            props.showAlert("Invalid Password", "danger");
            setCredentials({ name: "", email: "", password: "", cpassword: "" }); // Clear the form
            return;
        }

        const response = await fetch(`${host}/api/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.authToken);
            navigate("/");
            props.showAlert("Account Created Successfully", "success");
        } else {
            props.showAlert("Invalid Details", "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        if (error) setError(""); // Clear error when the user starts typing
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <h2 className="text-center my-2">Create an account to use NoteMaster</h2>
                <div className="col-md-4">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control custom-input" id="name" name="name" value={credentials.name} onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control custom-input" id="email" name="email" value={credentials.email} onChange={onChange} required />
                        </div>
                        <div className="mb-3 position-relative">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="form-control custom-input" 
                                id="password" 
                                name="password" 
                                value={credentials.password} 
                                onChange={onChange} 
                                minLength={5} 
                                required 
                            />
                            <span 
                                className="password-toggle-icon" 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </span>
                        </div>
                        <div className="mb-3 position-relative">
                            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                            <input 
                                type={showCPassword ? "text" : "password"} 
                                className="form-control custom-input" 
                                id="cpassword" 
                                name="cpassword" 
                                value={credentials.cpassword} 
                                onChange={onChange} 
                                minLength={5} 
                                required 
                            />
                            <span 
                                className="password-toggle-icon" 
                                onClick={() => setShowCPassword(!showCPassword)}
                            >
                                {showCPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </span>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
