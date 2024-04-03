import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';


const CourseLandingScreen = () => {

    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const jhubBaseUrl = process.env.REACT_APP_API_BASE_JHUB_URL;
    const jhubAdminToken = process.env.REACT_APP_API_JHUB_ADMIN_TOKEN;

    const { courseId } = useParams();
    const [course, setCourse] = useState([]);
    const [courseContent, setCourseContent] = useState([]);
    const [jhubToken, setJhubToken] = useState('');
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const fetch = async () => {
            try {
                // Retrieve access token from local storage
                const accessToken = localStorage.getItem('access_token');

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
                const response = await axios.get(`${baseUrl}/notebook-utlis/get-jhub-user-token/`, { headers });

                setJhubToken(response.data.token);
                setFirstName(response.data.first_name);

            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        // Call fetch function
        fetch();

    }, [baseUrl]);


    useEffect(() => {
        const fetchCourses = async () => {
            try {

                // Retrieve access token from local storage
                const accessToken = localStorage.getItem('access_token');

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
                const response = await axios.get(`${baseUrl}/courses/course/detail/${courseId}/`, { headers });

                setCourse(response.data.data);

            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [baseUrl]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {

                // Retrieve access token from local storage
                const accessToken = localStorage.getItem('access_token');

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
                const response = await axios.get(`${baseUrl}/courses/${courseId}/content/`, { headers });

                setCourseContent(response.data.data);

            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [baseUrl]);

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
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <Row>
                    <Col>
                        <p><strong>Instructor:</strong> Dr. Omkar</p>
                        <p><strong>Duration:</strong> 40 hr</p>
                        <p><strong>Price:</strong> $ 499</p>
                        <p><strong>Rating:</strong> 5.3</p>
                    </Col>
                    <Col>
                        <img src={course.image} alt={course.title} />
                    </Col>
                </Row>

                <Col className="mt-4">
                    {courseContent.map((content) => (
                        <Row key={content.id} className="mb-4">
                            <Button variant="primary" className="me-3" href={`${jhubBaseUrl}/user/${firstName.toLowerCase()}/notebooks/${content.content}?token=${jhubToken}`}>
                                {content.title}
                            </Button>
                        </Row>
                    ))}
                    <Row>
                        <Button variant="secondary" href="/home">
                            Back to Courses
                        </Button>
                    </Row>
                </Col>


            </Container>
        </>
    );
};

export default CourseLandingScreen;
