import React from "react";
import { useSortBy, useTable } from "react-table";
import { data, columns, secendData } from "../../tableData/TableData";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const CheckoutList = () => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <div className="container">
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
        <div className="">
          <table
            className="table table-sm table-bordered table-hover"
            role="table"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr role="row" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="col-2 bg-secondary text-white fw-normal"
                      role="columnheader"
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
              <tr>
                <td> نمایش از نمایش </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CheckoutList;
