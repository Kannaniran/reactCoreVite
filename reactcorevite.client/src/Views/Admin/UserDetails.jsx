
import React, { useState } from 'react';
import { Row, Col, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

import Card from '../../components/Card/MainCard';

const UserDetails = () => {
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card title="User Details" isOption>
                        <p>
                            User Details
                        </p>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default UserDetails;
