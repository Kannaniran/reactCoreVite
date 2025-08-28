import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Card from '../../../components/Card/MainCard';

const ProductDetails = () => {
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card title="Product Details" isOption>
                        <p>
                            product Details
                        </p>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ProductDetails;
