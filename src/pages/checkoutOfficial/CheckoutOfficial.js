import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import Select from "react-select";
import { Button, Form } from "react-bootstrap";
import SearchBtn from "./searchBtn/SearchBtn";
import { loginInfo } from "../../components/checkoutOfficialSlice/CheckoutOfficialSlice";
import { getAllUsersByPersonalCode, getUser } from "../../common/services";
import DateTodayComponent from "../../components/date/DateTodayComponent";
import reasonItems from "../../components/reasonLeaving/ReasonLeaving";
import { ToastContainer, toast } from "react-toastify";

const CheckoutOfficial = (props) => {
  const reasonLeavingInputRef = useRef();

  const [userName, setUserName] = useState({});
  const [personalCode, setPersonalCode] = useState("");
  const [meliCode, setMeliCode] = useState("");
  const [description, setDescription] = useState("");

  const userData = useSelector(loginInfo);
  const [users, setUsers] = useState([]);
  const [reasonLeavingItems, setReasonLeavingItems] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [getApi, setGetApi] = useState({});

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
        id: userName.value !== undefined ? userName.value : "",
      };
      const userRes = await getUser(values);
      // console.log(userRes.data);
      // console.log(userRes.data[values]);
      // console.log(values);
      // console.log(userRes.data.length);
      // console.log(userRes.data[0].user_name);
      // console.log(Object.keys(userRes.data[0]));
      // console.log(users);
      setFormErrors(validationForm(personalCode, meliCode));

      if (userName || meliCode || personalCode) {
        setTest(userRes.data[0]);
        setUserName({
          value: userRes.data[0]._id,
          label: userRes.data[0].first_name + " " + userRes.data[0].last_name,
        });
        setPersonalCode(userRes.data[0].personelCode);
        setMeliCode(userRes.data[0].user_name);
      } else {
        alert("user alert");
        toast("کاربر یافت نشد");
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const validationForm = ({ personalCode, meliCode }) => {
    const errors = {};
    if (!meliCode) {
      errors.meliCode = "لطفا فیلد را بر کنید";
    }
    if (!personalCode) {
      errors.personalCode = "لطفا فیلد را بر کنید";
    }
    return errors;
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validationForm({ personalCode, meliCode }));
    setIsSubmit(true);
    if (userName && personalCode && meliCode) {
      console.log({
        User: userName.label,
        PersonalCode: personalCode,
        MeliCode: meliCode,
        Description: description,
        Reason_Leaving: reasonLeavingItems.label,
      });
    } else {
      // alert("اخطار !");
      toast("کاربر یافت نشد");
    }
  };

  useEffect(() => {
    reasonLeavingInputRef.current.focus();
    handleGetAllUsers();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(personalCode, meliCode);
    }
  }, [userData, formErrors]);

  const meliCodeHandler = (e) => {
    setMeliCode(e.target.value);
    if (e.target.value > 0) {
      setPersonalCode("");
      setUserName("");
    }
  };

  const personalCodeHandler = (e) => {
    setPersonalCode(e.target.value);
    if (e.target.value > 0) {
      setMeliCode("");
      setUserName("");
    }
  };

  return (
    <div className="container">
      <Form className="form-group" onSubmit={SubmitHandler}>
        <div className="row">
          <div className="col-12 col-sm-12  col-md-6  col-lg-3  col-xl-3">
            <label htmlFor=""> نام و نام خانوادگی : </label>
            <span className="text-danger "> * </span>
            <Select
              className=""
              value={userName}
              placeholder="جستوجو . . ."
              options={users}
              onChange={(e) => {
                setUserName(e);
                setMeliCode("");
                setPersonalCode("");
              }}
            />
            {/* <p> {formErrors} </p> */}
          </div>
          <div className="col-12 col-sm-12  col-md-6  col-lg-3  col-xl-3">
            <label htmlFor=""> کد ملی : </label>
            <span className="text-danger"> * </span>
            <NumberFormat
              className="form-control"
              value={meliCode}
              onChange={meliCodeHandler}
              name="meliCode"
              format="##########"
            />
          </div>
          {/* <p> {formErrors} </p> */}
          <div className="col-8 col-sm-8  col-md-6  col-lg-3  col-xl-3">
            <label htmlFor=""> کد برسنلی : </label>
            <span className="text-danger"> * </span>
            <NumberFormat
              className="form-control "
              name="personalCode"
              value={personalCode}
              onChange={personalCodeHandler}
              format="#######"
            />
          </div>
          <SearchBtn handleGetUser={handleGetUser} />
          <div className="col-6 col-sm-6  col-md-6  col-lg-4  col-xl-3">
            <label htmlFor="">علت ترک کار : </label>
            <Select
              ref={reasonLeavingInputRef}
              value={reasonLeavingItems}
              options={reasonItems}
              onChange={(e) => setReasonLeavingItems(e)}
              placeholder="جستوجو . . ."
            />
          </div>
          <div className="col-6 col-sm-12 col-md-12  col-lg-6  col-xl-6">
            <label>تاریخ خروج : </label>
            <DateTodayComponent />
          </div>
          <div className="col-sm-12 col-md-12  col-lg-12  col-xl-12">
            <label className="py-1 " htmlFor="CheckoutTextarea">
              توضیحات :
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              id="CheckoutTextarea"
              rows="5"
            />
          </div>
          <div className="col-3 col-md-2 col-lg-1 col-xl-1 d-flex align-items-center justify-content-center">
            <button
              type="submit"
              className="w-auto btn btn-success text-center my-5"
            >
              تایید
              <ToastContainer />
            </button>
          </div>
          <div className="col-3 col-md-2 col-lg-1 col-xl-1 d-flex align-items-center justify-content-center">
            <Button className="w-auto btn btn-dark text-center my-5">
              انصراف
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CheckoutOfficial;
