import React from "react";
import Header from "../../../layout/Header/Header";
import ExpensesAccountFilter from "../filter/ExpensesAccountFilter";

const ExpensesAccountTable = () => {
  return (
    <div>
      <Header />
      <ExpensesAccountFilter />
    </div>
  );
};

export default ExpensesAccountTable;
