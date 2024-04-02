import { useState, useEffect } from 'react';
import { Container, Button, Col, Form, Row } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpScreen = () => {

    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const baseJhubUrl = process.env.REACT_APP_API_BASE_JHUB_URL;
    const jhubAdminToken = process.env.REACT_APP_API_JHUB_ADMIN_TOKEN;

    const navigate = useNavigate();



    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');

    // Validation states
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [mobileValid, setMobileValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
    const [otpValid, setOtpValid] = useState(true);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform form validation here

        // If all fields are valid, submit the form
        if (firstNameValid && lastNameValid && emailValid && mobileValid && passwordValid && confirmPasswordValid && otpValid) {
            // Submit the form
            const formData = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                mobile: mobile,
                password: password,
                otp: otp,
                otp_token: "k6vj53uo8tb5ruh4b9t32o(bkcewvxuoj*xr(5-2unua_o(gee",
                country_code: "91"
            };

            try {
                const response = await axios.post(
                    `${baseUrl}/accounts/sign-up/`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }
                );

                // If the request is successful, redirect to the home page
                if (response.status === 201) {
                    const responseData = response.data; // Get the response data

                    console.log('Form submitted successfully!');

                    // Initialize the access & refresh token in localstorage.      
                    localStorage.clear();
                    localStorage.setItem('access_token', responseData.access_token);
                    localStorage.setItem('refresh_token', responseData.refresh_token);
                    axios.defaults.headers.common['Authorization'] =
                        `Bearer ${responseData.access}`;

                    window.location.href = '/home';
                    navigate('/');
                }
            } catch (error) {
                console.error('Error creating user:', error);
                // Handle error (e.g., display error message)
            }

        } else {
            console.log('Form validation failed. Please check your inputs.');
        }
    };


    // Function to validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to validate mobile number format
    const validateMobile = (mobile) => {
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(mobile);
    };

    // Function to validate password strength
    const validatePassword = (password) => {
        // Implement your password validation logic here
        return password.length >= 8;
    };

    // Function to validate OTP format
    const validateOtp = (otp) => {
        const otpRegex = /^[0-9]{4}$/;
        return otpRegex.test(otp);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                setFirstNameValid(true); // Reset validation on change
                            }}
                            isValid={firstNameValid}
                            isInvalid={!firstNameValid}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                                setLastNameValid(true); // Reset validation on change
                            }}
                            isValid={lastNameValid}
                            isInvalid={!lastNameValid}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailValid(true); // Reset validation on change
                            }}
                            isValid={emailValid}
                            isInvalid={!emailValid}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMobile">
                        <Form.Label>Phone No.</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Enter Phone Number"
                            value={mobile}
                            onChange={(e) => {
                                setMobile(e.target.value);
                                setMobileValid(true); // Reset validation on change
                            }}
                            isValid={mobileValid}
                            isInvalid={!mobileValid}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordValid(true); // Reset validation on change
                            }}
                            isValid={passwordValid}
                            isInvalid={!passwordValid}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setConfirmPasswordValid(true); // Reset validation on change
                            }}
                            isValid={confirmPasswordValid}
                            isInvalid={!confirmPasswordValid}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridOTP">
                        <Form.Label>OTP</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value);
                                setOtpValid(true); // Reset validation on change
                            }}
                            isValid={otpValid}
                            isInvalid={!otpValid}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Send OTP
                    </Button>

                </Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </Container>
    );
}

export default SignUpScreen;
