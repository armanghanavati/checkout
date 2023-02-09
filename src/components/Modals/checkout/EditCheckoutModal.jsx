import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment-jalaali";
import DatePicker from "react-datepicker2";
import Select from "react-select";
import {
  selectReasonLeavingData,
  RsetReasonLeavingModal,
  handlePostEdit,
  selectLeavingWorkDate,
  RsetLeavingWorkDate,
  selectReasonLeavingModal,
  selectCurrentComp,
  selectCurrentDep,
  selectEditCheckoutModal,
  RsetEditCheckoutModal,
} from "../../slices/CheckoutOfficialSlice";
import {
  RsetDescriptionModals,
  selectCurrentReqInfo,
  selectDescriptionModals,
} from "../../slices/mainSlices";

const EditCheckoutModal = () => {
  const dispatch = useDispatch();
  const currentReqCo = useSelector(selectCurrentComp);
  const currentReqDepartment = useSelector(selectCurrentDep);
  const editCheckoutModal = useSelector(selectEditCheckoutModal);
  const details = useSelector(selectCurrentReqInfo);
  const reasonLeavingData = useSelector(selectReasonLeavingData);
  const dateTitle = useSelector(selectLeavingWorkDate);
  const reasonLeavingWork = useSelector(selectReasonLeavingModal);
  const des = useSelector(selectDescriptionModals);

  const reasonChanger = details.leavingWorkCause;
  const desChanger = details.description;
  const [descriptionTitle, setDescriptionTitle] = useState(desChanger);

  useEffect(() => {
    console.log(details);
    function onChangeHandlerInputs() {
      if (details.leavingWorkDate !== undefined) {
        dispatch(
          RsetLeavingWorkDate(moment(details.leavingWorkDate, "YYYY/MM/DD"))
        );
      }
      if (details.leavingWorkCause !== undefined) {
        RsetReasonLeavingModal(details.leavingWorkCause);
      }
      if (details.description !== undefined) {
        setDescriptionTitle(details.description);
      }
    }
    onChangeHandlerInputs();
  }, [details]);

  const handleEditModal = () => {
    dispatch(handlePostEdit(10));
    dispatch(RsetEditCheckoutModal(false));
  };

  return (
    <Modal
      centered
      show={editCheckoutModal}
      onHide={() => dispatch(RsetEditCheckoutModal(false))}
      backdrop="static"
      role="dialog"
      dialogClassName="modal-90w"
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header className="d-block bg-primary text-white">
        <Modal.Title className="d-flex justify-content-between">
          <div>
            <span className="fw-bold me-2">شماره سریال: </span>
            <span>
              {details.reqInfo !== undefined
                ? details.reqInfo.serial_number
                : ""}
            </span>
          </div>
          <div>
            <span>ویرایش درخواست </span>
          </div>
          <div>
            <span className="fw-bold me-2">تاریخ درخواست:</span>
            <span>
              {details.process !== undefined
                ? moment(details.process[0].date, "YYYY/MM/DD")
                  .locale("fa")
                  .format("jYYYY/jMM/jDD")
                : ""}
            </span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <ul className="list-unstyled">
          <li className="mb-3">
            <span className="fw-bold">نام و نام خانوادگی: </span>
            <span>
              {`${details.leaver !== undefined ? details.leaver.first_name : ""
                } ${details.leaver !== undefined ? details.leaver.last_name : ""
                }`}
            </span>
          </li>
          <li className="mb-3">
            <span className="fw-bold">شرکت: </span>
            <span>{currentReqCo}</span>
          </li>
          <li className="mb-3">
            <span className="fw-bold">واحد سازمانی: </span>
            <span>{currentReqDepartment}</span>
          </li>
          <span className=" fw-bold">علت ترک خدمت: </span>
          <Select
            className="mb-3"
            placeholder="جستجو . . ."
            options={reasonLeavingData}
            defaultValue={reasonChanger}
            onChange={(e) => dispatch(RsetReasonLeavingModal(e))}
          />
          <div className="mb-3">
            <span className="fw-bold">تاریخ ترک خدمت: </span>
            <DatePicker
              id="item6"
              className="form-control"
              persianDigits={true}
              value={dateTitle}
              onChange={(e) => dispatch(RsetLeavingWorkDate(e))}
              isGregorian={false}
              timePicker={false}
              inputFormat="YYYY-MM-DD"
              inputJalaaliFormat="jYYYY-jM-jD"
            />
          </div>
          <li className="mb-3">
            <span className="fw-bold">توضیحات: </span>
            <textarea
              type="textArea"
              defaultValue={details.description}
              onChange={(e) => dispatch(RsetDescriptionModals(e.target.value))}
              className="form-control"
            />
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <div className="d-flex">
          <Button onClick={handleEditModal} className=" " variant="primary">
            ویرایش درخواست
          </Button>
        </div>
        <div>
          <Button
            className="justify-content-end"
            variant="secondary"
            onClick={() => {
              dispatch(RsetEditCheckoutModal(false));
              dispatch(RsetDescriptionModals(""));
            }}
          >
            بستن
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCheckoutModal;
