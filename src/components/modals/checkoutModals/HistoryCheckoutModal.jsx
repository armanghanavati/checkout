import React, { useEffect } from "react";
import { Modal, Button, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDetailes,
  selectHistoryData,
  selectInfoCheckoutModal,
  setInfoCheckoutModal,
} from "../../checkoutOfficialSlice/TableCheckoutSlice";
import "./Styles.css";
import moment from "moment-jalaali";

const HistoryCheckoutModal = () => {
  const dispatch = useDispatch();
  const details = useSelector(selectDetailes);
  const infoCheckoutModal = useSelector(selectInfoCheckoutModal);
  const histories = useSelector(selectHistoryData);

  const userName = histories.map((history) => {
    return history.comments.map((item) => {
      return item;
    });
  });

  console.log(userName);
  // const test = details.map((id) => {
  //   return id;
  // });

  // console.log(details.process.length);

  //   const postUsersHandler = (e) => {
  //     e.preventDefault();

  //     dispatch(postHandlerBtnAccept());

  //     dispatch(setAcceptCheckoutModal(false));
  //     dispatch(addComplateDescription(""));
  //   };

  return (
    <section>
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
              <span> نظرات </span>
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
          <Col className="d-flex" xxl="1" xl="2" lg="3" md="2">
            <div>
              <img />
            </div>
          </Col>
          <Col xxl="11" xl="10" lg="9" md="10">
            <div className="border p-4 routed postion-relative w-100 bg-white rounded ">
              <div className="triangleBorder position-absolute w-0 h-0">
                <div className="triangle position-absolute w-0 h-0"></div>
              </div>
            </div>
          </Col>
        </Modal.Body>
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
    </section>
  );
};

export default HistoryCheckoutModal;
