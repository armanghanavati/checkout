import React, { Fragment, useCallback, useMemo, useState, useRef } from "react";
import TableCheckOutItems from "./TableCheckOutItems";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faPenToSquare,
  faCheck,
  faBan,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserMembers,
  selectUserTableList,
  setAcceptCheckoutModal,
  setCancelCheckoutModal,
  setEditCheckoutModal,
  setViewCheckoutModal,
} from "../../checkoutOfficialSlice/TableCheckoutSlice";
import DatePicker from "react-datepicker2";
import moment from "moment-jalaali";
import ViewCheckoutModal from "../../modals/checkoutModals/ViewCheckoutModal";
import AcceptCheckoutModal from "../../modals/checkoutModals/AcceptCheckoutModal";
import CancelCheckoutModal from "../../modals/checkoutModals/CancelCheckoutModal";
import EditCheckoutModal from "../../modals/checkoutModals/EditCheckoutModal";

const CheckoutList = () => {
  const dispatch = useDispatch();
  const [time, setTiem] = useState(null);
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);
  const userCheckoutList = useSelector(selectUserTableList);
  // const userMembers = useSelector(selectUserMembers);
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
      Header: "درخواست کننده ",
      accessor: "col3",
      sortType: "basic",
    },
    {
      Header: "علت ترک خدمت",
      accessor: "col4",
      sortType: "basic",
    },
    {
      Header: "وضعیت درخواست",
      accessor: "col5",
      sortType: "basic",
    },
    {
      Header: "عملیات",
      accessor: "col6",
      sortType: "basic",
    },
  ]);
  const buttons = () => {
    return (
      <Fragment>
        <Button
          className="m-1"
          variant="primary"
          onClick={() => dispatch(setAcceptCheckoutModal(true))}
        >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
        <Button
          className="m-1"
          variant="success"
          onClick={() => dispatch(setEditCheckoutModal(true))}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
        <Button
          className="m-1"
          variant="danger"
          onClick={() => dispatch(setCancelCheckoutModal(true))}
        >
          <FontAwesomeIcon icon={faBan} />
        </Button>
        <Button
          className="m-1"
          variant="warning"
          onClick={() => dispatch(setViewCheckoutModal(true))}
        >
          <FontAwesomeIcon icon={faEye} />
        </Button>
      </Fragment>
    );
  };

  const timerHandler = (e) => {
    setTiem(e);
  };

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    console.log(requests);
    var tableItems = [];
    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        var tableItem = {
          col1: requests[i].reqInfo.serial_number,
          col2: moment(requests[i].process[0].date, "YYYY/MM/DD")
            .locale("fa")
            .format("jYYYY/jMM/jDD"),
          col3: `${requests[i].process[0].userInfo.first_name} ${requests[i].process[0].userInfo.last_name}`,
          col4: requests[i].reqInfo.leavingWorkCause,
          col5: requests[i].status.name,
          col6: buttons(),
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
            col1: requests[i].reqInfo.serial_number,
            col2: moment(requests[i].process[0].date, "YYYY/MM/DD")
              .locale("fa")
              .format("jYYYY/jMM/jDD"),
            col3: `${requests[i].process[0].userInfo.first_name} ${requests[i].process[0].userInfo.last_name}`,
            col4: requests[i].reqInfo.leavingWorkCause,
            col5: requests[i].status.name,
            col6: buttons(),
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
      <Button className="my-2">
        <span>
          <FontAwesomeIcon
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            className="ml-2"
            icon={faArrowsRotate}
          />
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
        <AcceptCheckoutModal />
        <EditCheckoutModal />
        <CancelCheckoutModal />
        <ViewCheckoutModal />
      </section>
    </div>
  );
};

export default CheckoutList;
