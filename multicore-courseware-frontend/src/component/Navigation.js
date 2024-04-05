import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Navigation() {

    const { isAuthenticated } = useSelector(
        state => state.auth
    );



    return (
        <Navbar bg="primary" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand href="/">Multicore-courseware</Navbar.Brand>
                <Nav className="me-auto">
                    {isAuthenticated ? (
                        <>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/signup">Signup</Nav.Link>
                        </>
                    )}
                </Nav>


            </Container>
        </Navbar>
    );
};

export default Navigation;