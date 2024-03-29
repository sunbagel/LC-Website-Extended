
import {LinkContainer} from 'react-router-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import './NavBar.css'



import { Container, Nav, Navbar } from 'react-bootstrap';
import LogoutButton from "@/components/auth/LogoutButton";
import useAuth from "@/hooks/useAuth";


const NavBar = () => {

    const { auth } = useAuth();

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
                        
                        <Nav.Link as={NavLink} to="/app-home" eventKey="3">Inventory App</Nav.Link>

                        {/* <Nav.Link eventKey="3">
                            Get a Quote
                        </Nav.Link> */}
                        <Link to="/contact_us" >
                            <button className="default-btn" id="quote-button">
                                Get a Quote
                            </button>
                        </Link>

                        {auth?.username && <LogoutButton/>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    )
}

export default NavBar
