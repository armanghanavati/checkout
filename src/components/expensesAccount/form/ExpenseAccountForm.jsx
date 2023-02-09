import React, { Fragment, useState, useRef, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import DatePicker from "react-datepicker2";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetDateExAc,
  RsetDesExAc,
  RsetErrorForms,
  RsetExpensesNumb,
  RsetFileManager,
  RsetLastNameExAc,
  RsetListItems,
  RsetNameExAc,
  RsetSwitchExAc,
  selectDateExAc,
  selectDesExAc,
  selectExpensesNumb,
  selectFileManager,
  selectFormErrors,
  selectIsDisabled,
  SelectLastName,
  selectListItems,
  SelectName,
  selectSwitchExAc,
  selectDesExAcTable,
  selectFromPlace,
  RsetFromPlace,
  handleExpansesAcc,

} from "../../slices/expencesAccountSlice";
import { handleLogin, handleUserInfoAllPage, selectUserAllPage, selectUserLogin } from "../../slices/mainSlices";
import ExpensesAccountList from "../table/ExpensesAccountList";
import { warningMessage } from "../../../utils/message";

const ExpenseAccountForm = () => {
  const dispatch = useDispatch();
  const switchExAc = useSelector(selectSwitchExAc);
  const userLogin = useSelector(selectUserAllPage);
  const desExAc = useSelector(selectDesExAc);
  const dateExAc = useSelector(selectDateExAc);
  const fileManager = useSelector(selectFileManager);
  const expenses = useSelector(selectExpensesNumb);
  const listItems = useSelector(selectListItems);
  const formErrors = useSelector(selectFormErrors);
  const name = useSelector(SelectName);
  const lastName = useSelector(SelectLastName);

  const [reqFiles, setReqFiles] = useState([]);
  const descriptionInputRef = useRef();
  const dateInputRef = useRef();
  const expensesInputRef = useRef();
  const nameInputRef = useRef();
  const lastNameInputRef = useRef();
  const fromPlaceInputRef = useRef();
  const reqFileInputRef = useRef();
  const pushFileInputRef = useRef();
  const addItemInputRef = useRef();
  const generateRanHex = (size) => {
    let result = [];
    let hexRef = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];
    for (let n = 0; n < size; n++) {
      result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return result.join("");
  };

  const dataValues = {
    description: desExAc,
    date: dateExAc,
    expenses: expenses,
    file: reqFiles,
    id: generateRanHex(24),
  };

  const handleAddItems = (e) => {
    e.preventDefault();
    // console.log(dateInputRef.current);
    // console.log(expensesInputRef.current);
    // console.log(descriptionInputRef);
    // console.log(expenses.current.input.focus());
    // const expensesValidate = Number(expenses) > 1000;
    if (desExAc && dateExAc && expenses) {
      descriptionInputRef.current.focus();
      const arr = [...listItems];
      arr.push(dataValues);
      dispatch(RsetListItems(arr));
      dispatch(RsetDesExAc(""));
      dispatch(RsetDateExAc(null));
      dispatch(RsetFileManager(""));
      dispatch(RsetExpensesNumb(""));
      dispatch(RsetErrorForms(""));
      setReqFiles([]);
    } else {
      if (!desExAc) {
        descriptionInputRef.current.focus();
      } else if (!dateExAc) {
        dateInputRef.current.input.focus();
      }
      dispatch(
        RsetErrorForms(
          validation({
            desExAc: desExAc,
            dateExAc: dateExAc,
            expenses: expenses,
          })
        )
      );
      // descriptionInputRef.current.focus();

      // expensesInputRef.current.focus();

      // if (!dateExAc) {
      //   return dateInputRef.current.focus();
      // }
      // if (!desExAc) {
      //   return descriptionInputRef.current.focus();
      // }
      // if (!expenses) {
      //   return expensesInputRef.current.focus();
      // }
    }
  };

  const validation = ({ desExAc, dateExAc, expenses }) => {
    const errors = {};
    if (!desExAc) {
      errors.desExAc = "وارد کردن شرح الزامی میباشد";
    }
    if (!dateExAc) {
      errors.dateExAc = "لطفا تاریخ را مشخص نمایید";
    }
    console.log(expenses);
    if (expenses === "") {
      errors.expenses = "وارد کردن مبلغ اجباری می باشد!";
    } else if (Number(expenses) <= 1000) {
      errors.expenses = " مبلغ باید بیشتر از 1,000 تومان باشد";
    }
    return errors;
  };

  const handleUploadReqFiles = (e) => {
    e.persist();
    dispatch(RsetFileManager(e.target.files));
    expensesInputRef.current.focus();
  };

  const handleAddFile = () => {
    if (fileManager !== "") {
      reqFiles.push.apply(reqFiles, fileManager);
      dispatch(RsetFileManager(""));
      document.getElementById("reqFile").value = "";
    } else {
      warningMessage("هیچ فایلی انتخاب نشده است.");
    }
  };

  // document.addEventListener("keydown", function (event) {
  //   if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
  //     var form = event.target.form;
  //     var index = Array.prototype.indexOf.call(form, event.target);
  //     form.elements[index + 1].focus();
  //     event.preventDefault();
  //   }
  // });

  const handleEnter = (e) => {
    console.log(e);
    e.which = e.which || e.keyCode;
    if (e.which === 13) {
      switch (e.target.id) {
        case "name":
          lastNameInputRef.current.focus();
          break;
        case "lastName":
          fromPlaceInputRef.current.focus();
          break;
        case "fromPlaceId":
          descriptionInputRef.current.focus();
          break;
        case "descriptionId":
          dateInputRef.current.input.focus();
          break;
        case "dateId":
          dateInputRef.current.focus();
          break;
        case "reqFileId":
          expensesInputRef.current.focus();
          break;
        case "pushFileId":
          pushFileInputRef.current.focus();
          break;
        case "expensesId":
          addItemInputRef.current.focus();
          break;
        case "addItemId":
          descriptionInputRef.current.focus();
          break;
        default:
          break;
      }
      e.preventDefault();
    }
  };

  useEffect(() => {
    function userLoginReturn() {
      if (userLogin.first_name !== undefined) {
        return dispatch(handleUserInfoAllPage())
      }
    }
    userLoginReturn()
  }, [userLogin.first_name !== undefined])

  return (
    <Fragment>
      <Form>
        <Row>
          <Col md="12" className="mt-4 mb-2 d-flex align-items-center">
            <span className="font16">صورت هزینه اعمال شده بنام:</span>
            <div className=" d-flex align-items-center">
              <div>
                <label className="me-2 ms-4">دیگری</label>
                <Form.Check
                  label="خودم"
                  className="d-inline-block m-0"
                  type="switch"
                  checked={switchExAc}
                  onChange={() => {
                    dispatch(RsetSwitchExAc(!switchExAc));
                    if (!switchExAc) {
                      dispatch(RsetNameExAc(userLogin.first_name));
                      dispatch(RsetLastNameExAc(userLogin.last_name));
                    } else {
                      dispatch(RsetNameExAc(""));
                      dispatch(RsetLastNameExAc(""));
                    }
                  }}
                />
              </div>
            </div>
          </Col>
          <Col xl="3">
            <label className=" my-1">نام:</label>
            <Form.Control
              onKeyUp={handleEnter}
              ref={nameInputRef}
              id="name"
              disabled={switchExAc ? true : false}
              value={name}
              onChange={(e) => {
                dispatch(RsetNameExAc(e.target.value));
              }}
              className="mb-4"
            />
          </Col>
          <Col xl="3">
            <label className="mb-1"> نام خانوادگی: </label>
            <Form.Control
              id="lastName"
              onKeyUp={handleEnter}
              tabIndex="14"
              // onKeyDownCapture={(e) => handleEnter(e)}
              ref={lastNameInputRef}
              disabled={switchExAc ? true : false}
              value={lastName}
              onChange={(e) => {
                dispatch(RsetLastNameExAc(e.target.value));
              }}
              className="mb-4"
            />
          </Col>
          <Col xl="3">
            <label className="mb-1">از محل: </label>
            <Form.Control
              ref={fromPlaceInputRef}
              onKeyUp={handleEnter}
              onChange={(e) => dispatch(RsetFromPlace(e.target.value))}
              id="fromPlaceId"
              defaultValue="دفتر مرکزی"
              className="mb-4"
            />
          </Col>
          <hr className="mb-4" />
          <Col md="6" lg="3">
            <label className="required-field mb-1">شرح: </label>
            <Form.Control
              onKeyUp={handleEnter}
              id="descriptionId"
              ref={descriptionInputRef}
              value={desExAc}
              onChange={(e) => dispatch(RsetDesExAc(e.target.value))}
              className={`${formErrors.desExAc && !desExAc
                ? "form-control col-12 col-sm-12 col-md-12 col-md-4 border border-danger"
                : "form-control mb-4 col-12 col-sm-12 col-md-12 col-md-4"
                }`}
            />
            {!desExAc && (
              <p className="font12 text-danger mb-4 mt-1">
                {formErrors.desExAc}
              </p>
            )}
          </Col>
          <Col md="6" lg="2">
            <label className="required-field mb-1">تاریخ: </label>
            <DatePicker
              onKeyUp={handleEnter}
              id="dateId"
              value={dateExAc}
              onChange={(e) => {
                dispatch(RsetDateExAc(e));
                reqFileInputRef.current.focus();
              }}
              inputReadOnly
              ref={dateInputRef}
              persianDigits={true}
              isGregorian={false}
              timePicker={false}
              inputFormat="YYYY/MM/DD"
              inputJalaaliFormat="jYYYY/jMM/jDD"
              className={`${formErrors.dateExAc && !dateExAc
                ? "form-control col-12 col-sm-12 col-md-12 col-md-4 border border-danger"
                : "form-control col-12  col-sm-12 col-md-12 col-md-4"
                }`}
            />
            {!dateExAc && (
              <p className="font12 mb-4 text-danger mt-1">
                {formErrors.dateExAc}
              </p>
            )}
          </Col>
          <Col md="6" className="" lg="3">
            <div className="d-flex align-items-center justify-content-between">
              <label className="mb-1 ">انتخاب فایل: </label>
              <span className="font12">
                {dataValues.file.length !== 0 &&
                  `( ${dataValues.file.length} )`}
              </span>
            </div>
            <div className="d-flex align-items-start">
              <input
                onKeyUp={handleEnter}
                ref={reqFileInputRef}
                type="file"
                // value={fileManager}
                onChange={handleUploadReqFiles}
                className="mb-4 form-control"
                id="reqFileId"
              />

              <Button
                onKeyUp={handleEnter}
                // ref={pushFileInputRef}
                id="pushFileId"
                onClick={handleAddFile}
                className="text-center justify-content-center"
              >
                +
              </Button>
            </div>
          </Col>
          <Col md="6" lg="2" className="">
            <label className="required-field mb-1">مبلغ: </label>
            <div className="d-flex align-items-center">
              <NumberFormat
                id="expensesId"
                onKeyUp={handleEnter}
                type="text"
                getInputRef={expensesInputRef}
                dir="ltr"
                thousandSeparator=","
                name="expenses"
                value={expenses}
                isAllowed={(values) => {
                  const { floatValue } = values;
                  return (
                    floatValue === undefined || floatValue < 999000000000000
                  );
                }}
                onChange={(e) => dispatch(RsetExpensesNumb(e.target.value))}
                className={`${formErrors.expenses && !expenses
                  ? "form-control col-12 col-sm-12 col-md-12 col-md-4 border border-danger"
                  : "form-control col-12 col-sm-12 col-md-12 col-md-4"
                  }`}
              />
              <span className="ms-2">ریال</span>
            </div>
            {validation({
              desExAc: desExAc,
              dateExAc: dateExAc,
              expenses: expenses,
            }) ? (
              <p className="font12 mb-4 text-danger mb-0 mt-1">
                {formErrors.expenses}
              </p>
            ) : null}
          </Col>
          <Col className="d-flex align-items-center">
            <Button
              ref={addItemInputRef}
              id="addItemId"
              onClick={handleAddItems}
              className="ms-4"
              variant="info text-light"
            >
              افزودن آیتم
            </Button>
          </Col>
          {listItems.length > 0 && (
            <ExpensesAccountList listItems={listItems} />
          )}

          <div className="justify-content-center text-center ">
            <Button
              onClick={() => {
                // console.log(Num2persian(1));
                descriptionInputRef.current.focus();
              }}
              variant="info"
              //   disabled={showFields ? false : true}
              className="text-white me-1 col-sm-12 col-md-3 col-xl-2 ms-xl-2 my-1"
            >
              افزودن آیتم جدید
            </Button>

            <Button
              onClick={() => {
                dispatch(RsetListItems([]));
                dispatch(RsetDateExAc(null));
                dispatch(RsetDesExAc(""));
                dispatch(RsetFileManager(""));
                dispatch(RsetExpensesNumb(""));
                dispatch(RsetErrorForms(""));
                setReqFiles([]);
                dispatch(RsetNameExAc(""));
                dispatch(RsetLastNameExAc(""));
                dispatch(RsetFromPlace(""));
              }}
              variant="secondary"
              className="col-sm-12 col-md-3 col-xl-2 me-1 my-1"
            >
              ایجاد صورت هزینه جدید
            </Button>
            <Button
              onClick={() => {
                console.log(listItems);
                if (listItems.length !== 0) {
                  return desExAc && dateExAc && expenses && reqFiles;
                }
                dispatch(handleExpansesAcc())
              }}
              variant="success"
              className="col-sm-12 col-md-3 col-xl-1 text-center ms-xl-4 justify-content-center my-1"
            >
              ثبت
            </Button>
            <Button
              variant="primary"
              //   disabled={showFields ? false : true}
              className="col-sm-12 col-md-3 col-xl-2 ms-xl-2 my-1"
            >
              ارسال به سرپرست / مدیر
            </Button>
          </div>
        </Row>
      </Form >
    </Fragment >
  );
};

export default ExpenseAccountForm;
