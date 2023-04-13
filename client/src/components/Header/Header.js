import { useAuthContex } from '../../contexts/AuthContext';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from './logo.png';
import styles from './Header.module.css'
import { Link } from 'react-router-dom';
import { useRecipeContext } from '../../contexts/RecipeContext';
import { useForm } from '../../hooks/useForm';

export const Header = () => {
  const { isAuthenticated, username } = useAuthContex();
  const {onSearchSubmit} = useRecipeContext();
  const { values, onSubmit, changeHandler} = useForm({search: ''}, onSearchSubmit);

  return (
    <>
      <Navbar className={styles.navbarflat} expand="lg">
        <Container fluid>
          <Navbar.Brand href="#"><img
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
                  <Nav.Link as={Link} to="/my-recipes">Моите рецепти</Nav.Link>

                  <Nav.Link className={styles.usernameText}>{username}</Nav.Link>
                  <Nav.Link as={Link} to="/logout" >Изход</Nav.Link>

                </>)}
              {!isAuthenticated && (
                <>
                  <Nav.Link as={Link} to="/login" >
                    Вход
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register" >
                    Регистрация
                  </Nav.Link>
                </>
              )}
            </Nav>

            <Form className="d-flex">
              <Form.Control
                type="search"
                name="search"
                value={values.search}
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={changeHandler}
              />
              <Button className={styles.buttonSearch} onSubmit={onSubmit}>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

