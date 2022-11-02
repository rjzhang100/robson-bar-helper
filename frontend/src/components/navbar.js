import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    return (
        <Navbar className = "navbar" bg="light" expand="lg" >
            <Container>
            <Navbar.Brand href="#home">Robson Inventory Baby :D</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Link href="/" activeClass = "active" spy = {true} smooth = {true} duration = {500}>Inventory</Nav.Link>
                <Nav.Link href="/add" activeClass = "active" spy = {true} smooth = {true} duration = {500}>Add</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;