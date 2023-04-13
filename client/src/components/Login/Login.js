import {Button, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuthContex } from "../../contexts/AuthContext";
import {useForm} from '../../hooks/useForm';
import styles from './Login.module.css';


const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
};

export const Login = () => {
    const { onLoginSubmit } = useAuthContex();
    const { values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    }, onLoginSubmit);

    return (
        <>
            <Form className={styles.loginForm} method="post" onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email адрес</Form.Label>
                    <Form.Control 
                        type="email" 
                        id="email" 
                        name={LoginFormKeys.Email}
                        placeholder="Въведи email" 
                        value={values[LoginFormKeys.Email]}
                        onChange={changeHandler}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Парола</Form.Label>
                    <Form.Control 
                        type="password" 
                        id="password"
                        placeholder="Парола" 
                        name={LoginFormKeys.Password}
                        value={values[LoginFormKeys.Password]}
                        onChange={changeHandler}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Form.Group className={styles.loginButton}>
                    <Button variant="primary" type="submit" style={{ width: "80%" }} >
                        Submit
                    </Button>
                </Form.Group>
                <Form.Group style={{ textAlign: "right" }}>
                    <span>Нов Потребител </span><Link to="/register" >Регистрация се</Link>

                </Form.Group>
            </Form>
        </>
    );
}
