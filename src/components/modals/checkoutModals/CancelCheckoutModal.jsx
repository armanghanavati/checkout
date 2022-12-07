import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCancelCheckoutModal,
  setCancelCheckoutModal,
} from "../../checkoutOfficialSlice/TableCheckoutSlice";

const CancelCheckoutModal = () => {
  const dispatch = useDispatch();
  const cancelCheckoutModal = useSelector(selectCancelCheckoutModal);

  return (
    <Modal
      show={cancelCheckoutModal}
      onHide={() => dispatch(setCancelCheckoutModal(false))}
      backdrop="static"
      role="dialog"
      dialogClassName="cont_modal"
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Title className="modal-header bg-danger text-white p-2 d-flex justify-content-between">
        <p className="modal-title"> شماره سریال: </p>
        <p className="modal-title"> ابطال درخواست </p>
        <p className="modal-title"> تاریخ درخواست: </p>
      </Modal.Title>
      <Modal.Body>
        <p>نام و نام خانوادگی:</p>
        <p>واحد سازمانی:</p>
        <p>شرکت:</p>
        <p>علت ترک خدمت: </p>
        <p>تاریخ ترک خدمت:</p>
        <p>توضیحات:</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <div className="d-flex">
          <Col xl="12">
            <Form.Control
              placeholder="توضیحات تکمیل کننده درخواست"
              type="text"
              name="description"
            />
          </Col>
          <Button className="ms-2 col-5" variant="danger">
            ابطال درخواست
          </Button>
        </div>
        <div>
          <Button
            className="justify-content-end"
            variant="secondary"
            onClick={() => dispatch(setCancelCheckoutModal(false))}
          >
            بستن
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelCheckoutModal;
