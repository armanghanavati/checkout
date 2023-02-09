import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleReasonLeavingWork } from "../../slices/CheckoutOfficialSlice";
import { handleDepartments, handleReqsList, selectReqsList, selectUserLogin } from "../../slices/mainSlices";
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

const CheckoutTable = () => {
  const dispatch = useDispatch();
  const leaver = useSelector(selectUserMemb);
  const status = useSelector(selectValueStatus);
  const fromDate = useSelector(selectFromDate);
  const toDate = useSelector(selectToDate);
  const leavingWorkCause = useSelector(selectLeavingWorkCause);
  const company = useSelector(selectCompany);
  const department = useSelector(selectDep);
  const userCheckoutList = useSelector(selectReqsList);
  const userLogin = useSelector(selectUserLogin);
  console.log(userCheckoutList);

  useEffect(() => {
    dispatch(handleReasonLeavingWork());
    dispatch(handleCompaniesCheckout());
    dispatch(handlStatusesCheckout());
  }, [dispatch]);

  useEffect(() => {
    function departmentListReturn() {
      if (userLogin.first_name !== undefined && userLogin.length !== 0) {
        return dispatch(handleDepartments());
      }
    }
    departmentListReturn()

  }, [userLogin])

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
    }
    dispatch(handleReqsList(filterValues));
  }, [])

  return (
    <main>
      <Container fluid>
        <TableChackoutLists />
      </Container>
    </main>
  );
};

export default CheckoutTable;
