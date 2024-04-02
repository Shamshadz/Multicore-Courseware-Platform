import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Courses from '../component/Courses.jsx';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [message, setMessage] = useState('Shamshad');
    const [buttonClicked, setButtonClicked] = useState(false);

    const navigate = useNavigate();

    const signUpPage = () => {
        navigate('/signup');
    }

    useEffect(() => {
        if (buttonClicked) {
            const notebookUrl = 'http://192.168.56.3/user/admin/notebooks/OPENMP.ipynb?token=a59b90543f0a4546b083feef028883ed';
            window.open(notebookUrl, '_blank');
        }
    }, [buttonClicked]);

    return (
        <Container className="mt-4">
            <div className="form-signin mt-5 text-center">
                <h3>Hi {message}</h3>
            </div>

            <Button variant="primary" onClick={() => setButtonClicked(true)}>
                LOGIN JHUB
            </Button>

            <Button variant="primary" onClick={signUpPage}>
                Signup
            </Button>

            <Container>
                <Courses />
            </Container>
        </Container>
    );
};

export default Home;
