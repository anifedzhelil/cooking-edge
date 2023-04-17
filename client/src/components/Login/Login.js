import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuthContex } from "../../contexts/AuthContext";
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';

import styles from './Login.module.css';

const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
};

export const Login = () => {
    const { onLoginSubmit, errorMessage } = useAuthContex();
    const [validated, setValidated] = useState(false);

    const { values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    }, onLoginSubmit);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            onSubmit(event);
        }
        setValidated(true);
    };

    return (
        <>
            <Form className={styles.loginForm} method="post" onSubmit={handleSubmit} noValidate validated={validated}>
                <Form.Group className="mb-3">
                    <Form.Label>Email адрес</Form.Label>
                    <Form.Control
                        type="email"
                        required
                        id="email"
                        name={LoginFormKeys.Email}
                        placeholder="Въведи email"
                        value={values[LoginFormKeys.Email]}
                        onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Моля въведете имeйл.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Парола</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        required
                        placeholder="Парола"
                        name={LoginFormKeys.Password}
                        value={values[LoginFormKeys.Password]}
                        onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Моля въведете парола.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={styles.loginButton}>
                    <Button variant="primary" type="submit" style={{ width: "80%" }} >
                        Вход
                    </Button>
                </Form.Group>
                <Form.Group>
                    <span style={{ color: "red" }}>{errorMessage}</span>
                </Form.Group>
                <Form.Group style={{ textAlign: "right" }}>
                    <Link to="/register" >Регистрирай се</Link>
                </Form.Group>
            </Form>
        </>
    );
}
