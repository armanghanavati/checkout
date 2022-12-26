import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addDescreption,
  addEndDate,
  addOverTimeReasonValue,
  addShowOverTime,
  addStartDate,
  postOverTimeApi,
  selectShowOverTime,
  setIsSubmit,
} from "../../slices/OverTimeSlice";

const OverTime = () => {
  const showOverTime = useSelector(selectShowOverTime);
  const dispatch = useDispatch();
  const cancelModalHandler = () => {
    dispatch(addShowOverTime(false));
    dispatch(setIsSubmit(true));
  };
  const acceptModalHandler = () => {
    dispatch(postOverTimeApi());
    dispatch(addShowOverTime(false));
    dispatch(addOverTimeReasonValue(""));
    dispatch(addEndDate(null));
    dispatch(addStartDate(null));
    dispatch(addDescreption(""));
  };

  console.log(showOverTime);

  return (
    <>
      <Modal
        show={showOverTime}
        onHide={() => dispatch(addShowOverTime(false))}
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

export default OverTime;
