import { Modal, Button } from "react-bootstrap";

export const DeleteConfirmation = ({ onDeleteModalClose, message, showDelete, onDeleteSubmit}) => {
    return (
        <Modal show={showDelete} onHide={onDeleteModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Потвърждение за изтриване</Modal.Title>
            </Modal.Header>
            <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
            <Modal.Footer>
                <Button variant="default" onClick={onDeleteModalClose}>
                    Затвори
                </Button>
                <Button variant="danger" onClick={onDeleteSubmit}>
                    Изтрий
                </Button>
            </Modal.Footer>
        </Modal>
    )
}