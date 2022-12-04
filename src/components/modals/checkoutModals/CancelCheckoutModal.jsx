import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
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
    >
      <Modal.Title className="bg-danger text-white p-2 d-flex justify-content-between">
        <span className=""> تایید درخواست: </span>
        <span className=""> شماره سریال: </span>
      </Modal.Title>
      <Modal.Body>
        <p>نام و نام خانوادگی:</p>
        <p>واحد سازمانی:</p>
        <p>شرکت:</p>
        <p>علت ترک خدمت: </p>
        <p>تاریخ ترک خدمت:</p>
        <p>توضیحات:</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">تایید</Button>
        <Button
          variant="secondary"
          onClick={() => dispatch(setCancelCheckoutModal(false))}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelCheckoutModal;
