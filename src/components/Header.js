import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from "../assets/images/logo192.png"
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useState,useEffect} from 'react';
import { UserContext } from '../context/UserContext';
const Header = (props) =>{

    const { logout, user } = useContext(UserContext)
    
    

    const navigate = useNavigate();
    const hanldeLogout = () =>{
        logout();
        localStorage.removeItem("token");
        navigate("/");
        toast.success("Log out success")
    }
    return(
        <>
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="/">
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
            { (user && user.auth || window.location.pathname === '/') && 
                <>
                    <Nav className="me-auto">
                        <NavLink to='/' className="nav-link">Home</NavLink>
                         <NavLink NavLink to='/users' className="nav-link">Manage Users</NavLink>
                    </Nav>
                    <Nav>
                        {user && user.email && <span className='nav-link'>Welcome {user.email} </span>}

                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                             {user && user.auth === true
                   
                                ?<NavDropdown.Item onClick={() => hanldeLogout()}>Logout</NavDropdown.Item>
                                :<NavLink to='/login' className="dropdown-item">Login</NavLink>
                            }
                        </NavDropdown>
                    </Nav>
                </>
                }
            </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    )
}

export default Header;