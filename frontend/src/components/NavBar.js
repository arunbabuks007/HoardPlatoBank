import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { AiOutlineBank } from "react-icons/ai";

const NavBar = () => {
    return (
        <Navbar className="sticky-nav  navbar-dark border-bottom shadow mb-4 pb-4 pt-4 mb-3 border-2 border-light">
            <Container >
                <Navbar.Brand href="#home" className="d-flex align-items-center">
                    <AiOutlineBank size={50} style={{ marginRight: '8px' }} /> 
                    <p className="h2 pt-3">The Hoard Plato Bank</p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="justify-content-end h5" style={{ width: "100%" }}>
                        <Nav.Link href="/" className="link-hover px-4 rounded">Home</Nav.Link>
                        <Nav.Link href="/create-user"className="link-hover px-4 rounded ">Create-User</Nav.Link>
                        <Nav.Link href="/user-list"className="link-hover px-4 rounded ">User-List</Nav.Link>
                        {/* <Nav.Link href="/create-transaction">Transfer Money</Nav.Link> */}
                        <Nav.Link href="/transaction-history"className="link-hover px-4 rounded ">Transaction History</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
