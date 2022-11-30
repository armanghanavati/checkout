import React, { Fragment, useCallback, useMemo, useState, useRef } from "react";
import TableCheckOutItems from "./TableCheckOutItems";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const CheckoutList = () => {
    
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);
  const columns = useMemo(() => [
    {
      Header: "ستون اول",
      accessor: "col1",
      sortType: "basic",
    },
    {
      Header: "ستون دوم",
      accessor: "col2",
      sortType: "basic",
    },
    {
      Header: "ستون سوم",
      accessor: "col3",
      sortType: "basic",
    },
    {
      Header: "ستون چهارم",
      accessor: "col4",
      sortType: "basic",
    },
    {
      Header: "ستون پنجم",
      accessor: "col5",
      sortType: "basic",
    },
    {
      Header: "ستون ششم",
      accessor: "col6",
      sortType: "basic",
    },
  ]);
  const buttons = () => {
    return (
      <Fragment>
        <button>hi</button>
        <button>hi2</button>
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
            col1: "",
            col2: "",
            col3: "",
            col4: "",
            col5: "",
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
          requests="reqs drom api"
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

export default CheckoutList;
