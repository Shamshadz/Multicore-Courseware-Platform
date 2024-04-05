import { useState, useEffect } from 'react';
import { Container, Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../features/actions/authActions';

const SignUpScreen = () => {

    const dispatch = useDispatch();
    const { registered, loading } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        otp: '',
    });

    const { first_name, last_name, email, mobile, password, confirmPassword, otp } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();

        dispatch(register({ first_name, last_name, email, mobile, password, otp }));
    };

    const navigate = useNavigate();
    useEffect(() => {
        // Redirect if isAuthenticated is true
        if (registered) {
            navigate('/');
        }
    }, [registered, navigate]);


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
            <Form onSubmit={onSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="first_name"
                            value={first_name}
                            onChange={onChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="last_name"
                            value={last_name}
                            onChange={onChange}

                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            onChange={onChange}

                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMobile">
                        <Form.Label>Phone No.</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Enter Phone Number"
                            name="mobile"
                            value={mobile}
                            onChange={onChange}

                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={onChange}

                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}

                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridOTP">
                        <Form.Label>OTP</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Enter OTP"
                            name="otp"
                            value={otp}
                            onChange={onChange}

                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Send OTP
                    </Button>

                </Row>

                {loading ? (
                    <Button variant="primary" type="submit">
                        Loading...
                    </Button>
                ) : (
                    <Button variant="primary" type="submit">
                        SignUp
                    </Button>
                )}

            </Form>
        </Container>
    );
}

export default SignUpScreen;
