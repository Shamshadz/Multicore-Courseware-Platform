import React from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation


const Courses = () => {
    // Dummy data for courses
    const courses = [
        { id: 1, title: 'Course 1', description: 'Description for Course 1' },
        { id: 2, title: 'Course 2', description: 'Description for Course 2' },
        { id: 3, title: 'Course 3', description: 'Description for Course 3' },
        { id: 4, title: 'Course 4', description: 'Description for Course 4' },
        { id: 5, title: 'Course 5', description: 'Description for Course 5' },
    ];

    // useNavigate hook for navigation
    const navigate = useNavigate()

    // Function to handle course enrollment
    const handleEnroll = (courseId) => {
        // Redirect to the enrollment page for the selected course
        navigate(`/enrollment`)
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Courses</h1>
            <Row className="mt-4">
                {courses.map(course => (
                    <Col key={course.id} md={4}>
                        <Card className="mb-3">
                            <Card.Img variant="top" src="https://www.openmp.org/wp-content/uploads/SC23-Event-Banner.png" />
                            <Card.Body>
                                <Card.Title>{course.title}</Card.Title>
                                <Card.Text>
                                    {course.description}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleEnroll(course.id)}>
                                    Enroll
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </Container>
    );
};

export default Courses;
