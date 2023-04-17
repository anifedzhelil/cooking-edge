import { useAuthContex } from '../../contexts/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from './logo.png';
import styles from './Header.module.css'
import { Link } from 'react-router-dom';

export const Header = () => {
  const { isAuthenticated, username } = useAuthContex();

  return (
    <>
      <Navbar className={styles.navbarflat} expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/catalog" ><img
            alt=""
            src={logo}
            width="100px"
            height="100px"
            className="d-inline-block align-top" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll"  >
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/catalog" >ٌРецепти</Nav.Link>
              {isAuthenticated && (
                <>
                  <Nav.Link as={Link} to="/create-recipe">Добави рецепта</Nav.Link>

                  <Nav.Link className={styles.usernameText}>{username}</Nav.Link>
                  <Nav.Link as={Link} to="/logout" >Изход</Nav.Link>

                </>)}
              {!isAuthenticated && (
                <>
                  <Nav.Link as={Link} to="/login"  >
                    Вход
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register" >
                    Регистрация
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

