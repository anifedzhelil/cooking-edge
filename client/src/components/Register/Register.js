import { Form, Button } from 'react-bootstrap';
import styles from './Register.module.css';
import { useForm } from '../../hooks/useForm';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const RegisterFormKeys = {
    FirstName: 'firstname',
    LastName: 'lastname',
    Username: 'username',
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirmPassword'
};

export const Register = () => {
    const { onRegisterSubmit, errorMessage } = useContext(AuthContext);
    const [validated, setValidated] = useState(false);

    const { values, changeHandler, onSubmit } = useForm({
        [RegisterFormKeys.FirstName]: '',
        [RegisterFormKeys.LastName]: '',
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Username]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: '',
    }, onRegisterSubmit);

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
            <Form className={styles.userForm} method="post" onSubmit={handleSubmit} noValidate validated={validated}>
                <Form.Group className="mb-3" >
                    <Form.Label>Име</Form.Label>
                    <Form.Control
                        type="text"
                        id="firstname"
                        required
                        name={RegisterFormKeys.FirstName}
                        value={values[RegisterFormKeys.FirstName]}
                        placeholder="Име"
                        onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Моля въведете име.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control
                        type="text"
                        id="lastname"
                        required
                        name={RegisterFormKeys.LastName}
                        value={values[RegisterFormKeys.LastName]}
                        placeholder="Фамилия"
                        onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Моля въведете фамилия.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Потребителско име</Form.Label>
                    <Form.Control
                        type="text"
                        id="username"
                        required
                        name={RegisterFormKeys.Username}
                        value={values[RegisterFormKeys.Username]}
                        placeholder="Потребителско име"
                        onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Моля въведете потребителско име.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>E-mail адрес</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        required
                        name={RegisterFormKeys.Email}
                        value={values[RegisterFormKeys.Email]}
                        placeholder="Email"
                        onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Моля въведете имeйл.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Парола</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        required
                        name={RegisterFormKeys.Password}
                        value={values[RegisterFormKeys.Password]}
                        placeholder="Password"
                        onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Моля въведете парола.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Повторете паролата</Form.Label>
                    <Form.Control
                        type="password"
                        id="confirmtPassword"
                        required
                        name={RegisterFormKeys.ConfirmPassword}
                        value={values[RegisterFormKeys.ConfirmPassword]}
                        placeholder="Password"
                        onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Моля въведете повторно парола.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <span style={{ color: "red" }}>{errorMessage}</span>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Запази
                </Button>
            </Form>
        </>
    )
}