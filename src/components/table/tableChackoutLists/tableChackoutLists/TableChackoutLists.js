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
  RsetCompanyCheckout,
  RsetDepartmantCheckoutTable,
  RsetFromDateTable,
  RsetLeavingWork,
  RsetStatusTable,
  RsetToDateTable,
  RsetUserCheckoutTable,
  handleGetUsersTable,
  handleGetHistories,
  selectAcceptCheckoutModal,
  selectCancelCheckoutModal,
  selectEditCheckoutModal,
  selectHistoriesCheckoutModal,
  selectUserTableList,
  selectViewCheckoutModal,
  RsetAcceptCheckoutModal,
  RsetCancelCheckoutModal,
  RsetHistoresCheckoutModal,
  RsetViewCheckoutModal,
  RsetEditCheckoutModal,
} from "../../../slices/TableCheckoutSlice";
import moment from "moment-jalaali";
import ViewCheckoutModal from "../../../modals/checkoutModals/ViewCheckoutModal";
import AcceptCheckoutModal from "../../../modals/checkoutModals/AcceptCheckoutModal";
import CancelCheckoutModal from "../../../modals/checkoutModals/CancelCheckoutModal";
import EditCheckoutModal from "../../../modals/checkoutModals/EditCheckoutModal";
import FieldsTableCheckout from "../../tableChackoutLists/fieldsTableCheckout/FieldsTableCheckout";
import HistoryCheckoutModal from "../../../modals/checkoutModals/HistoryCheckoutModal";
import UserInfoModal from "../../../modals/overTimeModals/UserInfoModal";
import {
  RsetUserInfoModals,
  selectUserInfoModal,
} from "../../../slices/OverTimeSlice";
import {
  handleUserInformation,
  handleUserPicture,
  handleHistories,
  selectIsLoadingCheckout,
  selectCurrentReqInfo,
  handleCurrentReqInfo,
  RsetIsLoadingCheckout,
} from "../../../slices/mainSlices";
import Loading from "../../../loading/Loading";
import { errorMessage } from "../../../utils/message";

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
  const infoModal = useSelector(selectHistoriesCheckoutModal);
  const isLoading = useSelector(selectIsLoadingCheckout);

  const userInfo = useSelector(selectUserInfoModal);

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
    dispatch(RsetIsLoadingCheckout(false));
    dispatch(RsetLeavingWork(""));
    dispatch(RsetUserCheckoutTable(""));
    dispatch(RsetStatusTable(""));
    dispatch(RsetToDateTable(null));
    dispatch(RsetFromDateTable(null));
    dispatch(RsetDepartmantCheckoutTable(""));
    dispatch(RsetCompanyCheckout(""));
    dispatch(handleGetUsersTable());
  };

  const buttons = (request) => {
    if (
      (request.process[0].toPerson || request.process[0].toPersons) ===
      undefined
    ) {
      return (
        <Fragment>
          <div className="d-flex">
            <Button
              className="d-flex me-1 align-items-center btn-sm"
              variant="primary"
              onClick={async () => {
                if (request.process[0] !== undefined) {
                  const data = await dispatch(
                    handleCurrentReqInfo({
                      reqId: request._id,
                      reqType: request.type,
                      objCompany: request.company,
                      objDepartment: request.department,
                    })
                  );
                  if (data.payload.code === 403) {
                    errorMessage("جزئیات مورد نظر یافت نشد!");
                  } else if (data.payload.description !== undefined) {
                    dispatch(RsetEditCheckoutModal(true));
                  }
                } else {
                  errorMessage("خطا در دریافت اطلاعات!");
                }
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
              className="d-flex me-1 align-items-center text-dark btn-sm"
              variant="info"
              onClick={async () => {
                const data = await dispatch(
                  handleCurrentReqInfo({
                    reqId: request._id,
                    reqType: request.type,
                    objCompany: request.company,
                    objDepartment: request.department,
                  })
                );
                console.log(
                  dispatch(
                    handleHistories({
                      serial: request.reqInfo.serial_number,
                      type: 10,
                    })
                  )
                );
                if (data.payload.code === 403) {
                  errorMessage("جزئیات مورد نظر یافت نشد!");
                } else if (data.payload.description !== undefined) {
                  dispatch(RsetHistoresCheckoutModal(true));
                  dispatch(handleUserInformation(request.reqInfo.leaver._id));
                  dispatch(handleUserPicture(request.reqInfo.leaver._id));
                  dispatch(
                    handleHistories({
                      serial: request.reqInfo.serial_number,
                      type: 10,
                    })
                  );
                } else {
                  errorMessage("خطا در دریافت اطلاعات!");
                }
              }}
            >
              <FontAwesomeIcon icon={faClockRotateLeft} />
            </Button>
          </div>
        </Fragment>
      );
    } else if (
      (request.process[0].toPerson || request.process[0].toPersons) ===
      localStorage.getItem("id")
    ) {
      return (
        <Fragment>
          <div className="d-flex">
            <Button
              className="d-flex me-1 align-items-center text-dark btn-sm"
              variant="info"
              onClick={async () => {
                const data = await dispatch(
                  handleCurrentReqInfo({
                    reqId: request._id,
                    reqType: request.type,
                    objCompany: request.company,
                    objDepartment: request.department,
                  })
                );
                console.log(
                  dispatch(
                    handleHistories({
                      serial: request.reqInfo.serial_number,
                      type: 10,
                    })
                  )
                );
                if (data.payload.code === 403) {
                  errorMessage("جزئیات مورد نظر یافت نشد!");
                } else if (data.payload.description !== undefined) {
                  dispatch(RsetHistoresCheckoutModal(true));
                  dispatch(handleUserInformation(request.reqInfo.leaver._id));
                  dispatch(handleUserPicture(request.reqInfo.leaver._id));
                  dispatch(
                    handleHistories({
                      serial: request.reqInfo.serial_number,
                      type: 10,
                    })
                  );
                } else {
                  errorMessage("خطا در دریافت اطلاعات!");
                }
              }}
            >
              <FontAwesomeIcon icon={faClockRotateLeft} />
            </Button>
            <Button
              className="d-flex me-1 align-items-center btn-sm"
              variant="danger"
              onClick={async () => {
                const data = await dispatch(
                  handleCurrentReqInfo({
                    reqId: request._id,
                    reqType: request.type,
                    objCompany: request.company,
                    objDepartment: request.department,
                  })
                );
                console.log(data);
                if (data.payload.code === 403) {
                  errorMessage("جزئیات مورد نظر یافت نشد!");
                } else if (data.payload.description !== undefined) {
                  dispatch(RsetCancelCheckoutModal(true));
                } else {
                  errorMessage("خطا در دریافت اطلاعات!");
                }
              }}
            >
              <FontAwesomeIcon icon={faBan} />
            </Button>
            <Button
              className="d-flex me-1 align-items-center btn-sm"
              variant="success"
              onClick={async () => {
                const data = await dispatch(
                  handleCurrentReqInfo({
                    reqId: request._id,
                    reqType: request.type,
                    objCompany: request.company,
                    objDepartment: request.department,
                  })
                );
                if (data.payload.code === 403) {
                  errorMessage("جزئیات مورد نظر یافت نشد!");
                } else if (data.payload.description !== undefined) {
                  dispatch(RsetAcceptCheckoutModal(true));
                } else {
                  errorMessage("خطا در دریافت اطلاعات!");
                }
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div className="d-flex">
            <Button
              className="d-flex me-1 align-items-center btn-sm"
              variant="warning"
              onClick={async () => {
                const data = await dispatch(
                  handleCurrentReqInfo({
                    reqId: request._id,
                    reqType: request.type,
                    objCompany: request.company,
                    objDepartment: request.department,
                  })
                );
                if (data.payload.code === 403) {
                  errorMessage("جزئیات مورد نظر یافت نشد!");
                } else if (data.payload.description !== undefined) {
                  dispatch(RsetViewCheckoutModal(true));
                } else {
                  errorMessage("خطا در دریافت اطلاعات!");
                }
              }}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
            <Button
              className="d-flex me-1 align-items-center text-dark btn-sm"
              variant="info"
              onClick={async () => {
                const data = await dispatch(
                  handleCurrentReqInfo({
                    reqId: request._id,
                    reqType: request.type,
                    objCompany: request.company,
                    objDepartment: request.department,
                  })
                );
                console.log(
                  dispatch(
                    handleHistories({
                      serial: request.reqInfo.serial_number,
                      type: 10,
                    })
                  )
                );
                if (data.payload.code === 403) {
                  errorMessage("جزئیات مورد نظر یافت نشد!");
                } else if (data.payload.description !== undefined) {
                  dispatch(RsetHistoresCheckoutModal(true));
                  dispatch(handleUserInformation(request.reqInfo.leaver._id));
                  dispatch(handleUserPicture(request.reqInfo.leaver._id));
                  dispatch(
                    handleHistories({
                      serial: request.reqInfo.serial_number,
                      type: 10,
                    })
                  );
                } else {
                  errorMessage("خطا در دریافت اطلاعات!");
                }
              }}
            >
              <FontAwesomeIcon icon={faClockRotateLeft} />
            </Button>
          </div>
        </Fragment>
      );
    }
  };

  const seriesView = (request) => {
    return (
      <span
        className="cursorPointer"
        onClick={async () => {
          const data = await dispatch(
            handleCurrentReqInfo({
              reqId: request._id,
              reqType: request.type,
              objCompany: request.company,
              objDepartment: request.department.name,
            })
          );
          if (data.payload.code === 403) {
            errorMessage("جزئیات مورد نظر یافت شد!");
          } else if (data.payload.description !== undefined) {
            dispatch(RsetViewCheckoutModal(true));
          }
        }}
      >
        {request.reqInfo.serial_number}
      </span>
    );
  };

  const userLinks = (request) => {
    return (
      <span
        className="cursorPointer"
        onClick={() => {
          console.log(request);
          dispatch(RsetUserInfoModals(true));
          dispatch(handleUserInformation(request.reqInfo.leaver._id));
          dispatch(handleUserPicture(request.reqInfo.leaver._id));
        }}
      >
        {`${request.reqInfo.leaver.first_name} ${request.reqInfo.leaver.last_name}`}
      </span>
    );
  };

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    var tableItems = [];
    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        var tableItem = {
          col1: seriesView(requests[i]),
          col2: moment(requests[i].process[0].date, "YYYY/MM/DD")
            .locale("fa")
            .format("jYYYY/jMM/jDD"),
          col3: userLinks(requests[i]),
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
            col1: seriesView(requests[i]),
            col2: moment(requests[i].process[0].date, "YYYY/MM/DD")
              .locale("fa")
              .format("jYYYY/jMM/jDD"),
            col3: userLinks(requests[i]),
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
      <FieldsTableCheckout />
      <section className="position-relative">
        {!isLoading && <Loading />}
        <div>
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
          <TableCheckOutItems
            requests={userCheckoutList}
            columns={columns}
            data={data}
            onSort={handleSort}
            fetchData={fetchData}
            loading={load}
            pageCount={pageCount}
          />
        </div>
      </section>
      {acceptModal && <AcceptCheckoutModal />}
      {editModal && <EditCheckoutModal />}
      {cancelModal && <CancelCheckoutModal />}
      {viewModal && <ViewCheckoutModal />}
      {infoModal && <HistoryCheckoutModal />}
      {userInfo && <UserInfoModal />}
    </div>
  );
};

export default CheckoutList;
