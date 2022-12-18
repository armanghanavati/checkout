import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment-jalaali";
import {
  addApllyModal,
  selectApplyModal,
} from "../../checkoutOfficialSlice/CheckoutOfficialSlice";

const ApplyModal = () => {
  const dispatch = useDispatch();
  const applyModal = useSelector(selectApplyModal);

  // const test = details.map((id) => {
  //   return id;
  // });

  // console.log(details.process.length);

  //   const postUsersHandler = (e) => {
  //     e.preventDefault();

  //     dispatch(postHandlerBtnAccept());

  //     dispatch(setAcceptCheckoutModal(false));
  //     dispatch(addComplateDescription(""));
  const cancelHandler = () => {
    dispatch(addApllyModal(false));
  };
  //   };
  const acceptHandler = () => {};

  return (
    <Modal
      show={applyModal}
      onHide={() => dispatch(addApllyModal(false))}
      backdrop="static"
      role="dialog"
      size="sm"
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header className="d-block bg-success text-white">
        <Modal.Title className="d-flex justify-content-between">
          <div>
            <span>تایید درخواست </span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        آیا میخواهید درخواست مورد نظر را برای مدیران ارسال کنید؟
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button name="cancelModal" variant="danger" onClick={cancelHandler}>
          خیر
        </Button>
        <Button name="acceptModal" variant="success" onClick={acceptHandler}>
          بله
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplyModal;
