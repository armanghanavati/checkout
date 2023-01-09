import React, { Fragment, useEffect } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker2";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetLeavingWork,
  RsetUserCheckoutTable,
  RsetStatusTable,
  selectAllStatus,
  selectFromDate,
  selectLeavingWorkCause,
  selectToDate,
  selectUserMemb,
  selectUserMembers,
  selectValueStatus,
  RsetToDateTable,
  RsetFromDateTable,
  handleGetUsersTable,
  selectAllCompany,
  RsetDepartmantCheckoutTable,
  selectDep,
  RsetCompanyCheckout,
  selectCompany,
} from "../../../../slices/TableCheckoutSlice";
import { selectReasonLeavingData } from "../../../../slices/CheckoutOfficialSlice";
import { selectAllDeps } from "../../../../slices/mainSlices";

const Fields = ({ name, type, lable, key, onchecked, ...allProps }) => {
  const dispatch = useDispatch();
  const userMembers = useSelector(selectUserMembers);
  const userMemb = useSelector(selectUserMemb);
  const reasonLeavingData = useSelector(selectReasonLeavingData);
  const LeavingWorkCause = useSelector(selectLeavingWorkCause);
  const fromDateTime = useSelector(selectFromDate);
  const toDateTime = useSelector(selectToDate);
  const allStatus = useSelector(selectAllStatus);
  const valueStatus = useSelector(selectValueStatus);
  const allCompany = useSelector(selectAllCompany);
  const allDeps = useSelector(selectAllDeps);
  const dep = useSelector(selectDep);
  const company = useSelector(selectCompany);

  // let pushAllCompany = [];
  // let getAllDep = [];
  // getAllDep.push({ value: "", label: "همه" });
  // allDeps.map((dep) => {
  //   return getAllDep.push({
  //     value: dep.DeptCode,
  //     label: dep.DeptName,
  //   });
  // });

  // const {
  //   gotoPage,
  //   state: { pageIndex, pageSize, sortBy },
  // } = useTable();

  console.log(dep);

  const fildsSection = () => {
    if (name === "applicant") {
      return (
        <Select
          value={userMemb}
          onChange={(e) => {
            dispatch(RsetUserCheckoutTable(e));
            // gotoPage(0);

            if (onchecked) {
              dispatch(handleGetUsersTable());
            }
          }}
          options={userMembers}
          {...allProps}
          className="mb-4 mb-xl-4 col-12 col-sm-12 col-md-12 col-md-4 w-100"
        />
      );
    } else if (name === "fromDate") {
      return (
        <DatePicker
          inputReadOnly
          className="form-control mb-4 mb-xl-0 col-12 col-sm-12 col-md-12 col-md-4"
          value={fromDateTime}
          onChange={(e) => {
            dispatch(RsetFromDateTable(e));
            console.log(fromDateTime);
          }}
          {...allProps}
        />
      );
    } else if (name === "toDate") {
      return (
        <DatePicker
          inputReadOnly
          className="form-control mb-4 mb-xl-0 col-12 col-sm-12 col-md-12 col-md-4"
          value={toDateTime}
          onChange={(e) => dispatch(RsetToDateTable(e))}
          {...allProps}
        />
      );
    } else if (name === "reasonLeavingCase") {
      return (
        <Select
          {...allProps}
          className="mb-4"
          value={LeavingWorkCause}
          options={reasonLeavingData}
          onChange={(e) => {
            dispatch(RsetLeavingWork(e));
            if (onchecked) {
              dispatch(handleGetUsersTable());
            }
          }}
        />
      );
    } else if (name === "company") {
      return (
        <Select
          {...allProps}
          className=""
          value={company}
          options={allCompany}
          onChange={(e) => {
            dispatch(RsetCompanyCheckout(e));
            if (onchecked) {
              dispatch(RsetCompanyCheckout());
            }
          }}
        />
      );
    } else if (name === "department") {
      return (
        <Select
          {...allProps}
          className=""
          value={dep}
          options={allDeps}
          onChange={(e) => {
            dispatch(RsetDepartmantCheckoutTable(e));
            if (onchecked) {
              dispatch(handleGetUsersTable());
            }
          }}
        />
      );
    } else if (name === "status") {
      return (
        <Select
          options={allStatus}
          onChange={(e) => {
            dispatch(RsetStatusTable(e));
            if (onchecked) {
              dispatch(handleGetUsersTable());
            }
          }}
          value={valueStatus}
          {...allProps}
          className="mb-4 mb-xl-0 col-12 col-sm-12 col-md-12 col-md-4 w-100"
        />
      );
    }
  };

  return (
    <Fragment>
      <Form.Label className=" mb-1 form-label">{lable}</Form.Label>
      {fildsSection()}
    </Fragment>
  );
};

export default Fields;
