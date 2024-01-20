import { useState, useEffect} from "react"
import {LinkContainer} from 'react-router-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import './NavBarV2.css'



import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';


const NavBar = () => {

    return (
    <>

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container className="d-flex flex-row">
                <LinkContainer to="/">
                    <Navbar.Brand className="navbar-brand"> 
                        <img className="d-inline-block align-to"
                        src="/images/LC_Logo_Transparent.png" alt="LC Logo"
                        width="80" height="80"/>
                        {' '}
                        LC Industrial
                        
                    </Navbar.Brand>
                    
                </LinkContainer>
                {/* <Navbar.Text className="logo-text">
                    LC Industrial
                </Navbar.Text> */}

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">

                        <Nav.Link  as={NavLink} to="/" eventKey="1">Home</Nav.Link>
                        
                        <Nav.Link  as={NavLink} to="/contact_us" eventKey="2">Contact Us</Nav.Link>
                        

                        {/* <Nav.Link eventKey="3">
                            Get a Quote
                        </Nav.Link> */}
                        <Link to="/contact_us" >
                            <Button id="quote-button">Get a Quote</Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    )
}

export default NavBar
