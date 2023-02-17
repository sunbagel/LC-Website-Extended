import { useState, useEffect} from "react"
import {LinkContainer} from 'react-router-bootstrap'
import { Link, NavLink } from 'react-router-dom'
// import './NavBar.css'
import './NavBarV2.css'

// import Button from './Button'



import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';


const NavBar = () => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        }else{
            setButton(true);
        }
    };

    useEffect(()=>{
        showButton();
    });

    const [expanded, setExpanded] = useState(false);

    const handleExpand = () =>{
        setExpanded(!expanded);
    }

    

    window.addEventListener('resize', showButton);

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
                            <Button className="mx-2" id="quote-button">Get a Quote</Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        
        
        {/* <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
            <div className="container">
            <Link to="/" className="navbar-brand mb-0 h1" onClick={closeMobileMenu}> 
                <img className="d-inline-block align-to"
                    src="/images/LC_Logo_Transparent.png" alt="LC Logo"
                    width="50" height="50"/>
                LC
            </Link>

            <button 
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="$navbarNav"
                className="navbar-toggler"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                </ul>

            </div>

            </div>
        </nav> */}
        {/* <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">
                <img
                alt="LC Logo"
                src="/images/LC_Logo_Transparent.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                LC Industrial
            </Navbar.Brand>
            </Container>
        </Navbar> */}

        {/* <nav className="navbar">
            <div className="navbar-container" >
                
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}> 
                
                    LC
                    <img src="/images/LC_Logo_Transparent.png" alt="LC Logo"></img>

                    <i className="fab fa-typo3"></i>
                </Link>
                
                
                <div className='menu-icon' onClick={handleClick}>
                    <i className = {click ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                            Services
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                            Products
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                            Sign Up
                        </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
            </div>
        </nav> */}
    </>
    )
}

export default NavBar
