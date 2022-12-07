import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectEditCheckoutModal,
  setEditCheckoutModal,
} from "../../checkoutOfficialSlice/TableCheckoutSlice";

const EditCheckoutModal = () => {
  const dispatch = useDispatch();
  const editCheckoutModal = useSelector(selectEditCheckoutModal);

  return (
    <Modal
      show={editCheckoutModal}
      onHide={() => dispatch(setEditCheckoutModal(false))}
      backdrop="static"
      role="dialog"
      dialogClassName="cont_modal"
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Title className="modal-header bg-primary text-white p-2 d-flex justify-content-between">
        <p className="modal-title"> شماره سریال: </p>
        <p className="modal-title"> ویرایش درخواست </p>
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
          <Button className="ms-2 " variant="primary">
            ویرایش درخواست
          </Button>
        </div>
        <div>
          <Button
            className="justify-content-end"
            variant="secondary"
            onClick={() => dispatch(setEditCheckoutModal(false))}
          >
            بستن
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCheckoutModal;
