import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleReasonLeavingWork } from "../../components/slices/CheckoutOfficialSlice";
import { handleDepartments } from "../../components/slices/mainSlices";
import {
  handleCompaniesCheckout,
  handlStatusesCheckout,
  handleGetUsersTable,
} from "../../components/slices/TableCheckoutSlice";
import TableChackoutLists from "../../components/table/tableChackoutLists/tableChackoutLists/TableChackoutLists";

const CheckoutList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetUsersTable());
    dispatch(handlStatusesCheckout());
    dispatch(handleReasonLeavingWork());
    dispatch(handleCompaniesCheckout());
    dispatch(handleDepartments());
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
