import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useMemo, Fragment, useCallback } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Common/Loading";
import { selectIsLoadingCheckout } from "../../slices/mainSlices";
import ExpensesAccountFilter from "../filter/ExpensesAccountFilter";
import ExAcItemTable from "./Item/ExAcItemTable";

const ExpensesAccountTable = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);

  const isLoading = useSelector(selectIsLoadingCheckout);
  // const filterValues = {
  //   applicant_id: localStorage.getItem("id"),
  //   leaver: leaver !== "" ? leaver.value : leaver,
  //   status: status !== "" ? status.value : status,
  //   fromDate: fromDate !== null ? fromDate.format("YYYY/MM/DD") : "null",
  //   toDate: toDate !== null ? toDate.format("YYYY/MM/DD") : "null",
  //   leavingWorkCause:
  //     leavingWorkCause !== "" ? leavingWorkCause.value : leavingWorkCause,
  //   company: company !== "" ? company.value : "",
  //   department: department !== "" ? department.value : "",
  //   role: "",
  //   type: 14,
  // };

  const columns = useMemo(() => [
    {
      Header: "درخواست کننده",
      accessor: "col1",
      sortType: "basic",
    },
    {
      Header: "تاریخ",
      accessor: "col2",
      sortType: "basic",
    },
    {
      Header: "وضعیت",
      accessor: "col5",
      sortType: "basic",
    },
    {
      Header: "واحد",
      accessor: "col6",
      sortType: "basic",
    },
    {
      Header: "عملیات",
      accessor: "col8",
      sortType: "basic",
    },
  ]);

  // const buttons = (request) => {
  //   if (
  //     (request.process[0].toPerson || request.process[0].toPersons) ===
  //     undefined
  //   ) {
  //     return (
  //       <Fragment>
  //         <div className="d-flex">
  //           <Button
  //             variant="primary"
  //             className="d-flex me-1 align-items-center btn-sm"
  //             onClick={() => {
  //               dispatch(RsetEditOverTimeModal(true));
  //               dispatch(handleReasonOvertime());
  //               console.log(request);
  //               dispatch(RsetCurrentReqInfo(request));
  //             }}
  //           >
  //             <FontAwesomeIcon icon={faPenToSquare} />
  //           </Button>
  //           <Button
  //             className="d-flex me-1 align-items-center text-dark btn-sm"
  //             variant="info"
  //             onClick={async () => {
  //               const data = await dispatch(
  //                 handleHistories({
  //                   serial: request.reqInfo.serial_number,
  //                   type: 14,
  //                 })
  //               );
  //               console.log(data.payload);
  //               if (data.payload.length !== 0) {
  //                 dispatch(handleUserInformation(request.process[0]._id));
  //                 dispatch(handleUserPicture(request.process[0]._id));
  //                 dispatch(RsetHistoryOverTimeModal(true));
  //               } else {
  //                 errorMessage("اطلاعات یافت نشد");
  //               }
  //               console.log(data);
  //             }}
  //           >
  //             <FontAwesomeIcon icon={faClockRotateLeft} />
  //           </Button>
  //         </div>
  //       </Fragment>
  //     );
  //   } else if (
  //     (request.process[0].toPerson || request.process[0].toPersons) ===
  //     localStorage.getItem("id")
  //   ) {
  //     return (
  //       <Fragment>
  //         <div className="d-flex">
  //           <Button
  //             className="d-flex me-1 align-items-center text-dark btn-sm"
  //             variant="info"
  //             onClick={async () => {
  //               const data = await dispatch(
  //                 handleHistories({
  //                   serial: request.reqInfo.serial_number,
  //                   type: 14,
  //                 })
  //               );
  //               console.log(data.payload);
  //               if (data.payload.length !== 0) {
  //                 dispatch(handleUserInformation(request.process[0]._id));
  //                 dispatch(handleUserPicture(request.process[0]._id));
  //                 dispatch(RsetHistoryOverTimeModal(true));
  //               } else {
  //                 errorMessage("اطلاعات یافت نشد");
  //               }
  //               console.log(data);
  //             }}
  //           >
  //             <FontAwesomeIcon icon={faClockRotateLeft} />
  //           </Button>
  //           <Button
  //             className="d-flex me-1 align-items-center btn-sm"
  //             variant="danger"
  //             onClick={() => {
  //               dispatch(RsetCancelOverTimeModal(true));
  //               dispatch(RsetCurrentReqInfo(request));
  //             }}
  //           >
  //             <FontAwesomeIcon icon={faBan} />
  //           </Button>
  //           <Button
  //             variant="success"
  //             className="d-flex me-1 align-items-center btn-sm"
  //             onClick={async () => {
  //               const data = await dispatch(RsetCurrentReqInfo(request));
  //               console.log(data);
  //               if (data.payload) {
  //                 dispatch(RsetAcceptOverTimeModal(true));
  //               } else if (data.payload.description !== undefined) {
  //                 errorMessage("جزئیات مورد نظر یافت نشد!");
  //               } else {
  //                 errorMessage("خطا در دریافت اطلاعات!");
  //               }
  //             }}
  //           >
  //             <FontAwesomeIcon icon={faCheck} />
  //           </Button>
  //         </div>
  //       </Fragment>
  //     );
  //   } else {
  //     return (
  //       <Fragment>
  //         <div className="d-flex">
  //           <Button
  //             variant="warning"
  //             className="d-flex me-1 align-items-center btn-sm"
  //             onClick={() => {
  //               dispatch(RsetCurrentReqInfo(request));
  //               dispatch(RsetViewOverTimeModal(true));
  //             }}
  //           >
  //             <FontAwesomeIcon icon={faEye} />
  //           </Button>
  //           <Button
  //             className="d-flex me-1 align-items-center text-dark btn-sm"
  //             variant="info"
  //             onClick={async () => {
  //               const data = await dispatch(
  //                 handleHistories({
  //                   serial: request.reqInfo.serial_number,
  //                   type: 14,
  //                 })
  //               );
  //               console.log(data.payload);
  //               if (data.payload.length !== 0) {
  //                 dispatch(handleUserInformation(request.process[0]._id));
  //                 dispatch(handleUserPicture(request.process[0]._id));
  //                 dispatch(RsetHistoryOverTimeModal(true));
  //               } else {
  //                 errorMessage("اطلاعات یافت نشد");
  //               }
  //               console.log(data);
  //             }}
  //           >
  //             <FontAwesomeIcon icon={faClockRotateLeft} />
  //           </Button>
  //         </div>
  //       </Fragment>
  //     );
  //   }
  // };

  // const linkUserInfo = (request) => {
  //   return (
  //     <span
  //       className="cursorPointer"
  //       onClick={() => (
  //         dispatch(RsetUserInfoModals(true)),
  //         dispatch(handleUserInformation(request.process[0].userInfo._id)),
  //         dispatch(handleUserPicture(request.process[0].userInfo._id))
  //       )}
  //     >
  //       {`${request.process[0].userInfo.first_name} ${request.process[0].userInfo.last_name}`}
  //     </span>
  //   );
  // };

  // const userSeries = (request) => {
  //   return (
  //     <span
  //       onClick={() => {
  //         console.log(request);
  //         dispatch(RsetCurrentReqInfo(request));
  //         dispatch(RsetViewOverTimeModal(true));
  //       }}
  //       className="cursorPointer"
  //     >
  //       {request.reqInfo.serial_number}
  //     </span>
  //   );
  // };

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    var tableItems = [];
    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        var tableItem = {
          col1: "linkUserInfo(requests[i])",
          col2: "",
          col4: "requests[i].reqInfo.reason",
          col5: "requests[i].status.name",
          col6: "requests[i].department.name",
          col7: "",
          col8: "",
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
            col1: "linkUserInfo(requests[i])",
            col2: "",
            col4: "requests[i].reqInfo.reason",
            col5: "requests[i].status.name",
            col6: "requests[i].department.name",
            col7: "",
            col8: "",
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
    <Container fluid>
      <ExpensesAccountFilter />
      <div className="my-4">
        <section className="position-relative">
          {isLoading && <Loading />}
          <div>
            <Button
              onClick={() => {
                // dispatch(handleReqsList(filterValues));
              }}
              className="my-2"
            >
              <span>
                <FontAwesomeIcon
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  className="ml-2 me-1"
                  icon={faArrowsRotate}
                />
                به روز رسانی جدول
              </span>
            </Button>
            <ExAcItemTable
              requests={"usersList"}
              columns={columns}
              data={data}
              onSort={handleSort}
              fetchData={fetchData}
              loading={load}
              pageCount={pageCount}
            />
          </div>
        </section>
      </div>
    </Container>
  );
};

export default ExpensesAccountTable;
