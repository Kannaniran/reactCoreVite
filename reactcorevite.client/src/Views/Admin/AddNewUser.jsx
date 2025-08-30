import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'; // you missed this
var APIURL = 'http://localhost:7270';
const AddNewUser = () => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [address, setAddress] = useState('');
    const [userRoleId, setUserRoleId] = useState('');

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
            const response = await axios.post(APIURL +'/api/Auth/newusercreate', {
                EMAIL: email,
                PASSWORDHASH: password,
                USERNAME: username,
                MOBILE_NUMBER: mobileNumber,
                AADHAR_NUMBER: aadharNumber,
                ADDRESS: address,
                ISACTIVE: 1
            });

            const result = response.data;
            console.log("Returned from API:", result);

            if (result.messagecode === "200") {
                swal("Success", result.message, "success");
            } else
            {
                swal("Warning", result.message, "info");
            }
        } catch (error)
        {
            if (error.response)
            {
                swal("Sign Up Failed", error.message, "error");
            } else
            {
                console.log(error);
                swal("Error", "Server not responding", "error");
            }
        }
    };

    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Add User Details</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Mobile Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Mobile Number"
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Aadhar Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Aadhar Number"
                                                value={aadharNumber}
                                                onChange={(e) => setAadharNumber(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>User Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="User Name"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>User Role</Form.Label>
                                        <Form.Select
                                            value={userRoleId}
                                            onChange={(e) => setUserRoleId(e.target.value)}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="1">Admin</option>
                                            <option value="2">Manager</option>
                                            <option value="3">Staff</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows="2"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleSignUp}>Submit</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default AddNewUser;
