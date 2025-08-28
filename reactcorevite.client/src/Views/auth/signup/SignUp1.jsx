import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

const SignUp1 = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
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
            const response = await axios.post('http://localhost:5055/api/Auth/login', {
                EMAIL: email,
                PASSWORDHASH: password
            });

            const result = response.data;
            console.log("Returned from API:", result);

            if (result.messagecode === "200") {
                swal("Success", result.message, "success");
                navigate('/app/dashboard/default'); 
            } else {
                swal("Warning", result.message, "info");
            }
        } catch (error) {
            if (error.response) {
                swal("Sign Up Failed", error.response.data.message, "error");
            } else {
                swal("Error", "Server not responding", "error");
            }
        }
    };

    return (
        <React.Fragment>
            <Breadcrumb />
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r" />
                        <span className="r s" />
                        <span className="r s" />
                        <span className="r" />
                    </div>
                    <Card className="borderless">
                        <Row className="align-items-center">
                            <Col>
                                <Card.Body className="text-center">
                                    <div className="mb-4">
                                        <i className="feather icon-user-plus auth-icon" />
                                    </div>
                                    <h3 className="mb-4">Sign up</h3>
                                    <div className="input-group mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group mb-4">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <button className="btn btn-primary mb-4" onClick={handleSignUp}>
                                        Sign up
                                    </button>
                                    <p className="mb-2">
                                        Already have an account?{' '}
                                        <NavLink to="/auth/signin" className="f-w-400">
                                            Login
                                        </NavLink>
                                    </p>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SignUp1;
