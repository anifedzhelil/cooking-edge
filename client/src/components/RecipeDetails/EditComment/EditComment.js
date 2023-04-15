import { useState, useEffect } from "react";

import * as  commentServise from "../../../services/commentService";

import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "../../../hooks/useForm";

export const EditComment = ({
  commentId,
  show,
  onHandleClose,
  onEditSubmit }) => {

  const [validated, setValidated] = useState(false);

  const { values, changeHandler, onSubmit, changeValues } = useForm({
    _id: commentId,
    comment: '',
    createdDate: new Date(),
  }, onEditSubmit);

  useEffect(() => {
    commentServise.getOne(commentId)
      .then(result => {
        changeValues(result);
      });
  }, [commentId]);

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
    <Modal show={show} onHide={onHandleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Редактиране</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}  noValidate validated={validated}>
          <Form.Control
            required
            placeholder="Коментар..."
            id="ْcomment"
            as="textarea"
            rows={6}
            value={values.comment}
            name="comment"
            onChange={changeHandler} />
          <Form.Control.Feedback type="invalid">
            Моля въведете коментар.
          </Form.Control.Feedback>
          <div style={{ padding: "10px" }}>
            <Button variant="primary" type="submit" style={{ marginRight: "10px", }}>
              Запази
            </Button>
            <Button variant="secondary" onClick={onHandleClose}>
              Затвори
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>);
}