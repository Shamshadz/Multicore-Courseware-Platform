import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const EnrollmentScreen = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1>Welcome to our Course Platform</h1>
          <p>Explore a wide range of courses and enhance your skills.</p>
          <Button variant="primary" href="/Payment">Enroll</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EnrollmentScreen;
