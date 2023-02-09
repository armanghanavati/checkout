import { faArrowsRotate, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Common/Loading";
import ExpensesAccountFilter from "../../expensesAccount/filter/ExpensesAccountFilter";
import FilesClodItem from "./filesCloudItem/FilesClodItem";
import { selectIsLoadingCheckout } from "../../slices/mainSlices";
import { handleAccMode, handleAppName, handleCloudListFile, handleDownloadFile, selectAllCloudList } from "../../slices/filesCloudSlice";
import { useEffect } from "react";
import moment from "moment-jalaali";
import FileClodFilter from "../filter/FileClodFilter";

const FilesCloudTable = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [load, setload] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const fetchIdRef = useRef(0);
    const sortIdRef = useRef(0);

    const isLoading = useSelector(selectIsLoadingCheckout);
    const allCloudList = useSelector(selectAllCloudList);

    console.log(allCloudList);

    useEffect(() => {
        dispatch(handleCloudListFile())
        dispatch(handleAccMode())
        dispatch(handleAppName())
    }, [dispatch])

    const columns = useMemo(() => [
        {
            Header: "سریال",
            accessor: "col1",
            sortType: "basic",
        },
        {
            Header: "تاریخ",
            accessor: "col2",
            sortType: "basic",
        },
        {
            Header: "ارسال کننده",
            accessor: "col3",
            sortType: "basic",
        },
        {
            Header: "فایل",
            accessor: "col4",
            sortType: "basic",
        },
        {
            Header: "نام فایل",
            accessor: "fileName",
            sortType: "basic",
        },
        {
            Header: "ورژن",
            accessor: "col5",
            sortType: "basic",
        },
        {
            Header: "نام نرم افزار",
            accessor: "col6",
            sortType: "basic",
        },
        {
            Header: "توضیحات",
            accessor: "col7",
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

    const userName = (request) => {
        return (
            <span
                className="cursorPointer"
                onClick={() => { }}
            >
                {`${request.userInfo.first_name} ${request.userInfo.last_name}`}
            </span>
        );
    };

    const userSeries = (request) => {
        return (
            <span
                onClick={() => {
                    console.log(request);
                }}
                className="cursorPointer"
            >
                {request.serial_number}
            </span>
        );
    };

    const file = (reqId, fileName) => {
        return <FontAwesomeIcon
            onClick={() => {
                console.log(fileName)
                dispatch(handleDownloadFile({ reqId: reqId, fileName: fileName }))
            }
            }
            className="font20 text-primary cursorPointer align-items-center"
            icon={faPaperclip}
        />
    }



    const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
        var tableItems = [];
        if (requests.length !== 0) {
            for (var i = 0; i < requests.length; i++) {
                var tableItem = {
                    col1: userSeries(requests[i]),
                    col2: moment(requests[i].date, "YYYY/MM/DD A hh:mm ")
                        .locale("fa")
                        .format("jYYYY/jMM/jDD A hh:mm"),
                    col3: userName(requests[i]),
                    col4: file(requests[i]._id, requests[i].file.filename),
                    col5: requests[i].version,
                    col6: requests[i].application.name,
                    col7: requests[i].description,
                    fileName: requests[i].file.originalname.split(".")[0],
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
                        col1: userSeries(requests[i]),
                        col2: moment(requests[i].date, "YYYY/MM/DD A hh:mm ")
                            .locale("fa")
                            .format("jYYYY/jMM/jDD A hh:mm"),
                        col3: userName(requests[i]),
                        col4: file(requests[i]._id, requests[i].file.filename),
                        col5: requests[i].version,
                        col6: requests[i].application.name,
                        col7: requests[i].description,
                        fileName: requests[i].file.originalname.split(".")[0],
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
            <FileClodFilter />
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
                        <FilesClodItem
                            requests={allCloudList}
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

export default FilesCloudTable;
