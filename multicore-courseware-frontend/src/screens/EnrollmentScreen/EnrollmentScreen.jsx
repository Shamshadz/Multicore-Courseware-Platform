import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const EnrollmentScreen = () => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [course, setCourse] = useState([]);
  const { courseId } = useParams();

  const { accessToken } = useSelector(
    state => state.auth
  );

  // Function to handle course enrollment
  const navigate = useNavigate();
  const handleEnroll = () => {
    // Redirect to the enrollment page for the selected course
    navigate(`/payment/${courseId}`); // Pass courseId to the enrollment page
  };

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

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1>Welcome to our Course Platform</h1>
          <p>Explore a wide range of courses and enhance your skills.</p>
          <p>{course.description}</p>
          <Button variant="primary" onClick={handleEnroll} block>Enroll</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EnrollmentScreen;
