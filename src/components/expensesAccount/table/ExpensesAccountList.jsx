import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import ExpensesAccountModal from "../modals/ExpensesAccountModal";
import { selectListItems } from "../../slices/expencesAccountSlice";
import ExpensesAccountItem from "./Item/ExpensesAccountItem";

const ExpensesAccountList = () => {
  const dispatch = useDispatch();
  const listItems = useSelector(selectListItems);

  return (
    <div className="my-4">
      {listItems.length !== 0 ? <ExpensesAccountItem /> : null}
    </div>
  );
};

export default ExpensesAccountList;
