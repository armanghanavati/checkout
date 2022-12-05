import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchHandleGetReasonLeavingWork } from "../../components/checkoutOfficialSlice/CheckoutOfficialSlice";
import { handleGetUsersTable } from "../../components/checkoutOfficialSlice/TableCheckoutSlice";
import TableChackoutLists from "../../components/tableChackoutLists/tableChackoutLists/TableChackoutLists";

const CheckoutList = () => {
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    dispatch(handleGetUsersTable());
    setIsSubmit(false);
    // console.log(dispatch(handleGetUsersTable()));
    dispatch(fetchHandleGetReasonLeavingWork());
  }, [dispatch]);

  return (
    <main>
      <Container fluid>
        <TableChackoutLists isSubmit={isSubmit} />
      </Container>
    </main>
  );
};

export default CheckoutList;
