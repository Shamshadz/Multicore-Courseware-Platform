import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThreeDots } from "react-loader-spinner";


const PaymentScreen = () => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const { courseId } = useParams();
    const { accessToken } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            if (!accessToken) {
                console.error('Access token not found in local storage');
                return;
            }

            setIsLoading(true); // Set loading state to true

            const headers = {
                'Authorization': `Bearer ${accessToken}`
            };

            const body = {
                "course": courseId
            };

            // Make the HTTP request with the authorization header and the request body
            const response = await axios.post(`${baseUrl}/courses/enrollments-create/`, body, { headers });

            console.log(response.data);

            // Wait for 2 seconds before navigating to the home page and reloading the window
            setTimeout(() => {
                setIsLoading(false); // Set loading state to false
                navigate(`/home`);
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error enrolling in course:', error);
            setIsLoading(false); // Set loading state to false
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <h2 className="text-center mb-4">Secure Payment Gateway</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="cardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter card number" />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId="expiryDate">
                                    <Form.Label>Expiry Date</Form.Label>
                                    <Form.Control type="text" placeholder="MM/YY" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="cvv">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control type="text" placeholder="CVV" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="cardHolder">
                            <Form.Label>Card Holder Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter card holder name" />
                        </Form.Group>
                        <br />
                        {/* Your form fields */}
                        {/* <Button variant="primary" type="submit" block disabled={isLoading}>
                            {isLoading ? 'Processing...' : 'Pay Now'}
                        </Button> */}
                        <Button
                            disabled={isLoading}
                            type="submit"
                            variant="primary"
                            className="mt-3 w-[50%] py-2 px-2"
                        >
                            {isLoading ? (
                                <div className=" flex w-full justify-center">
                                    <ThreeDots
                                        visible={true}
                                        height="21"
                                        width="50"
                                        color="#ffffff"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                </div>
                            ) : (
                                <div className="font-semibold">Pay Now</div>
                            )}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <h2 className="text-center mb-4">Secure Payment Gateway</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="cardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter card number" />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId="expiryDate">
                                    <Form.Label>Expiry Date</Form.Label>
                                    <Form.Control type="text" placeholder="MM/YY" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="cvv">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control type="text" placeholder="CVV" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="cardHolder">
                            <Form.Label>Card Holder Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter card holder name" />
                        </Form.Group>
                        <br />
                        <Button variant="primary" type="submit" block>
                            Pay Now
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentScreen;
