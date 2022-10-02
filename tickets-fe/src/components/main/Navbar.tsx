import { ReactElement } from 'react';
import { Container, Nav, Navbar as NavBarBs } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';


const signoutUrl: string = `${process.env.REACT_APP_AUTH_URL}/signout`;



const NavBar = (): ReactElement => {
    const { currentUser, isLogged, setIsLogged } = useAuthContext()
    const navigate = useNavigate()

    console.log("currentUser", currentUser)

    const handleSignout = async () => {
        await fetch(signoutUrl, {
            method: "POST"
        })
        setIsLogged(false)
        navigate('/login')
    }

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

                {!isLogged ?
                    <>
                        <Nav.Link to="/login" as={NavLink} className='btn btn-small btn-outline-info me-1 text-white'> Login</Nav.Link>
                        <Nav.Link to="/signup" as={NavLink} className='btn btn-small btn-outline-info me-2 text-white'>Sign up</Nav.Link>
                    </>
                    :
                    <>
                        {/* <span className='text-info m-2'> welcome {currentUser?.fname} </span> */}
                        <button className='btn btn-small btn-outline-info me-2 text-white' onClick={handleSignout}> Sign out</button>
                    </>
                }
            </NavBarBs.Collapse>

        </NavBarBs>
    )

}

export default NavBar;