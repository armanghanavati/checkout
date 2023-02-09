import React, { useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RsetTicket, selectTicket } from "../../slices/mainSlices";

const TicketModal = () => {
    const dispatch = useDispatch();
    const ticket = useSelector(selectTicket)

    return (
        <Modal
            centered
            show={ticket}
            onHide={() => dispatch(RsetTicket(false))}
            backdrop="static"
            role="dialog"
            dialogClassName="modal-90w"
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header className="d-block bg-primary text-white">
                <Modal.Title className="d-flex justify-content-between">
                    <div> ارتباط با پشتیبانی </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Row>
                    <Col xs={12} md={8} xl={12}>
                        <p className="mb-3 me-1">
                            <span className="fw-bold">نام و نام خانوادگی: </span>
                            <span>
                                TicketModal 3
                            </span>
                        </p>
                    </Col>
                    <p className="mb-3 me-1">
                        <span className="fw-bold">شرکت: </span>
                        <span> TicketModal 4</span>
                    </p>
                    <Col xs={6} md={4}>
                        <p className="mb-3 me-1">
                            <span className="fw-bold"> آدرس الکترونیکی: </span>
                            <span> TicketModal 5</span>
                        </p>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Col xl="12">
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="متن خود را وارد کنید"
                        type="textarea"
                        name="description"
                    />
                </Col>
                <Col xl="6" >
                    <Button
                        onClick={() => {

                        }}
                        className="align-items-end col-5 ms-2"
                        variant="primary"
                    >
                        ارسال
                    </Button>
                </Col>

                <Button
                    className="justify-content-end"
                    variant="secondary"
                    onClick={() => dispatch(RsetTicket(false))}
                >
                    بستن
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TicketModal;
