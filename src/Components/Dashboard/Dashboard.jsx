import React from 'react';

import { Card } from "Components/Commons/Commons";

import { Row, Col } from 'antd';

function Dashboard() {
    return (
        <>
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <Card>
                        Card
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card>
                        Card
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card>
                        Card
                    </Card>
                </Col>
            </Row>
            
        </>
    )
}

export default Dashboard;