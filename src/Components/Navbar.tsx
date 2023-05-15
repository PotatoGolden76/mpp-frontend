import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function CustomNavbar() {
    return (

            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="#">Movie API</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/#/directors">Directors</Nav.Link>
                            <Nav.Link href="/#/actors">Actors</Nav.Link>
                            <Nav.Link href="/#/movies">Movies</Nav.Link>
                            <Nav.Link href="/#/roles">Roles</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

    );
}
