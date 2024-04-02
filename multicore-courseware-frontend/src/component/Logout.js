import { useEffect, useState } from "react"
import axios from "axios";

const Logout = () => {
    useEffect(() => {
        (async () => {
            try {
                await axios.post(
                    'http://localhost:8000/accounts/logout/',
                    {
                        refresh_token: localStorage.getItem('refresh_token')
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token');
                localStorage.clear();
                window.location.href = '/login';
            } catch (error) {
                console.log('Logout not working', error);
            }
        })();
    }, []);
    return (
        <div></div>
    );
};

export default Logout;