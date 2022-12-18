import React, { Fragment, useCallback, useMemo, useState, useRef } from "react";
import TableCheckOutItems from "./TableCheckOutItems";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faPenToSquare,
  faCheck,
  faBan,
  faEye,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addCompany,
  addDep,
  addFromDate,
  addLeavingWorkCause,
  addStatus,
  addToDate,
  addUserMemb,
  fetchCurrentReqInfo,
  handleGetUsersTable,
  postHistoryBtn,
  selectAcceptCheckoutModal,
  selectCancelCheckoutModal,
  selectEditCheckoutModal,
  selectInfoCheckoutModal,
  selectUserTableList,
  selectViewCheckoutModal,
  setAcceptCheckoutModal,
  setCancelCheckoutModal,
  setEditCheckoutModal,
  setInfoCheckoutModal,
  setViewCheckoutModal,
} from "../../checkoutOfficialSlice/TableCheckoutSlice";
import moment from "moment-jalaali";
import ViewCheckoutModal from "../../modals/checkoutModals/ViewCheckoutModal";
import AcceptCheckoutModal from "../../modals/checkoutModals/AcceptCheckoutModal";
import CancelCheckoutModal from "../../modals/checkoutModals/CancelCheckoutModal";
import EditCheckoutModal from "../../modals/checkoutModals/EditCheckoutModal";
import FieldsTableCheckout from "../fieldsTableCheckout/FieldsTableCheckout";
import HistoryCheckoutModal from "../../modals/checkoutModals/HistoryCheckoutModal";

