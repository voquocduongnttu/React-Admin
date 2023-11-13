import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from "../assets/images/logo192.png"
import { useLocation, NavLink } from 'react-router-dom';
const Header = (props) =>{

    const location = useLocation();
    return(
        <>
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="#home">
                    <img
                        src={logoApp}
                        width='30'
                        height='30'
                        className='d-inline-block aline-top'
                        alt='React Bootstrap logo'
                    />     
                    <span> Trang Quản Trị APP</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <NavLink to='/' className="nav-link">Home</NavLink>
                <NavLink to='/users' className="nav-link">Manage Users</NavLink>
                </Nav>
                <Nav>
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                    <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    )
}

export default Header;