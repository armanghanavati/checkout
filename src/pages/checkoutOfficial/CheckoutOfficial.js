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
  const [userName, setUserName] = useState("");
  const [personalCode, setPersonalCode] = useState("");
  const [meliCode, setMeliCode] = useState("");

  const [users, setUsers] = useState([]);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleGetAllUsers = async () => {
    try {
      const usersRes = await getAllUsersByPersonalCode(
        userData.company.CompanyCode,
        userData.location
      );
      console.log(usersRes.data);
      setUsers(usersRes.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const [test, setTest] = useState({});
  const handleGetUser = async () => {
    try {
      const values = {
        meliCode: meliCode,
        personelCode: personalCode,
        id: userName,
      };
      console.log(values);
      const userRes = await getUser(values);
      console.log(userRes.data);
      if (userRes.data.length !== 0) {
        console.log(userRes.data[0]);
        setTest(userRes.data[0]);
        setUserName("");
        setPersonalCode("");
        setMeliCode("");
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    if (Object.keys(userName).length === 0 && isSubmit) {
    }
  }, [userName]);

  const validationForm = (value) => {
    const errors = {};
    const regex = /^[^\s@]+[^\s@]+\.[^\s@]{2,}$/i;
    if (!value.userName) {
      if (!value.meliCode) {
        errors.email = "ایمیل علط است";
      } else if (!regex.test(value.email)) {
        errors.email = "این ایمیل صحیح نمباشد";
      }
      return errors;
    }
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    setFormError(
      validationForm({
        userName,
        personalCode,
        meliCode,
      })
    );
    setIsSubmit(true);
    const enteredUserName = userNameInputRef.current.value;
    const enteredMeliCode = meliCodeInputRef.current.value;
    const enteredPersonalCode = personalCodeInputRef.current.value;

    const checkoutData = {
      userName: enteredUserName,
      meliCode: enteredMeliCode,
      personalCode: enteredPersonalCode,
    };

    props.addCheckout(checkoutData);
  };

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
    handleGetUser();
  }, [userData]);

  return (
    <div className="container">
      <div className="row">
        <DateComponent className="form-control" />
        <Form className="form-group">
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

          <div className="col-12">
            <span>نام و نام خانوادگی: </span>
            <span>
              {test.first_name !== undefined
                ? test.first_name + " " + test.last_name
                : ""}
            </span>
            <span>کد ملی: </span>
            <span>{test.user_name !== undefined ? test.user_name : ""}</span>
            <span>کد پرسنلی: </span>
            <span>
              {test.personelCode !== undefined ? test.personelCode : ""}
            </span>
          </div>
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
