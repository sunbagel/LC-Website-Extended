import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import { NavLink } from 'react-router-dom';


const AppNavBar = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" data-bs-theme="dark">
                <Container className="d-flex flex-row">

                    <Nav>
                        <Nav.Link  as={NavLink} to="search-page" eventKey="1">Search for Part</Nav.Link>
                        <Nav.Link  as={NavLink} to="add-parts" eventKey="2">Add a Part</Nav.Link>
                    </Nav>

                </Container>
            </Navbar>
        </div>
    )
}

export default AppNavBar;