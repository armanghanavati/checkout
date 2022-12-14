import React, { useEffect } from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAcceptCheckoutModal,
  selectDetailes,
  selectUserTableList,
  setAcceptCheckoutModal,
  selectCurrentComp,
  selectCurrentDep,
  selectComplateDescription,
  addComplateDescription,
  postHandler,
  fetchAllDepartment,
  fetchCurrentReqInfo,
  postHandlerBtnAccept,
  selectInfoCheckoutModal,
  setInfoCheckoutModal,
  postHistoryBtn,
  // postHandler,
} from "../../checkoutOfficialSlice/TableCheckoutSlice";
import "./Styles.css";
import moment from "moment-jalaali";
import { toast } from "react-toastify";
import { postAction } from "../../../common/services";
import { postCheckDate } from "../../../common/tableListServices";

const HistoryCheckoutModal = () => {
  const dispatch = useDispatch();
  const AcceptCheckoutModal = useSelector(selectAcceptCheckoutModal);
  const userCheckoutList = useSelector(selectUserTableList);
  const details = useSelector(selectDetailes);
  const currentReqCo = useSelector(selectCurrentComp);
  const currentReqDepartment = useSelector(selectCurrentDep);
  const complateDescription = useSelector(selectComplateDescription);
  const infoCheckoutModal = useSelector(selectInfoCheckoutModal);

  // const test = details.map((id) => {
  //   return id;
  // });

  // console.log(details.process.length);

  useEffect(() => {
    dispatch(postHistoryBtn());
  }, [dispatch]);

  //   const postUsersHandler = (e) => {
  //     e.preventDefault();

  //     dispatch(postHandlerBtnAccept());

  //     dispatch(setAcceptCheckoutModal(false));
  //     dispatch(addComplateDescription(""));
  //   };

  return (
    <Modal
      show={infoCheckoutModal}
      onHide={() => dispatch(setInfoCheckoutModal(false))}
      backdrop="static"
      role="dialog"
      dialogClassName="cont_modal"
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header className="d-block bg-info text-white">
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
            <span>تایید درخواست </span>
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
      <Modal.Body className="show-grid"> /History/ </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button
          className="justify-content-end"
          variant="secondary"
          onClick={() => dispatch(setInfoCheckoutModal(false))}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HistoryCheckoutModal;
