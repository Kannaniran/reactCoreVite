import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Card from '../../../components/Card/MainCard';

const AddUpdateProduct = () => {
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card title="Add/Update" isOption>
                        <p>
                          ADD/Update the product Details
                        </p>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default AddUpdateProduct;
