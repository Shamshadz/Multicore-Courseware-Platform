import React from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';



const CourseLandingScreen = () => {

    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const jhubBaseUrl = process.env.REACT_APP_API_BASE_JHUB_URL;
    const jhubAdminToken = process.env.REACT_APP_API_JHUB_ADMIN_TOKEN;

    const { courseId } = useParams();
    const [course, setCourse] = useState([]);
    const [courseContent, setCourseContent] = useState([]);
    const [courseCompleted, setCourseCompleted] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [isTokenFetched, setIsTokenFetched] = useState(false);
    const [jhubToken, setJhubToken] = useState('');

    const [showCertificateModal, setShowCertificateModal] = useState(false);
    const [courseCertificate, setCourseCertificate] = useState([]);

    const handleViewCertificate = () => {
        setShowCertificateModal(true);
    };


    const { accessToken } = useSelector(
        state => state.auth
    );


    /// Get Token For JHUB server
    useEffect(() => {
        const fetch = async () => {
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
                const response = await axios.get(`${baseUrl}/notebook-utlis/get-jhub-user-token/`, { headers });

                setJhubToken(response.data.token);
                setFirstName(response.data.first_name);
                setIsTokenFetched(true);

            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        // Call fetch function
        fetch();

    }, [baseUrl]);

    /// Get Course Detail
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
                const response = await axios.get(`${baseUrl}/courses/course/detail/${courseId}/`, { headers });

                setCourse(response.data.data);

            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [baseUrl]);

    /// get course-content and progress
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
                // const response = await axios.get(`${baseUrl}/courses/${courseId}/content/`, { headers });
                const response = await axios.get(`${baseUrl}/courses/get-course/${courseId}/contents/progress/`, { headers });

                setCourseContent(response.data.course_content_progress);

            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [baseUrl]);


    const [visitedButtons, setVisitedButtons] = useState([]);

    // Function to handle button click and mark it as visited mark the content visited or completed
    const handleButtonClick = (contentId) => {
        // Check if the button is already marked as visited
        if (!visitedButtons.includes(contentId)) {
            // If not visited, add it to the visitedButtons state
            setVisitedButtons([...visitedButtons, contentId]);
        }

        const fetch = async () => {
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

                const body = {
                };

                // Make the HTTP request with the authorization header
                const response = await axios.post(`${baseUrl}/courses/post-course/${courseId}/contents/${contentId}/progress/`, body, { headers });

            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetch();
    };

    // check is certificate is completed
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

                const body = {
                };

                // Make the HTTP request with the authorization header
                const response = await axios.post(`${baseUrl}/courses/course-progress/${courseId}/`, body, { headers });

                try {
                    const completed = response.data.data.completed;
                    setCourseCompleted(completed);
                }
                catch (error) {
                    setCourseCompleted(false);
                }

            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [baseUrl]);

    // check is course is completed
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
                const response = await axios.get(`${baseUrl}/courses/get-certificate/${courseId}/`, { headers });

                setCourseCertificate(response.data.data);

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
                        <Row key={content.course_content.id} className="mb-4">
                            <Button
                                // variant={visitedButtons.includes(content.course_content.id) ? "secondary" : "primary"} // Change variant based on visited status
                                className="me-3"
                                variant={content.completed ? "secondary" : "primary"}
                            >
                                <a
                                    href={`${jhubBaseUrl}/user/${firstName.toLowerCase()}/notebooks/${content.course_content.content}?token=${isTokenFetched ? jhubToken : ''}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    onClick={() => handleButtonClick(content.course_content.id)} // Call handleButtonClick function on button click
                                >
                                    {isTokenFetched ? content.course_content.title : "Lab is being set up..."}
                                </a>
                            </Button>
                        </Row>
                    ))}

                    {courseCompleted && (
                        <Row className="mb-4">
                            <Button variant="success" onClick={handleViewCertificate}>
                                View Certificate
                            </Button>
                        </Row>
                    )}

                    <Modal show={showCertificateModal} onHide={() => setShowCertificateModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Certificate</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img src={courseCertificate.certificate_image} alt="Certificate" style={{ maxWidth: '100%', maxHeight: '80vh', margin: 'auto', display: 'block' }} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowCertificateModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Row>
                        <Button variant="secondary" href="/">
                            Back to Courses
                        </Button>
                    </Row>
                </Col>


            </Container>
        </>
    );
};

export default CourseLandingScreen;
