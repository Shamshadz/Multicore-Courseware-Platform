import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Courses = ({ course, isEnrolled }) => { // Destructure `course` from props

    // useNavigate hook for navigation
    const navigate = useNavigate()

    // Function to handle course enrollment
    const handleEnroll = (courseId) => {
        // Redirect to the enrollment page for the selected course
        navigate(`/enrollment/${courseId}`); // Pass courseId to the enrollment page
    };

    const handleView = (courseId) => {
        // Redirect to the enrollment page for the selected course
        navigate(`/course/${courseId}`); // Pass courseId to the enrollment page
    };

    return (
        <Container className="mt-4">
            <Card key={course.id} className="mb-3">
                <Card.Img variant="top" src={course.image} style={{ height: '200px' }} />
                <Card.Body>
                    <Card.Title>{course.title}</Card.Title>

                    {isEnrolled ? (
                        <Button variant="primary" onClick={() => handleView(course.id)} block>
                            View
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={() => handleEnroll(course.id)} block>
                            Enroll
                        </Button>
                    )}
                </Card.Body>
            </Card>

        </Container>
    );
};

export default Courses;
