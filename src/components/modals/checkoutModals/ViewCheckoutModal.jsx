import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ViewCheckoutModal = ({ showModel, setShowModel }) => {
  const [show, setShow] = useState(false);
  const showModelHandler = () => {
    setShow(true);
  };

  return (
    <Modal
      show={showModel}
      onHide={() => setShowModel(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        I will not close if you click outside me. Don't even try to press escape
        key.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModel(false)}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewCheckoutModal;
