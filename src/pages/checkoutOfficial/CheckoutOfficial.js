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

  const [userName, setUserName] = useState({});
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
        id: userName.value,
      };
      // console.log(userRes.data[values]);
      console.log(values);
      const userRes = await getUser(values);
      console.log(userRes.data);

      console.log(values);
      console.log(userRes.data.length);
      console.log(Object.keys(userRes.data));
      console.log(users);

      if (Object.keys(userRes.data) !== 0) {
        setTest(userRes.data[0]);
        setUserName({
          value: userRes.data[0]._id,
          label: userRes.data[0].first_name + " " + userRes.data[0].last_name,
        });
        setPersonalCode(userRes.data[0].personelCode);
        setMeliCode(userRes.data[0].user_name);
      } else {
        alert("کاربر یافت نشد!");
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

  useEffect(() => {
    handleGetAllUsers();
  }, [userData]);

  return (
    <div className="container">
      <DateComponent className="form-control" />
      <Form className="form-group">
        <div className="row">
          <div className="col-3">
            <label htmlFor=""> نام و نام خانوادگی : </label>
            <Select
              value={userName}
              placeholder="جستوجو . . ."
              options={users}
              onChange={(e) => {
                setUserName(e);
                setMeliCode("");
                setPersonalCode("");
              }}
            />
          </div>
          <div className="col-3">
            <label htmlFor=""> کد ملی : </label>
            <NumberFormat
              className="form-control"
              ref={meliCodeInputRef}
              value={meliCode}
              onChange={(e) => setMeliCode(e.target.value)}
              name="meliCode"
              format="##########"
            />
          </div>
          <div className="col-3">
            <label htmlFor=""> کد برسنلی : </label>
            <NumberFormat
              className="form-control col-3"
              ref={personalCodeInputRef}
              name="personalCode"
              value={personalCode}
              onChange={(e) => setPersonalCode(e.target.value)}
              format="#######"
            />
          </div>
          <SearchBtn handleGetUser={handleGetUser} />

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
          <div className=" col-6 col-md-1 d-flex align-items-end">
            <Button className="btn btn-danger text-center my-5">انصراف</Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CheckoutOfficial;
