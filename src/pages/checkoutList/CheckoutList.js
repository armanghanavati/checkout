import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchHandleGetReasonLeavingWork } from "../../components/checkoutOfficialSlice/CheckoutOfficialSlice";
import {
  fetchAllCompany,
  fetchAllDepartment,
  fetchCurrentReqInfo,
  fetchGetAllStatuses,
  handleGetUsersTable,
} from "../../components/checkoutOfficialSlice/TableCheckoutSlice";
import TableChackoutLists from "../../components/tableChackoutLists/tableChackoutLists/TableChackoutLists";

const CheckoutList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetUsersTable());
    dispatch(fetchGetAllStatuses());
    dispatch(fetchHandleGetReasonLeavingWork());
    dispatch(fetchAllCompany());
    dispatch(fetchAllDepartment());
  }, [dispatch]);

  return (
    <main>
      <Container fluid>
        <TableChackoutLists />
      </Container>
    </main>
  );
};

export default CheckoutList;
