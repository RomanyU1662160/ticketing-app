import { ReactElement } from 'react';
import { Container, Nav, Navbar as NavBarBs } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const NavBar = (): ReactElement => {
    return (
        <NavBarBs bg='dark' className='p-3'>

            <NavBarBs.Brand href="#home" className='text-info'>Ticketing</NavBarBs.Brand>
            <NavBarBs.Toggle aria-controls="basic-navbar-nav" />
            <NavBarBs.Collapse>
                <Nav>
                    <Nav.Link to={"/home"} as={NavLink} className='text-light'>Home</Nav.Link>
                    <Nav.Link to={"/tickets"} as={NavLink} className='text-light'>Tickets</Nav.Link>
                </Nav>
            </NavBarBs.Collapse>
            <NavBarBs.Collapse className='justify-content-end'>
                <Nav.Link to="/login" as={NavLink} className='btn btn-small btn-outline-info me-1 text-white'> Login</Nav.Link>
                <Nav.Link to="/signup" as={NavLink} className='btn btn-small btn-outline-info me-2 text-white'>Sign up</Nav.Link>
            </NavBarBs.Collapse>

        </NavBarBs>
    )

}

export default NavBar;