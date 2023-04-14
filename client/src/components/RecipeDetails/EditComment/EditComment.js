import { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "../../../hooks/useForm";
import { useForm } from "../../../hooks/useForm";
import { useForm } from "../../../hooks/useForm";
import { useForm } from "../../../hooks/useForm";
import { useForm } from "../../../hooks/useForm";
 
export const EditComment = ({ 
  _id,
  comment,
  handleClose,
  show,
  onEditSubmit }) => {

  const [validated, setValidated] = useState(false);
  const { values, changeHandler, onSubmit } = useForm({
    commentId: _id,
    comment: comment,
}, onEditSubmit);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit} noValidate validated={validated}>
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
          <div style={{ padding: "10px" }}>
            <Button variant="primary" type="submit" style={{ marginRight: "10px", }}>
              Запази
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>);
}