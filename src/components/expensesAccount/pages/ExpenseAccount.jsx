import React from "react";
import { Container } from "react-bootstrap";
import ExpenseAccountForm from "../../../components/expensesAccount/form/ExpenseAccountForm";
import Header from "../../../layout/Header/Header";

const ExpenseAccount = () => {

  return (
    <Container fluid>
      <ExpenseAccountForm />
    </Container>
  );
};

export default ExpenseAccount;
