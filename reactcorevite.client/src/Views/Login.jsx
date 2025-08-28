import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            swal("Missing Email", "Please enter your email address.", "warning");
            return;
        }

        if (!emailRegex.test(email)) {
            swal("Invalid Email", "Enter a valid email address.", "error");
            return;
        }

        if (!password.trim()) {
            swal("Missing Password", "Please enter your password.", "warning");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5055/api/auth/login', {
                EMAIL: email,
                PASSWORDHASH: password
            });

            const result = response.data;

            console.log("Returned from API:", result);

            if (result.messagecode === "200") {
                swal("Success", result.message, "success");
                    navigate('/dashboard');
            } else {
                swal("Warning", result.message, "info");
            }

        } catch (error) {
            if (error.response) {
                swal("Login Failed", error.response.data.message, "error");
            } else {
                swal("Error", "Server not responding", "error");
            }
        }
    };

    return (
        <div className="container-fluid bg-light d-flex align-items-center justify-content-center min-vh-100">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h4 className="text-center mb-4 text-primary">Technology Login</h4>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-envelope"></i>
                        </span>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-lock"></i>
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button type="button" className="btn btn-primary w-100" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
