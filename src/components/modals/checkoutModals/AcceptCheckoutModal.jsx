import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAcceptCheckoutModal,
  setAcceptCheckoutModal,
} from "../../checkoutOfficialSlice/TableCheckoutSlice";

const AcceptCheckoutModal = () => {
  const dispatch = useDispatch();
  const AcceptCheckoutModal = useSelector(selectAcceptCheckoutModal);
  console.log(AcceptCheckoutModal);

  return (
    <Modal
      show={AcceptCheckoutModal}
      onHide={() => dispatch(setAcceptCheckoutModal(false))}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        I will not close if you click outside me. Don't even try to press escape
        key.
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => dispatch(setAcceptCheckoutModal(false))}
        >
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AcceptCheckoutModal;
