import React, { Fragment, useCallback, useMemo, useState, useRef } from "react";
import OverTimeTableItem from "./item/OverTimeTableItem";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-jalaali";
import {
  addShowOverTime,
  selectShowOverTime,
} from "../../../slices/OverTimeSlice";

const OverTimeTableList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);

  const columns = useMemo(() => [
    ,
    {
      Header: "درخواست کننده",
      accessor: "col1",
      sortType: "basic",
    },
    {
      Header: "تاریخ شروع",
      accessor: "col2",
      sortType: "basic",
    },
    {
      Header: "تاریخ پایان",
      accessor: "col3",
      sortType: "basic",
    },
    {
      Header: "زمان شروع",
      accessor: "col4",
      sortType: "basic",
    },
    {
      Header: "زمان پایان",
      accessor: "col5",
      sortType: "basic",
    },
    {
      Header: "نوع اضافه کار",
      accessor: "col6",
      sortType: "basic",
    },
    {
      Header: "وضعیت",
      accessor: "col7",
      sortType: "basic",
    },
    {
      Header: "تایید کننده",
      accessor: "col8",
      sortType: "basic",
    },
    {
      Header: "عملیات",
      accessor: "col9",
      sortType: "basic",
    },
  ]);

  const buttons = (request) => {
    return (
      <Fragment>
        <div className="d-flex flex-wrap justify-content-between">
          <Button> add </Button>
        </div>
      </Fragment>
    );
  };

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    var tableItems = [];
    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        var tableItem = {
          col1: "",
          col2: "",
          col3: "",
          col4: "",
          col5: "",
          col6: "",
          col7: "",
          col8: "",
          col9: "",
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
            col1: "",
            col2: "",
            col3: "",
            col4: "",
            col5: "",
            col6: "",
            col7: "",
            col8: "",
            col9: "",
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
          />{" "}
          به روز رسانی جدول
        </span>
      </Button>
      <section>
        <OverTimeTableItem
          requests={"userCheckoutList"}
          columns={columns}
          data={data}
          onSort={handleSort}
          fetchData={fetchData}
          loading={load}
          pageCount={pageCount}
        />
      </section>
    </div>
  );
};

export default OverTimeTableList;