const CheckoutList = ({ isSubmit }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);
  const userCheckoutList = useSelector(selectUserTableList);
  const acceptModal = useSelector(selectAcceptCheckoutModal);
  const viewModal = useSelector(selectViewCheckoutModal);
  const cancelModal = useSelector(selectCancelCheckoutModal);
  const editModal = useSelector(selectEditCheckoutModal);
  const infoModal = useSelector(selectInfoCheckoutModal);

  console.log(userCheckoutList);

  const columns = useMemo(() => [
    {
      Header: " سریال درخواست",
      accessor: "col1",
      sortType: "basic",
    },
    {
      Header: "تاریخ ثبت درخواست",
      accessor: "col2",
      sortType: "basic",
    },
    {
      Header: "پرسنل مستعفی",
      accessor: "col3",
      sortType: "basic",
    },
    {
      Header: "شرکت",
      accessor: "col4",
      sortType: "basic",
    },
    {
      Header: "واحد",
      accessor: "col5",
      sortType: "basic",
    },
    {
      Header: "علت ترک خدمت",
      accessor: "col6",
      sortType: "basic",
    },
    {
      Header: "وضعیت درخواست",
      accessor: "col7",
      sortType: "basic",
    },
    {
      Header: "عملیات",
      accessor: "col8",
      sortType: "basic",
    },
  ]);

  const reasetTableHandler = () => {
    dispatch(addLeavingWorkCause(""));
    dispatch(addUserMemb(""));
    dispatch(addStatus(""));
    dispatch(addToDate(null));
    dispatch(addFromDate(null));
    dispatch(addDep(""));
    dispatch(addCompany(""));
    dispatch(handleGetUsersTable());
  };

  const buttons = (request) => {
    return (
      <Fragment>
        <div className="d-flex flex-wrap justify-content-between">
          <Button
            className="d-flex align-items-center btn-sm"
            variant="success"
            onClick={() => {
              console.log(request);
              dispatch(
                fetchCurrentReqInfo({
                  reqId: request._id,
                  reqType: request.type,
                  objCompany: request.company,
                  objDepartment: request.department.name,
                })
              );
              dispatch(setAcceptCheckoutModal(true));
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button
            className="d-flex align-items-center btn-sm"
            variant="primary"
            onClick={() => {
              dispatch(
                fetchCurrentReqInfo({
                  reqId: request._id,
                  reqType: request.type,
                  objCompany: request.company,
                  objDepartment: request.department.name,
                })
              );
              dispatch(setEditCheckoutModal(true));
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
          <Button
            className="d-flex align-items-center btn-sm"
            variant="danger"
            onClick={() => {
              dispatch(
                fetchCurrentReqInfo({
                  reqId: request._id,
                  reqType: request.type,
                  objCompany: request.company,
                  objDepartment: request.department.name,
                })
              );
              dispatch(setCancelCheckoutModal(true));
            }}
          >
            <FontAwesomeIcon icon={faBan} />
          </Button>
          <Button
            className="d-flex align-items-center btn-sm"
            variant="warning"
            onClick={() => {
              dispatch(
                fetchCurrentReqInfo({
                  reqId: request._id,
                  reqType: request.type,
                  objCompany: request.company,
                  objDepartment: request.department.name,
                })
              );
              dispatch(setViewCheckoutModal(true));
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button
            className="d-flex align-items-center text-dark btn-sm"
            variant="info"
            onClick={() => {
              dispatch(
                fetchCurrentReqInfo({
                  reqId: request._id,
                  reqType: request.type,
                  objCompany: request.company,
                  objDepartment: request.department.name,
                })
              );
              dispatch(
                postHistoryBtn(request.reqInfo.serial_number)
              );
              dispatch(setInfoCheckoutModal(true));
            }}
          >
            <FontAwesomeIcon icon={faClockRotateLeft} />
          </Button>
        </div>
      </Fragment>
    );
  };

  const linkBtn = (request) => {
    return (
      <a
        onClick={() => {
          dispatch(
            fetchCurrentReqInfo({
              reqId: request._id,
              reqType: request.type,
              objCompany: request.company,
              objDepartment: request.department.name,
            })
          );
          dispatch(setViewCheckoutModal(true));
        }}
      >
        {request.reqInfo.serial_number}
      </a>
    );
  };

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    var tableItems = [];
    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        var tableItem = {
          col1: linkBtn(requests[i]),
          col2: moment(requests[i].process[0].date, "YYYY/MM/DD")
            .locale("fa")
            .format("jYYYY/jMM/jDD"),
          col3: `${requests[i].reqInfo.leaver.first_name} ${requests[i].reqInfo.leaver.last_name}`,
          col4: requests[i].company,
          col5: requests[i].department.name,
          col6: requests[i].reqInfo.leavingWorkCause.name,
          col7: requests[i].status.name,
          col8: buttons(requests[i]),
        };
        tableItems.push(tableItem);
      }
    }
    const fetchId = ++fetchIdRef.current;

    setload(true);
    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * pageIndex;
      const endRow = startRow + pageSize;
      setData(tableItems.slice(startRow, endRow));
      setPageCount(Math.ceil(tableItems.length / pageSize));
      setload(false);
    }
  }, []);

  const handleSort = useCallback(
    ({ sortBy, pageIndex, pageSize, requests }) => {
      var tableItems = [];
      if (requests.length !== 0) {
        for (var i = 0; i < requests.length; i++) {
          var tableItem = {
            col1: linkBtn(requests[i]),
            col2: moment(requests[i].process[0].date, "YYYY/MM/DD")
              .locale("fa")
              .format("jYYYY/jMM/jDD"),
            col3: `${requests[i].reqInfo.leaver.first_name} ${requests[i].reqInfo.leaver.last_name}`,
            col4: requests[i].company,
            col5: requests[i].department.name,
            col6: requests[i].reqInfo.leavingWorkCause.name,
            col7: requests[i].status.name,
            col8: buttons(requests[i]),
          };
          tableItems.push(tableItem);
        }
      }
      const sortId = ++sortIdRef.current;
      setload(true);
      if (sortId === sortIdRef.current) {
        let sorted = tableItems.slice();
        sorted.sort((a, b) => {
          for (let i = 0; i < sortBy.length; ++i) {
            if (a[sortBy[i].id] > b[sortBy[i].id])
              return sortBy[i].desc ? -1 : 1;
            if (a[sortBy[i].id] < b[sortBy[i].id])
              return sortBy[i].desc ? 1 : -1;
          }
          return 0;
        });
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(sorted.slice(startRow, endRow));
        setload(false);
      }
    },
    []
  );

  return (
    <div className="my-4">
      <FieldsTableCheckout
        requests={userCheckoutList}
        columns={columns}
        data={data}
        onSort={handleSort}
        fetchData={fetchData}
        loading={load}
        pageCount={pageCount}
        isSubmit={isSubmit}
      />
      <Button onClick={reasetTableHandler} className="my-2">
        <span>
          <FontAwesomeIcon
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            className="ml-2"
            icon={faArrowsRotate}
          />{" "}
          به روز رسانی جدول
        </span>
      </Button>
      <section>
        <TableCheckOutItems
          requests={userCheckoutList}
          columns={columns}
          data={data}
          onSort={handleSort}
          fetchData={fetchData}
          loading={load}
          pageCount={pageCount}
        />
        {acceptModal && <AcceptCheckoutModal />}
        {editModal && <EditCheckoutModal />}
        {cancelModal && <CancelCheckoutModal />}
        {viewModal && <ViewCheckoutModal />}
        {infoModal && <HistoryCheckoutModal />}
      </section>
    </div>
  );
};

export default CheckoutList;
