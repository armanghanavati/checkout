import { faPaperclip, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Table, Button, Row, Col, Container, Form } from "react-bootstrap";
import DatePicker from "react-datepicker2";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import ExpensesAccountModal from "../../../Modals/expensesAccount/ExpensesAccountModal";
import {
  RsetDateExAcTable,
  RsetDesExAcTable,
  RsetExpensesNumb,
  RsetExpensesTable,
  RsetFilterItems,
  RsetItemId,
  RsetListItems,
  selectDesExAc,
  selectDesExAcTable,
  selectFilterItems,
  selectItemId,
  selectListItems,
  selectReqFiles,
} from "../../../slices/expencesAccountSlice";
import Num2persian from "num2persian";

const ExpensesAccountItem = () => {
  const dispatch = useDispatch();
  const listItems = useSelector(selectListItems);
  const filterItemModal = useSelector(selectFilterItems);
  const itemId = useSelector(selectItemId);
  const reqFiles = useSelector(selectReqFiles);
  const desExAcTable = useSelector(selectDesExAcTable);
  // function Test_2() {
  //   listItems.map((item, index) => {
  //     console.log(item.description);
  //     return item;
  //   });
  // }

  // const testObj = new Test_2();

  // console.log(test);

  const handleDesTable = (e, id) => {
    var items = [...listItems];
    const index = items.findIndex((item) => id === item.id);
    const item = { ...items[index] };
    item.description = e.target.value;
    const allItems = [...items];
    allItems[index] = item;
    dispatch(RsetListItems(allItems));
  };

  const handleDateTable = (e, id) => {
    const items = [...listItems];
    const indexItems = items.findIndex((item) => id === item.id);
    const item = { ...items[indexItems] };
    item.date = e;
    const allDate = [...items];
    allDate[indexItems] = item;
    dispatch(RsetListItems(allDate));
  };

  const handleExpensesTable = (e, id) => {
    const items = [...listItems];
    const indexItems = items.findIndex((item) => id === item.id);
    const item = { ...items[indexItems] };
    item.expenses = e.target.value;

    const allItems = [...items];
    allItems[indexItems] = item;
    dispatch(RsetListItems(allItems));
  };

  const mapReq = listItems.map((item) => {
    var data = item.expenses.replace(/,/g, "");
    data = Number(data);
    return data;
  });

  const sum = mapReq.reduce((a, b) => a + b, 0);
  console.log();

  return (
    <Table striped bordered hover responsive size="sm" className="">
      <thead>
        <tr>
          <th className="bg-secondary text-white fw-normal">ردیف</th>
          <th className="bg-secondary text-white fw-normal">شرح</th>
          <th className="bg-secondary text-white fw-normal">تاریخ</th>
          <th className="bg-secondary text-white fw-normal">فایل</th>
          <th className="bg-secondary text-white fw-normal">مبلغ</th>
          <th className="bg-secondary text-white fw-normal">عملیات</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {listItems.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <Form.Control
                  className="form-control"
                  defaultValue={item.description}
                  onChange={(e) => handleDesTable(e, item.id)}
                />
              </td>
              <td>
                <DatePicker
                  value={item.date}
                  onChange={(e) => handleDateTable(e, item.id)}
                  persianDigits={true}
                  isGregorian={false}
                  timePicker={false}
                  inputFormat="YYYY/MM/DD"
                  inputJalaaliFormat="jYYYY/jMM/jDD"
                  className="form-control"
                />
              </td>
              <td>
                {item.file.length !== 0 && (
                  <FontAwesomeIcon
                    className="font20 cursorPointer align-items-center"
                    icon={faPaperclip}
                  />
                )}
              </td>
              <td>
                <NumberFormat
                  isAllowed={(values) => {
                    const { floatValue } = values;
                    return (
                      floatValue === undefined || floatValue < 999000000000000
                    );
                  }}
                  thousandSeparator=","
                  className="form-control"
                  onChange={(e) => {
                    handleExpensesTable(e, item.id);
                  }}
                  defaultValue={item.expenses}
                />
              </td>
              <td>
                <FontAwesomeIcon
                  onClick={() => {
                    dispatch(RsetFilterItems(true));
                    dispatch(RsetItemId(item.id));
                  }}
                  className="text-danger cursorPointer align-items-center"
                  icon={faTrashCan}
                />
                {filterItemModal ? (
                  <ExpensesAccountModal itemId={itemId} />
                ) : null}
              </td>
            </tr>
          );
        })}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <div className="d-flex align-items-center mb-3 flex-wrap">
              <label className="font12"> جمع مبالغ:</label>
              <NumberFormat
                thousandSeparator=","
                className="form-control"
                disabled
                value={sum}
                dir="ltr"
              />
            </div>
            <div className=" font12 text-end">{Num2persian(sum)} ریال</div>
          </td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ExpensesAccountItem;
