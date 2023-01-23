import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetDescriptions,
  RsetToDate,
  RsetShowSendManagerModal,
  RsetOverTimeReasonValue,
  RsetShowOverTimeApplyModal,
  RsetFromDate,
  handleUsersOvertime,
  selectModalSendManager,
  selectShowOverTime,
  RsetDisable,
} from "../../slices/OverTimeSlice";
import { successMessage } from "../../../utils/message";

const SendFormManager = () => {
  const showOverTime = useSelector(selectModalSendManager);
  const dispatch = useDispatch();

  const cancelModalHandler = () => {
    dispatch(RsetShowSendManagerModal(false));
    dispatch(RsetDisable(true));
  };

  const acceptModalHandler = () => {
    successMessage("درخواست شما با موفقیت به سرپرست/مدیر ارسال شد.");
    dispatch(RsetDisable(false));
    dispatch(handleUsersOvertime());
    dispatch(RsetShowSendManagerModal(false));
    dispatch(RsetOverTimeReasonValue(""));
    dispatch(RsetToDate(null));
    dispatch(RsetFromDate(null));
    dispatch(RsetDescriptions(""));
  };

  return (
    <>
      <Modal
        show={showOverTime}
        onHide={() => dispatch(RsetShowSendManagerModal(false))}
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
        <Modal.Body className="show-grid">آیا مطمئن هستید؟</Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            name="cancelModal"
            variant="danger"
            onClick={cancelModalHandler}
          >
            خیر
          </Button>
          <Button
            name="acceptModal"
            variant="success"
            onClick={acceptModalHandler}
          >
            بله
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SendFormManager;
