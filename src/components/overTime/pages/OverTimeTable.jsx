import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import OverTimeFilter from "../filter/OverTimeFilter";
import {
  handleDepartments,
  handlePermisionPresent,
  handleReqsList,
  patchPermisionChanged,
} from "../../slices/mainSlices";
import {
  selectDepartmant,
  selectEndDate,
  selectStartDate,
  selectStatus,
  selectUserRequestFilter,
} from "../../slices/OverTimeSlice";
import { handlStatusesCheckout } from "../../slices/CheckoutOfficialSlice";
import OverTimeTableList from "../table/OverTimeTableList";
import Header from "../../../layout/Header/Header";

const OverTimeTable = () => {
  const dispatch = useDispatch();
  const members = useSelector(selectUserRequestFilter);
  const dep = useSelector(selectDepartmant);
  const fromDate = useSelector(selectStartDate);
  const toDate = useSelector(selectEndDate);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(handleDepartments());
    const filterValues = {
      applicant_id: localStorage.getItem("id"),
      memberId: members !== "" ? members.value : members,
      mDep: dep !== "" ? dep.value : dep,
      status: status !== "" ? status.value : status,
      fromDate: fromDate !== null ? fromDate.format("YYYY/MM/DD") : "null",
      toDate: toDate !== null ? toDate.format("YYYY/MM/DD") : "null",
      type: 14,
    };
    dispatch(handleReqsList(filterValues));
    dispatch(handlStatusesCheckout());
    dispatch(handlePermisionPresent());
    dispatch(patchPermisionChanged());
  }, [dispatch]);

  return (
    <main>
      <Container fluid>
        <Header />
        <OverTimeFilter />
        <OverTimeTableList />
      </Container>
    </main>
  );
};

export default OverTimeTable;
