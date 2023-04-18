import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useForm } from "../../../hooks/useForm";
import { useState, useRef } from 'react';

export const AddComment = ({ onCommentSubmit }) => {

    const [validated, setValidated] = useState(false);
    const formRef = useRef(null);

    const { values, changeHandler, onSubmit } = useForm({
        comment: '',
    }, onCommentSubmit);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        
        else {
            onSubmit(event);
             values.comment = '  ';
             form.noValidate = true;
        }
        setValidated(true);
    };
    return (<div style={{padding: "50px"}}>
        <label>Добави коментар</label>


        <Form onSubmit={handleSubmit} noValidate validated={validated} ref={formRef}>
            <Form.Control
                required

                placeholder="Коментар..."
                id="directions"
                as="textarea"
                rows={6}
                value={values.comment}
                name="comment"
                onChange={changeHandler} />
            <Form.Control.Feedback type="invalid">
                Моля въведете коментар.
            </Form.Control.Feedback>
            <div style={{padding:"10px"}}>
            <Button variant="primary" type="submit" style={{ marginRight: "10px", }}>
                Запази
            </Button>
            </div>
        </Form>
    </div>);
}