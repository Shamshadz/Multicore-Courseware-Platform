import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const CourseLandingScreen = () => {
    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <h1>Welcome to our Course Platform</h1>
                        <p>Explore a wide range of courses and enhance your skills.</p>
                    </Col>
                </Row>
            </Container>

            <Container className="mt-4">
                <h2>OpenMP</h2>
                <p>course.description</p>
                <Row>
                    <Col>
                        <p><strong>Instructor:</strong> Dr. Omkar</p>
                        <p><strong>Duration:</strong> 40 hr</p>
                        <p><strong>Price:</strong> $ 499</p>
                        <p><strong>Rating:</strong> 5.3</p>
                    </Col>
                    <Col>
                        <img src="https://www.openmp.org/wp-content/uploads/SC23-Event-Banner.png" alt="{course.title}" />
                    </Col>
                </Row>

                <Button variant="primary" className="me-3" href="{course.labURL}">Lab</Button>
                <Button variant="secondary" href="/">Back to Courses</Button>
            </Container>
        </>
    );
};

export default CourseLandingScreen;
