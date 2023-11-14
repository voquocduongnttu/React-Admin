import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from "../assets/images/logo192.png"
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Header = (props) =>{
    const navigate = useNavigate();
    const hanldeLogout = () =>{
        localStorage.removeItem("token");
        navigate("/");
        toast.success("Log out success")
    }
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
                    <NavLink to='/login' className="dropdown-item">Login</NavLink>
                    <NavDropdown.Item onClick={() => hanldeLogout()}>Logout</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    )
}

export default Header;