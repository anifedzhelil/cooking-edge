import { Form, Button } from 'react-bootstrap';
import styles from './Register.module.css';
import { useForm } from '../../hooks/useForm';
import { useContext } from 'react';
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
    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        [RegisterFormKeys.FirstName]: '',
        [RegisterFormKeys.LastName]: '',
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Username]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: '',
    }, onRegisterSubmit);
    return (
        <>
            <Form className={styles.userForm} method="post" onSubmit={onSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>Име</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="firstname"
                        name={RegisterFormKeys.FirstName}
                        value={values[RegisterFormKeys.FirstName]}
                         placeholder="Име"
                         onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control 
                        type="text"
                        id="lastname"
                        name={RegisterFormKeys.LastName}
                        value={values[RegisterFormKeys.LastName]}
                         placeholder="Фамилия" 
                         onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Потребителско име</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="username"
                        name={RegisterFormKeys.Username}
                        value={values[RegisterFormKeys.Username]}
                        placeholder="Потребителско име" 
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>E-mail адрес</Form.Label>
                    <Form.Control 
                        type="email" 
                        id="email"
                        name={RegisterFormKeys.Email}
                        value={values[RegisterFormKeys.Email]}
                        placeholder="Email" 
                        onChange={changeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Парола</Form.Label>
                    <Form.Control 
                        type="password" 
                        id="password"
                        name={RegisterFormKeys.Password}
                        value={values[RegisterFormKeys.Password]}
                        placeholder="Password"
                        onChange={changeHandler}  />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Повторете патолата</Form.Label>
                    <Form.Control 
                        type="password" 
                        id="confirmtPassword"
                        name={RegisterFormKeys.ConfirmPassword}
                        value={values[RegisterFormKeys.ConfirmPassword]}
                        placeholder="Password" 
                        onChange={changeHandler} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Запази
                </Button>
            </Form>
        </>
    )
}