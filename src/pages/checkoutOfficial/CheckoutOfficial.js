import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import Select from "react-select";
import { Button, Form } from "react-bootstrap";
import SearchBtn from "./searchBtn/SearchBtn";
import {
  loginInfo,
  fetchAsyncMeliCode,
} from "../../components/checkoutOfficialSlice/CheckoutOfficialSlice";
import {
  getAllUsersByPersonalCode,
  getUser,
  postUserDataCheckout,
  getReasonLeavingWork,
  postAction,
  userInfo,
} from "../../common/services";
import { ToastContainer, toast } from "react-toastify";
import "./style.css";
import DatePicker from "react-datepicker2";

const CheckoutOfficial = (props) => {
  const reasonLeavingInputRef = useRef();
  const dispatch = useDispatch();
  const [time, setTime] = useState(null);
  const [userName, setUserName] = useState({});
  const [reasonLeavingWork, setReasonLeavingWork] = useState({});
  const [reasonData, setReasonData] = useState([]);
  const [personalCode, setPersonalCode] = useState("");
  const [meliCode, setMeliCode] = useState("");
  const [description, setDescription] = useState("");
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [getApi, setGetApi] = useState({});

  // const userData = useSelector(loginInfo);

  const fetchAsyncMeliCode = async () => {
    try {
      const resUserInfo = await userInfo();
      console.log(resUserInfo.data);
      localStorage.setItem("id", resUserInfo.data._id);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleGetAllUsers = async () => {
    try {
      const usersRes = await getAllUsersByPersonalCode(
        userData.company.CompanyCode,
        userData.location
      );
      console.log(getAllUsersByPersonalCode());
      setUsers(usersRes.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleGetReasonLeavingWork = async () => {
    try {
      const reasonLeavingRes = await getReasonLeavingWork();
      console.log(reasonLeavingRes);
      setReasonData(reasonLeavingRes.data);
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
      console.log(userRes);

      if (userRes.length !== 0) {
        setTest(userRes.data[0].manager);
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

  const validationForm = ({ personalCode, meliCode, userName }) => {
    const errors = {};
    if (!meliCode) {
      errors.meliCode = "لطفا فیلد را بر کنید!";
    }
    if (!personalCode) {
      errors.personalCode = "لطفا فیلد را بر کنید!";
    }
    if (!userName) {
      errors.userName = "لطفا فیلد را بر کنید!";
    }
    return errors;
  };

  const timerHandler = (e) => {
    setTime(e);
    console.log(e);
  };

  const handlePostReasonLeaving = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (userName && personalCode && meliCode) {
      try {
        const checkoutValues = {
          user_id: userName.value,
          description: description,
          leavingWorkCause: reasonLeavingWork.value,
          leavingWorkDate: time,
        };
        console.log(checkoutValues);
        const userPostReasonLeavingRes = await postUserDataCheckout(
          checkoutValues
        );
        console.log(userPostReasonLeavingRes.data);
        if (userPostReasonLeavingRes.data.code === 415) {
          const ActionValues = {
            action_id: userPostReasonLeavingRes.data.id,
            action_code: 0,
            user_id: localStorage.getItem("id"),
            toPerson: test,
            type: 10,
          };
          console.log(ActionValues);
          const actionRes = await postAction(ActionValues);
          if (actionRes.data.code === 415) {
            setMeliCode("");
            setPersonalCode("");
            setDescription("");
            setReasonLeavingWork("");
            setUserName("");
            toast("درخواست با موفقیت ثبت شد!");
          }
        }
      } catch (ex) {
        console.log(ex);
      }
    } else {
      setFormErrors(validationForm(personalCode, meliCode, userName));
      toast(" ثبت درخواست تسویه حساب انجام نشد! لطفا دوباره امتحان کنید.");
    }
  };

  useEffect(() => {
    handleGetReasonLeavingWork();
    handleGetAllUsers();
    fetchAsyncMeliCode();
    console.log(handleGetAllUsers());
  }, []);

  useEffect(() => {
    reasonLeavingInputRef.current.focus();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(personalCode, meliCode, userName);
    }
  }, [formErrors]);

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
      <Form className="form-group" onSubmit={handlePostReasonLeaving}>
        <div className="row">
          <div className="mb-4 col-12 col-sm-12  col-md-6  col-lg-3  col-xl-3">
            <label className="mb-1 required-field form-label">
              نام و نام خانوادگی:{" "}
            </label>
            <Select
              value={userName}
              options={users}
              placeholder="جستوجو . . ."
              onChange={(e) => {
                console.log(e.value);
                setUserName(e);
                setMeliCode("");
                setPersonalCode("");
              }}
            />
            <p className="font12 text-danger mb-0"> {formErrors.userName} </p>
          </div>
          <div className="mb-4 col-12 col-sm-12  col-md-6  col-lg-3  col-xl-3">
            <label className="mb-1 required-field form-label"> کد ملی: </label>
            <NumberFormat
              className="form-control"
              value={meliCode}
              onChange={meliCodeHandler}
              name="meliCode"
              format="##########"
            />
            <p className="font12 text-danger mb-0"> {formErrors.meliCode} </p>
          </div>
          <div className="mb-4 col-8 col-sm-8  col-md-6  col-lg-3  col-xl-3">
            <label className="mb-1 required-field form-label">
              کد پرسنلی:{" "}
            </label>
            <NumberFormat
              className="form-control "
              name="personalCode"
              value={personalCode}
              onChange={personalCodeHandler}
              format="#######"
            />
            <p className="font12 text-danger mb-0">{formErrors.personalCode}</p>
          </div>
          <SearchBtn handleGetUser={handleGetUser} />
          <div className="mb-4 col-12 col-sm-12  col-md-6  col-lg-4  col-xl-3">
            <label htmlFor="">علت ترک کار : </label>
            <Select
              ref={reasonLeavingInputRef}
              value={reasonLeavingWork}
              options={reasonData}
              onChange={(e) => setReasonLeavingWork(e)}
              placeholder="جستوجو . . ."
            />
          </div>
          <div className="mb-4 col-12 col-sm-12 col-md-12  col-lg-6  col-xl-6">
            <label>تاریخ خروج : </label>
            <div className="col-12 col-md-6">
              <DatePicker
                className="form-control"
                persianDigits={true}
                value={time}
                onChange={timerHandler}
                isGregorian={false}
                timePicker={false}
                inputFormat="YYYY-M-D"
                inputJalaaliFormat="jYYYY-jM-jD"
              />
            </div>
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
        </div>
        <div className="row">
          <div className="mx-auto d-flex justify-content-between mt-4 col-xl-4 col-md-5">
            <button
              type="submit"
              className="w-45 btn btn-success text-center my-5"
            >
              تایید
            </button>
            <Button className="w-45 btn btn-secondary text-center my-5">
              انصراف
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CheckoutOfficial;
