import axios from "axios";
import { useState } from "react";
import { Form, Button, Container } from 'react-bootstrap';


// Define the Login function.

const Login = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    // Create the submit method.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            mobile: mobile,
            password: password
        };

        try {
            const { data } = await axios.post(
                'http://localhost:8000/api/token/',
                user,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // withCredentials: true
                }
            );

            // Initialize the access & refresh token in localstorage.      
            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            axios.defaults.headers.common['Authorization'] =
                `Bearer ${data['access']}`;
            window.location.href = '/';
        } catch (error) {
            console.error('Error while logging in:', error);
            // Handle error, maybe show a message to the user
        }
    };

    return (
        <Container>
            <div className="Auth-form-container">
                <Form className="Auth-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <Form.Group className="mt-3">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter mobile"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="d-grid gap-2 mt-3">
                            <Button type="submit" variant="primary">Submit</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default Login;