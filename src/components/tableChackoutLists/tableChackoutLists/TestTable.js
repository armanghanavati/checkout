import React, { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";

const TestTable = () => {
  const [products, setProducts] = useState([]);

  //   const fetchTableList = async () => {
  //     const resTableList = await axios.get("").catch((err) => console.log(err));
  //     if (resTableList) {
  //       const produscts = resTableList.data;

  //       console.log("products:", produscts);
  //     }
  //   };

  const columns = useMemo(
    () => [
      { Header: "ستون 1", accessor: "ردیف 1" },
      { Header: "ستون 2", accessor: "ردیف 2" },
      { Header: "ستون 3", accessor: "ردیف 3" },
      { Header: "ستون 4", accessor: "ردیف 4" },
      { Header: "ستون 5", accessor: "ردیف 5" },
      { Header: "ستون 6", accessor: "ردیف 6" },
    ],
    []
  );

  const tableInstance = useTable(columns);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps}>
      <thead>
        {headerGroups.map((headerGroup) => {
          return (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <thead {...column.getHeaderProps()}>
                  {column.render("Header")}
                </thead>
              ))}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps}>
        {rows.map((row) => {
          prepareRow(row);
          return row.cells.map((cell, i) => {
            return <td {...cell.getCellProps()}> {cell.render("Cell")} </td>;
          });
        })}
      </tbody>
    </table>
  );
};

export default TestTable;
