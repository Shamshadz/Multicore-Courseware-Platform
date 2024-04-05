import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/actions/authActions';
import { useNavigate } from 'react-router-dom'; // Import useHistory for programmatic navigation

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useHistory

    useEffect(() => {
        // Dispatch logout action when the component mounts
        dispatch(logout());

        // Cleanup function to be executed when the component unmounts
        // Navigate to the login page programmatically
        window.location.href = '/login'
    }, [dispatch, navigate]); // Include dispatch and history in the dependency array

    // You can use React Fragment instead of an empty div
    return <></>;
};

export default Logout;
