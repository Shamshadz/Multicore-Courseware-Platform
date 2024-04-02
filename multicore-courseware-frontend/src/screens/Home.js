// Import the react JS packages
import { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Courses from '../component/Courses.jsx';

// Define the Home component.
const Home = () => {
    const [message, setMessage] = useState('');


    // Function to open the Jupyter notebook URL
    const openNotebookUrl = () => {
        const notebookUrl = 'http://192.168.56.3/user/admin/notebooks/OPENMP.ipynb?token=a59b90543f0a4546b083feef028883ed';
        window.open(notebookUrl, '_blank');
    }

    // Call the function when needed
    openNotebookUrl();


    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            window.location.href = '/login'
        }
        else {
            (async () => {
                try {
                    const { data } = await axios.get(
                        'http://localhost:8000/home/', {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    );
                    setMessage(data.message);
                } catch (e) {
                    console.log('not auth')
                }
            })()
        };
    }, []);

    return (
        <Container className="mt-4">
            <div className="form-signin mt-5 text-center">
                <h3>Hi {message}</h3>
            </div>

            <Button variant="primary" onClick={openNotebookUrl}>
                LOGIN JHUB
            </Button>

            <Container>
                <Courses />
            </Container>
        </Container>
    );
};

export default Home;
