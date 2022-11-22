import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import DateComponent from "../../assets/date/DateComponent";
import Select from "react-select";
import { Button, Form } from "react-bootstrap";
import SearchBtn from "./searchBtn/SearchBtn";
import { loginInfo } from "../../components/checkoutOfficialSlice/CheckoutOfficialSlice";
import { getAllUsersByPersonalCode, getUser } from "../../common/services";

const CheckoutOfficial = (props) => {
  const userData = useSelector(loginInfo);
  const userNameInputRef = useRef();
  const meliCodeInputRef = useRef();
  const personalCodeInputRef = useRef();

  const [onDisabled, setOnDisabled] = useState({
    userName: false,
    meliCode: false,
    personalCode: false,
  });

  const meliCodeHandler = (e) => {
    if (e.target.value.length > 0) {
      setOnDisabled({
        userName: true,
        personalCode: true,
      });
    } else {
      setOnDisabled({
        userName: false,
        personalCode: false,
      });
    }
    setMeliCode(e.target.value);
  };
  const personalCodeHandler = (e) => {
    if (e.target.value.length > 0) {
      setOnDisabled({
        userName: true,
        meliCode: true,
      });
    } else {
      setOnDisabled({
        userName: false,
        meliCode: false,
      });
    }
    setPersonalCode(e.target.value);
  };
  const userNameHandler = (event) => {
    setUserName(event.value);
    if (event) {
      setOnDisabled({
        personalCode: true,
        meliCode: true,
      });
    } else {
      setOnDisabled({
        personalCode: false,
        meliCode: false,
      });
      setUserName({ userName: event.value });
    }
    return event;
  };

  useEffect(() => {
    handleGetAllUsers();
    // handleGetUser();
  }, [userData]);

  return (
    <div className="container">
      <div className="row">
        <DateComponent className="form-control" />
        {Object.keys(userName).length === 0 && isSubmit ? (
          <div> Sussesfully </div>
        ) : (
          console.log("Error in sub")
        )}
        <Form className="form-group" onSubmit={SubmitHandler}>
          <div className="col-3">
            <label htmlFor=""> نام و نام خانوادگی : </label>
            <Select
              placeholder="جستوجو . . ."
              options={users}
              isDisabled={onDisabled.userName}
              onChange={userNameHandler}
            />
          </div>
          <div className="col-3">
            <label htmlFor=""> کد ملی : </label>
            <NumberFormat
              className="form-control"
              disabled={onDisabled.meliCode}
              ref={meliCodeInputRef}
              value={meliCode}
              onChange={meliCodeHandler}
              name="meliCode"
              format="##########"
            />
          </div>
          <div className="col-3">
            <label htmlFor=""> کد برسنلی : </label>
            <NumberFormat
              className="form-control col-3"
              disabled={onDisabled.personalCode}
              ref={personalCodeInputRef}
              name="personalCode"
              value={personalCode}
              onChange={personalCodeHandler}
              format="#######"
            />
          </div>
          <SearchBtn
            personalCode={personalCodeHandler}
            meliCode={meliCodeHandler}
            userName={userNameHandler}
            handleGetUser={handleGetUser}
          />
          <div className="col-6">
            <label htmlFor="">علت خروج : </label>
            <Select placeholder="جستوجو . . ." />
          </div>
          <div>
            <label>تاریخ خروج : </label>
            {/* <DateTodayComponent /> */}
          </div>
          <div className="">
            <label className="py-1" htmlFor="CheckoutTextarea">
              توضیحات :
            </label>
            <textarea className="form-control" id="CheckoutTextarea" rows="3" />
          </div>
          <div className=" col-6 col-md-1 d-flex align-items-end">
            <button className="btn btn-primary text-center my-5">تایید</button>
          </div>
        </Form>
        <div className=" col-6 col-md-1 d-flex align-items-end">
          <Button className="btn btn-danger text-center my-5">انصراف</Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutOfficial;
