import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const PaymentScreen = () => {
    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <h2 className="text-center mb-4">Secure Payment Gateway</h2>
                    <Form>
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
