import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleReasonLeavingWork } from "../../slices/CheckoutOfficialSlice";
import { handleDepartments, handleReqsList } from "../../slices/mainSlices";
import {
  handleCompaniesCheckout,
  selectDep,
  selectUserMemb,
  selectValueStatus,
  selectFromDate,
  selectToDate,
  selectCompany,
  handlStatusesCheckout,
  selectLeavingWorkCause,
} from "../../slices/CheckoutOfficialSlice";
import TableChackoutLists from "../table/tableChackoutLists/TableChackoutLists";
import Header from "../../../layout/Header/Header";

const CheckoutTable = () => {
  const dispatch = useDispatch();
  const leaver = useSelector(selectUserMemb);
  const status = useSelector(selectValueStatus);
  const fromDate = useSelector(selectFromDate);
  const toDate = useSelector(selectToDate);
  const leavingWorkCause = useSelector(selectLeavingWorkCause);
  const company = useSelector(selectCompany);
  const department = useSelector(selectDep);

  useEffect(() => {
    const filterValues = {
      applicant_id: localStorage.getItem("id"),
      leaver: leaver !== "" ? leaver.value : leaver,
      status: status !== "" ? status.value : status,
      fromDate: fromDate !== null ? fromDate.format("YYYY/MM/DD") : "null",
      toDate: toDate !== null ? toDate.format("YYYY/MM/DD") : "null",
      leavingWorkCause:
        leavingWorkCause !== "" ? leavingWorkCause.value : leavingWorkCause,
      company: company !== "" ? company.value : "",
      department: department !== "" ? department.value : "",
      role: "",
      type: 10,
    };
    console.log(filterValues);
    dispatch(handleReqsList(filterValues));
    dispatch(handleReasonLeavingWork());
    dispatch(handleCompaniesCheckout());
    dispatch(handleDepartments());
    dispatch(handlStatusesCheckout());
  }, [dispatch]);

  return (
    <main>
      <Container fluid>
        <Header />
        <TableChackoutLists />
      </Container>
    </main>
  );
};

export default CheckoutTable;
