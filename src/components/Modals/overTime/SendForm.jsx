import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../utils/message";
import {
  RsetDescriptions,
  RsetToDate,
  RsetOverTimeReasonValue,
  RsetShowOverTimeApplyModal,
  RsetFromDate,
  handleUsersOvertime,
  selectShowOverTime,
  RsetDisable,
} from "../../slices/OverTimeSlice";

const SendForm = () => {
  const showOverTime = useSelector(selectShowOverTime);
  const dispatch = useDispatch();
  const cancelModalHandler = () => {
    dispatch(RsetShowOverTimeApplyModal(false));
    dispatch(RsetDisable(true));
  };
  const acceptModalHandler = () => {
    successMessage("درخواست شما با موفقیت به سرپرست/مدیر ارسال شد.");
    dispatch(handleUsersOvertime());
    dispatch(RsetShowOverTimeApplyModal(false));
    dispatch(RsetOverTimeReasonValue(""));
    dispatch(RsetToDate(null));
    dispatch(RsetFromDate(null));
    dispatch(RsetDescriptions(""));
  };

  return (
    <>
      <Modal
        show={showOverTime}
        onHide={() => dispatch(RsetShowOverTimeApplyModal(false))}
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
          درخواست مورد نظر برای سرپرست یا مدیر ارسال شود؟
        </Modal.Body>
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

export default SendForm;
