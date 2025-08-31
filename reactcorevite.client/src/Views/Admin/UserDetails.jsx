import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import Card from '../../components/Card/MainCard';

const APIURL = "http://localhost:7270";

const UserDetails = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch user details from API
    const handleDetails = async () => {
        try {
            const response = await axios.get("/api/auth/getdetails", {
                headers: { "Content-Type": "application/json" }
            });
            const result = response.data;
            console.log("Returned from API:", result);

            if (result.messagecode === "200")
            {
                const normalizedUsers = Array.isArray(result.user)
                    ? result.user
                    : result.user
                        ? [result.user]
                        : result.users
                            ? result.users
                            : [];

                setUsers(normalizedUsers);
                
            } else {
                swal("Warning", result.message, "info");
            }
        } catch (error) {
            if (error.response) {
                swal("Failed", error.message, "error");
            } else {
                console.error(error);
                swal("Error", "Server not responding", "error");
            }
        }
    };

    //Auto load API when component mounts
    useEffect(() => {
        handleDetails();
    }, []);

    // 🔹 Close modal
    const handleClose = () => setShow(false);

    // Handle Edit button
    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    // Handle save from modal (you can extend to call API update later)
    const handleSave = async () => {
        try {
            await axios.put(
                APIURL + `/api/auth/updateuser/${selectedUser.userid}`,
                selectedUser,
                { headers: { "Content-Type": "application/json" } }
            );

            swal("Success", "User updated successfully", "success");

            // Update table instantly
            setUsers((prev) =>
                prev.map((u) =>
                    u.userid === selectedUser.userid ? selectedUser : u
                )
            );

            setShow(false);
        } catch (error) {
            swal("Error", "Failed to update user", "error");
        }
    };

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card title="User Details" isOption>
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Mobile No</th>
                                    <th>Is Active</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={user.userId}>
                                            <td>{index + 1}</td>
                                            <td>{user.userName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.mobile_Number}</td>
                                            <td>
                                                {user.isActive ? (
                                                    <span style={{ color: "green" }}>✔️</span>
                                                ) : (
                                                    <span style={{ color: "red" }}>❌</span>
                                                )}
                                            </td>
                                            <td>
                                                <Button
                                                    size="sm"
                                                    variant="warning"
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>

            {/* 🔹 Edit User Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <Form>
                            <Form.Group className="mb-2">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedUser.username || ""}
                                    onChange={(e) =>
                                        setSelectedUser({
                                            ...selectedUser,
                                            username: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={selectedUser.email || ""}
                                    onChange={(e) =>
                                        setSelectedUser({
                                            ...selectedUser,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedUser.mobilE_NUMBER || ""}
                                    onChange={(e) =>
                                        setSelectedUser({
                                            ...selectedUser,
                                            mobilE_NUMBER: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Aadhaar</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedUser.aadhaR_NUMBER || ""}
                                    onChange={(e) =>
                                        setSelectedUser({
                                            ...selectedUser,
                                            aadhaR_NUMBER: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedUser.address || ""}
                                    onChange={(e) =>
                                        setSelectedUser({
                                            ...selectedUser,
                                            address: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Check
                                    type="checkbox"
                                    label="Active"
                                    checked={!!selectedUser.isactive}
                                    onChange={(e) =>
                                        setSelectedUser({
                                            ...selectedUser,
                                            isactive: e.target.checked ? 1 : 0,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default UserDetails;
