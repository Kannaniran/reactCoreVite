import React from 'react';
import { Row, Col, Card, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

const dashSalesData = [
    { title: 'Daily Sales', amount: '$249.95', icon: 'icon-arrow-up text-c-green', value: 50, class: 'progress-c-theme' },
    { title: 'Monthly Sales', amount: '$2,942.32', icon: 'icon-arrow-down text-c-red', value: 36, class: 'progress-c-theme2' },
    { title: 'Yearly Sales', amount: '$8,638.32', icon: 'icon-arrow-up text-c-green', value: 70, class: 'progress-c-theme' }
];

const userActivity = [
    { name: 'Silje Larsen', avatar: avatar1, trend: 'up', score: 3784 },
    { name: 'Julie Vad', avatar: avatar2, trend: 'up', score: 3544 },
    { name: 'Storm Hanse', avatar: avatar3, trend: 'down', score: 2739 },
    { name: 'Frida Thomse', avatar: avatar1, trend: 'down', score: 1032 },
    { name: 'Silje Larsen', avatar: avatar2, trend: 'up', score: 8750 },
    { name: 'Storm Hanse', avatar: avatar3, trend: 'down', score: 8750 }
];

const DashDefault = () => {
    const renderTabContent = () =>
        userActivity.map((user, index) => (
            <div key={index} className="d-flex friendlist-box align-items-center justify-content-center mb-3">
                <div className="me-3 photo-table flex-shrink-0">
                    <Link to="#">
                        <img className="rounded-circle" style={{ width: '40px' }} src={user.avatar} alt="activity-user" />
                    </Link>
                </div>
                <div className="flex-grow-1">
                    <h6 className="m-0 d-inline">{user.name}</h6>
                    <span className="float-end d-flex align-items-center">
                        <i className={`fa fa-caret-${user.trend} f-22 me-2 ${user.trend === 'up' ? 'text-c-green' : 'text-c-red'}`} />
                        {user.score}
                    </span>
                </div>
            </div>
        ));

    return (
        <React.Fragment>
            <Row>
                {dashSalesData.map((data, index) => (
                    <Col key={index} xl={6} xxl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className="mb-4">{data.title}</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            <i className={`feather ${data.icon} f-30 me-2`} />
                                            {data.amount}
                                        </h3>
                                    </div>
                                    <div className="col-3 text-end">
                                        <p className="mb-0">{data.value}%</p>
                                    </div>
                                </div>
                                <div className="progress mt-3" style={{ height: '7px' }}>
                                    <div
                                        className={`progress-bar ${data.class}`}
                                        role="progressbar"
                                        style={{ width: `${data.value}%` }}
                                        aria-valuenow={data.value}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                <Col md={6} xl={12} className="user-activity">
                    <Card>
                        <Tabs defaultActiveKey="today" id="dashboard-tabs" className="mb-3">
                            <Tab eventKey="today" title="Today">
                                {renderTabContent()}
                            </Tab>
                            <Tab eventKey="week" title="This Week">
                                {renderTabContent()}
                            </Tab>
                            <Tab eventKey="all" title="All">
                                {renderTabContent()}
                            </Tab>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default DashDefault;
