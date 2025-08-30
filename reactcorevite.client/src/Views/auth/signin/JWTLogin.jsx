/************************************************************************** */
/* useState - getting the data from input field */
/************************************************************************** */
import React, { useState } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // API calling from React to ASP.NET Core
import swal from 'sweetalert';

var APIURL = 'https://localhost:7270';

const JWTLogin = () => {
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState(null);

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitError(null);
                try {
                    //Match C# model (Email, PasswordHash)
                    const response = await axios.post(APIURL+'/api/Auth/login', {
                        EMAIL: values.email,
                        PASSWORDHASH: values.password,
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
                        setSubmitError(error.response.data.message);
                        swal("Sign In Failed", error.response.data.message, "error");
                    } else {
                        setSubmitError("Server not responding");
                        swal("Error", "Server not responding", "error");
                    }
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <input
                            className="form-control"
                            placeholder="Email Address / Username"
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="email"
                            value={values.email}
                        />
                        {touched.email && errors.email && (
                            <small className="text-danger form-text">{errors.email}</small>
                        )}
                    </div>

                    <div className="form-group mb-4">
                        <input
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={values.password}
                        />
                        {touched.password && errors.password && (
                            <small className="text-danger form-text">{errors.password}</small>
                        )}
                    </div>

                    {submitError && (
                        <Alert variant="danger">
                            {submitError}
                        </Alert>
                    )}

                    <Row className="mt-3">
                        <Col>
                            <Button
                                className="w-100"
                                disabled={isSubmitting}
                                type="submit"
                                variant="primary"
                            >
                                Sign In
                            </Button>
                        </Col>
                    </Row>
                </form>
            )}
        </Formik>
    );
};

export default JWTLogin;
