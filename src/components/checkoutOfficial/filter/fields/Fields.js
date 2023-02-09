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
  selectToDate,
  selectUserMemb,
  selectValueStatus,
  RsetToDateTable,
  RsetFromDateTable,
  selectAllCompany,
  RsetDepartmantCheckoutTable,
  selectDep,
  RsetCompanyCheckout,
  selectCompany,
  selectLeavingWorkCause,
} from "../../../slices/CheckoutOfficialSlice";
import { selectReasonLeavingData } from "../../../slices/CheckoutOfficialSlice";
import {
  handleReqsList,
  selectAllDeps,
  selectRequestMemb,
} from "../../../slices/mainSlices";

const Fields = ({ name, type, lable, key, onchecked, ...allProps }) => {
  const dispatch = useDispatch();
  const userMembers = useSelector(selectRequestMemb);
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

  const filterValues = {
    applicant_id: localStorage.getItem("id"),
    leaver: userMemb !== "" ? userMemb.value : userMemb,
    status: valueStatus !== "" ? valueStatus.value : valueStatus,
    fromDate:
      fromDateTime !== null ? fromDateTime.format("YYYY/MM/DD") : "null",
    toDate: toDateTime !== null ? toDateTime.format("YYYY/MM/DD") : "null",
    leavingWorkCause:
      LeavingWorkCause !== "" ? LeavingWorkCause.value : LeavingWorkCause,
    company: company !== "" ? company.value : "",
    department: dep !== "" ? dep.value : "",
    role: "",
    type: 10,
  };

  console.log(company);

  let addAllDepartment = []
  const objectAll = addAllDepartment.push({ label: "همه", value: "" })

  const mapDeps = allDeps.map((dep) => addAllDepartment.push({ label: dep.label, value: dep.value }))

  const fildsSection = () => {
    if (name === "applicant") {
      return (
        <Select
          value={userMemb}
          onChange={(e) => {
            dispatch(RsetUserCheckoutTable(e));
            if (onchecked) {
              const filterValues = {
                applicant_id: localStorage.getItem("id"),
                leaver: e !== "" ? e.value : e,
                status: valueStatus !== "" ? valueStatus.value : valueStatus,
                fromDate:
                  fromDateTime !== null
                    ? fromDateTime.format("YYYY/MM/DD")
                    : "null",
                toDate:
                  toDateTime !== null
                    ? toDateTime.format("YYYY/MM/DD")
                    : "null",
                leavingWorkCause:
                  LeavingWorkCause !== ""
                    ? LeavingWorkCause.value
                    : LeavingWorkCause,
                company: company !== "" ? company.value : "",
                department: dep !== "" ? dep.value : "",
                role: "",
                type: 10,
              };
              dispatch(handleReqsList(filterValues));
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
            if (onchecked) {
              const filterValues = {
                applicant_id: localStorage.getItem("id"),
                leaver: userMemb !== "" ? userMemb.value : userMemb,
                status: valueStatus !== "" ? valueStatus.value : valueStatus,
                fromDate: e !== null ? e.format("YYYY/MM/DD") : "null",
                toDate:
                  toDateTime !== null
                    ? toDateTime.format("YYYY/MM/DD")
                    : "null",
                leavingWorkCause:
                  LeavingWorkCause !== ""
                    ? LeavingWorkCause.value
                    : LeavingWorkCause,
                company: company !== "" ? company.value : "",
                department: dep !== "" ? dep.value : "",
                role: "",
                type: 10,
              };
              dispatch(handleReqsList(filterValues));
            }
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
          onChange={(e) => {
            dispatch(RsetToDateTable(e));
            if (onchecked) {
              const filterValues = {
                applicant_id: localStorage.getItem("id"),
                leaver: userMemb !== "" ? userMemb.value : userMemb,
                status: valueStatus !== "" ? valueStatus.value : valueStatus,
                fromDate:
                  fromDateTime !== null
                    ? fromDateTime.format("YYYY/MM/DD")
                    : "null",
                toDate: e !== null ? e.format("YYYY/MM/DD") : "null",
                leavingWorkCause:
                  LeavingWorkCause !== ""
                    ? LeavingWorkCause.value
                    : LeavingWorkCause,
                company: company !== "" ? company.value : "",
                department: dep !== "" ? dep.value : "",
                role: "",
                type: 10,
              };
              dispatch(handleReqsList(filterValues));
            }
          }}
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
              const filterValues = {
                applicant_id: localStorage.getItem("id"),
                leaver: userMemb !== "" ? userMemb.value : userMemb,
                status: valueStatus !== "" ? valueStatus.value : valueStatus,
                fromDate:
                  fromDateTime !== null
                    ? fromDateTime.format("YYYY/MM/DD")
                    : "null",
                toDate:
                  toDateTime !== null
                    ? toDateTime.format("YYYY/MM/DD")
                    : "null",
                leavingWorkCause: e !== "" ? e.value : e,
                company: company !== "" ? company.value : "",
                department: dep !== "" ? dep.value : "",
                role: "",
                type: 10,
              };
              dispatch(handleReqsList(filterValues));
            }
          }}
        />
      );
    } else if (name === "company") {
      return (
        <Select
          {...allProps}
          className="mb-4"
          value={company}
          options={allCompany}
          onChange={(e) => {
            dispatch(RsetCompanyCheckout(e));
            if (onchecked) {
              const filterValues = {
                applicant_id: localStorage.getItem("id"),
                leaver: userMemb !== "" ? userMemb.value : userMemb,
                status: valueStatus !== "" ? valueStatus.value : valueStatus,
                fromDate:
                  fromDateTime !== null
                    ? fromDateTime.format("YYYY/MM/DD")
                    : "null",
                toDate:
                  toDateTime !== null
                    ? toDateTime.format("YYYY/MM/DD")
                    : "null",
                leavingWorkCause:
                  LeavingWorkCause !== ""
                    ? LeavingWorkCause.value
                    : LeavingWorkCause,
                company: e !== "" ? e.value : e,
                department: dep !== "" ? dep.value : "",
                role: "",
                type: 10,
              };
              dispatch(handleReqsList(filterValues));
            }
          }}
        />
      );
    } else if (name === "department") {
      return (
        <Select
          {...allProps}
          className="mb-4"
          value={dep}
          options={addAllDepartment}
          onChange={(e) => {
            dispatch(RsetDepartmantCheckoutTable(e));
            if (onchecked) {
              const filterValues = {
                applicant_id: localStorage.getItem("id"),
                leaver: userMemb !== "" ? userMemb.value : userMemb,
                status: valueStatus !== "" ? valueStatus.value : valueStatus,
                fromDate:
                  fromDateTime !== null
                    ? fromDateTime.format("YYYY/MM/DD")
                    : "null",
                toDate:
                  toDateTime !== null
                    ? toDateTime.format("YYYY/MM/DD")
                    : "null",
                leavingWorkCause:
                  LeavingWorkCause !== ""
                    ? LeavingWorkCause.value
                    : LeavingWorkCause,
                company: company !== "" ? company.value : "",
                department: e !== "" ? e.value : e,
                role: "",
                type: 10,
              };
              dispatch(handleReqsList(filterValues));
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
              const filterValues = {
                applicant_id: localStorage.getItem("id"),
                leaver: userMemb !== "" ? userMemb.value : userMemb,
                status: e !== "" ? e.value : e,
                fromDate:
                  fromDateTime !== null
                    ? fromDateTime.format("YYYY/MM/DD")
                    : "null",
                toDate:
                  toDateTime !== null
                    ? toDateTime.format("YYYY/MM/DD")
                    : "null",
                leavingWorkCause:
                  LeavingWorkCause !== ""
                    ? LeavingWorkCause.value
                    : LeavingWorkCause,
                company: company !== "" ? company.value : "",
                department: dep !== "" ? dep.value : "",
                role: "",
                type: 10,
              };
              dispatch(handleReqsList(filterValues));
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
