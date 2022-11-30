import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import FieldsTableCheckout from "../../components/tableChackoutLists/fieldsTableCheckout/FieldsTableCheckout";
import PageShows from "../../components/tableChackoutLists/fieldsTableCheckout/pageShows/PageShows";
import TableChackoutLists from "../../components/tableChackoutLists/tableChackoutLists/TableChackoutLists";
import TestTable from "../../components/tableChackoutLists/tableChackoutLists/TestTable";

const CheckoutList = () => {
  return (
    <main>
      <Container fluid>
        <FieldsTableCheckout />
        <TableChackoutLists />
        {/* <TestTable /> */}
        {/* <PageShows /> */}
      </Container>
    </main>
  );
};

export default CheckoutList;
