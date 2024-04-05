import React, { useState, useEffect } from "react";
import Courses from '../component/Courses.jsx';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Home = () => {

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const { accessToken } = useSelector(
        state => state.auth
    );

    useEffect(() => {
        const fetchCourses = async () => {
            try {

                // Check if access token exists
                if (!accessToken) {
                    console.error('Access token not found in local storage');
                    return;
                }

                // Set the authorization header with the access token
                const headers = {
                    'Authorization': `Bearer ${accessToken}`
                };

                // Make the HTTP request with the authorization header
                const response = await axios.get(`${baseUrl}/courses/course-list/`, { headers });
                setCourses(response.data.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [baseUrl]);


    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                // Check if access token exists
                if (!accessToken) {
                    console.error('Access token not found in local storage');
                    return;
                }

                // Set the authorization header with the access token
                const headers = {
                    'Authorization': `Bearer ${accessToken}`
                };

                // Make the HTTP request with the authorization header
                const response = await axios.get(`${baseUrl}/courses/enrollments-list-detail/`, { headers });
                setEnrolledCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchEnrolledCourses();
    }, [baseUrl]);

    const isCourseEnrolled = (courseId) => {
        return enrolledCourses.some(course => course.course === courseId);
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Courses</h1>

            <Container className="mt-4">
                <Row className="mt-4">
                    {courses.map(course => (
                        <Col key={course.id} md={4}> {/* Ensure each child element has a unique key */}
                            <Courses
                                course={course}
                                isEnrolled={isCourseEnrolled(course.id)}
                            /> {/* Passing course.toString() */}
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
};

export default Home;