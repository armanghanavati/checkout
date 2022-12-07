import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAcceptCheckoutModal,
  setAcceptCheckoutModal,
} from "../../checkoutOfficialSlice/TableCheckoutSlice";
import "./Styles.css";

const AcceptCheckoutModal = () => {
  const dispatch = useDispatch();
  const AcceptCheckoutModal = useSelector(selectAcceptCheckoutModal);

  return (
    <Modal
      show={AcceptCheckoutModal}
      onHide={() => dispatch(setAcceptCheckoutModal(false))}
      backdrop="static"
      role="dialog"
      dialogClassName="cont_modal"
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Title className="modal-header bg-success text-white p-2 d-flex justify-content-between">
        <p className="modal-title"> شماره سریال: </p>
        <p className="modal-title"> تایید درخواست </p>
        <p className="modal-title"> تاریخ درخواست: </p>
      </Modal.Title>
      <Modal.Body className="show-grid">
        <Row>
          <Col xs={12} md={8} xl={12}>
            <p className="font-weight-bold">
              نام و نام خانوادگی: <span> روزبه قنواتیان </span>
            </p>
          </Col>
          <Col xs={6} md={4}>
            <p className="font-weight-bold">واحد سازمانی:</p>
          </Col>
          <p className="font-weight-bold">شرکت:</p>
          <p className="font-weight-bold">علت ترک خدمت: </p>
          <p className="font-weight-bold">تاریخ ترک خدمت:</p>
          <p className="font-weight-bold">توضیحات:</p>
        </Row>
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
          <Button className="col-5 ms-2" variant="success">
            تایید درخواست
          </Button>
        </div>

        <Button
          className="justify-content-end"
          variant="secondary"
          onClick={() => dispatch(setAcceptCheckoutModal(false))}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AcceptCheckoutModal;
