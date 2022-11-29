import React from "react";
import { Container } from "react-bootstrap";
import FieldsTableCheckout from "../../components/tableChackoutLists/fieldsTableCheckout/FieldsTableCheckout";
import PageShows from "../../components/tableChackoutLists/fieldsTableCheckout/pageShows/PageShows";
import TableChackoutLists from "../../components/tableChackoutLists/tableChackoutLists/TableChackoutLists";

const CheckoutList = () => {
  return (
    <main>
      <Container fluid>
        <FieldsTableCheckout />
        {/* <TableChackoutLists /> */}
        <PageShows />
      </Container>
    </main>
  );
};

export default CheckoutList;
