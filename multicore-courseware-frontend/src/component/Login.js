import { Form, Button, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/actions/authActions';
import { resetRegistered } from "../features/slices/authSlices";
import { useNavigate } from "react-router-dom";

// Define the Login function.

const Login = () => {

    const dispatch = useDispatch();

    const { isAuthenticated, user, loading, registered } = useSelector(
        state => state.auth
    );


    const [formData, setFormData] = useState({
        mobile: '',
        password: '',
    });

    useEffect(() => {
        if (registered) dispatch(resetRegistered());
    }, [registered]);

    const { mobile, password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();

        dispatch(login({ mobile, password }));
    };

    const navigate = useNavigate();
    useEffect(() => {
        // Redirect if isAuthenticated is true
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);


    return (
        <Container>
            <div className="Auth-form-container">
                <Form className="Auth-form" onSubmit={onSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <Form.Group className="mt-3">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter mobile"
                                name="mobile"
                                value={mobile}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <div className="d-grid gap-2 mt-3">
                            {loading ? (
                                <Button type="submit" variant="primary">Loading...</Button>
                            ) : (
                                <Button type="submit" variant="primary">Login</Button>
                            )}
                        </div>

                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default Login;