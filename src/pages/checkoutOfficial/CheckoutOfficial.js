import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import Select from "react-select";
import { Button, Form } from "react-bootstrap";
import SearchBtn from "./searchBtn/SearchBtn";
import {
  loginInfo,
  fetchAsyncMeliCode,
  addPersonalCode,
  selectPersonalCode,
  clearCode,
  addSubbmit,
  selectSubmit,
  fetchHandleGetReasonLeavingWork,
  selectReasonLeavingData,
  selectReasonLeaving,
  setReasonLeavingHandler,
  selectMeliCode,
  addMeliCode,
  selectUserName,
  addUserName,
  selectAllUserNames,
  fetchGetAllUsers,
  addDescreption,
  selectDescreption,
} from "../../components/checkoutOfficialSlice/CheckoutOfficialSlice";
import {
  getAllUsersByPersonalCode,
  getUser,
  postUserDataCheckout,
  getReasonLeavingWork,
  postAction,
  userInfo,
} from "../../common/services";
import { toast } from "react-toastify";
import "./style.css";
import DatePicker from "react-datepicker2";

const CheckoutOfficial = () => {
  const [time, setTime] = useState(null);
  const [reasonLeavingWork, setReasonLeavingWork] = useState({});
  const [reasonData, setReasonData] = useState([]);
  const [users, setUsers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const reasonLeavingInputRef = useRef();
  const meliCodeInputRef = useRef();
  const personalCodeInputRef = useRef();
  const searchingInputRef = useRef();
  const userNameInputRef = useRef();
  const descriptionInputRef = useRef();
  const dateLeavingInputRef = useRef();

  const dispatch = useDispatch();
  const description = useSelector(selectDescreption);
  const userName = useSelector(selectUserName);
  const personalCode = useSelector(selectPersonalCode);
  const userData = useSelector(loginInfo);
  const meliCode = useSelector(selectMeliCode);
  const reasonLeaving = useSelector(selectReasonLeaving);
  const reasonLeavingData = useSelector(selectReasonLeavingData);
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
  const [officeUser, setOfficeUser] = useState("");

  const handleGetUser = async () => {
    try {
      const values = {
        meliCode: meliCode,
        personelCode: personalCode,
        id: userName.value !== undefined ? userName.value : "",
      };
      console.log(values);
      const userRes = await getUser(values);
      console.log(userRes.data);
      if (userRes.length !== 0) {
        setOfficeUser(userRes.data[0].manager);
        dispatch(
          addUserName({
            value: userRes.data[0]._id,
            label: `${userRes.data[0].first_name} ${userRes.data[0].last_name}`,
          })
        );
        dispatch(addPersonalCode(userRes.data[0].personelCode));
        dispatch(addMeliCode(userRes.data[0].user_name));
      } else {
        alert("user alert");
        toast("کاربر یافت نشد");
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const validationForm = ({
    personalCode,
    meliCode,
    userName,
    reasonLeavingWork,
    time,
  }) => {
    const errors = {};
    if (!personalCode) {
      errors.personalCode = "لطفا کد پرسنلی را مشخص کنید!";
    }
    if (!meliCode) {
      errors.meliCode = "لطفا کد ملی را مشخص کنید!";
    }
    if (!userName) {
      errors.userName = "لطفا نام و نام خانوادگی را انتخاب نمایید!";
    }
    if (!reasonLeavingWork) {
      errors.reasonLeavingWork = "لطفا علت ترک خدمت را انتخاب نمایید!";
    }
    if (!time) {
      errors.time = "لطفا تاریخ ترک خدمت را مشخص کنید!";
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
    if (userName && personalCode && meliCode && time && reasonLeaving) {
      try {
        const checkoutValues = {
          leaver: userName.value,
          description: description,
          leavingWorkCause: reasonLeaving.value,
          leavingWorkDate: time,
        };
        const userPostReasonLeavingRes = await postUserDataCheckout(
          checkoutValues
        );

        if (userPostReasonLeavingRes.data.code === 415) {
          if (officeUser !== undefined) {
            const ActionValues = {
              action_id: userPostReasonLeavingRes.data.id,
              action_code: 0,
              user_id: localStorage.getItem("id"),
              toPerson: officeUser,
              type: 10,
            };
            const actionRes = await postAction(ActionValues);

            if (actionRes.data.code === 415) {
              dispatch(addMeliCode(""));
              dispatch(addPersonalCode(""));
              dispatch(addDescreption(""));
              dispatch(setReasonLeavingHandler(""));
              dispatch(addUserName(""));
              setTime(null);
              setFormErrors("");
              toast("درخواست با موفقیت ثبت شد!");
            }
          } else {
            toast(". مدیر کاربرمورد نظر یافت نشد");
          }
        }
      } catch (ex) {
        console.log(ex);
      }
    } else {
      setFormErrors(
        validationForm({
          personalCode: personalCode,
          meliCode: meliCode,
          userName: userName.value,
          reasonLeavingWork: reasonLeavingWork.value,
          time: time,
        })
      );
      toast(" ثبت درخواست تسویه حساب انجام نشد! لطفا دوباره امتحان کنید.");
    }
  };

  // useEffect(() => {
  //   document.addEventListener("keydown", function (event) {
  //     if (event.target.nodeName === "INPUT") {
  //       var form = event.target.form;
  //       var index = Array.prototype.indexOf.call(form, event.target);
  //       form.elements[index + 2].focus();
  //       event.preventDefault();
  //     }
  //   });
  // }, []);

  useEffect(() => {
    dispatch(fetchAsyncMeliCode());

    dispatch(fetchHandleGetReasonLeavingWork());
  }, [dispatch]);

  useEffect(() => {
    // reasonLeavingInputRef.current.focus();
    if (userData.first_name !== undefined) {
      handleGetAllUsers();
    }
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      return personalCode, meliCode, userName;
    }
  }, [formErrors, userData, dispatch]);

  const meliCodeHandler = (e) => {
    dispatch(addMeliCode(e.target.value));
    if (e.target.value !== "") {
      dispatch(addPersonalCode(""));
      dispatch(addUserName(""));
    }
  };

  const personalCodeHandler = (e) => {
    dispatch(addPersonalCode(e.target.value));
    if (e.target.value !== "") {
      // dispatch(clearCode());
      dispatch(addMeliCode(""));
      dispatch(addUserName(""));
    }
  };

  const userNameHandler = (e) => {
    dispatch(addUserName(e));
    dispatch(addMeliCode(""));
    dispatch(addPersonalCode(""));
  };

  // const handleEnter = (e) => {
  //   console.log(e);
  //   e.which = e.which || e.keyCode;
  //   if (e.which === 13) {
  //     switch (e.target.id) {
  //       case "item1":
  //         userNameInputRef.current.focus();
  //         break;
  //       case "item2":
  //         meliCodeInputRef.current.focus();
  //         break;
  //       case "item3":
  //         personalCodeInputRef.current.focus();
  //         break;
  //       case "item4":
  //         searchingInputRef.current.focus();
  //         break;
  //       case "item5":
  //         reasonLeavingInputRef.current.focus();
  //         break;
  //       case "item6":
  //         dateLeavingInputRef.current.focus();
  //         break;
  //       case "item7":
  //         descriptionInputRef.current.focus();
  //         break;
  //       default:
  //         break;
  //     }
  //     e.preventDefault();
  //   }
  // };

  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
      var form = event.target.form;
      var index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  });

  return (
    <div className="container">
      <Form className="form-group" onSubmit={handlePostReasonLeaving}>
        <div className="row">
          <div className="mb-4 col-12 col-sm-12  col-md-6  col-lg-3  col-xl-3">
            <label className="mb-1 required-field form-label">
              نام و نام خانوادگی:{" "}
            </label>
            <Select
              id="item1"
              // onKeyDown={handleEnter}
              ref={userNameInputRef}
              value={userName}
              options={users}
              placeholder="جستجو . . ."
              onBlur={() => handleGetUser()}
              onChange={userNameHandler}
            />
            <p className="font12 text-danger mb-0"> {formErrors.userName} </p>
          </div>
          <div className="mb-4 col-12 col-sm-12  col-md-6  col-lg-3  col-xl-3">
            <label className="mb-1 required-field form-label"> کد ملی: </label>
            <NumberFormat
              id="item2"
              // onKeyDown={handleEnter}
              ref={meliCodeInputRef}
              className="form-control"
              value={meliCode}
              onChange={meliCodeHandler}
              onBlur={() => handleGetUser()}
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
              id="item3"
              // onKeyDown={() => handleEnter()}
              ref={personalCodeInputRef}
              className="form-control "
              name="personalCode"
              value={personalCode}
              onChange={personalCodeHandler}
              onBlur={() => handleGetUser()}
              format="#######"
            />
            <p className="font12 text-danger mb-0">{formErrors.personalCode}</p>
          </div>
          <SearchBtn
            id="item4"
            // handleEnter={() => handleEnter()}
            refrence={searchingInputRef}
            handleGetUser={handleGetUser}
          />
          <div className="mb-4  col-12 col-sm-12  col-md-6  col-lg-4  col-xl-3">
            <label className="required-field">علت ترک خدمت : </label>
            <Select
              id="item5"
              // onKeyDown={() => handleEnter()}
              // ref={reasonLeavingInputRef}
              value={reasonLeaving}
              options={reasonLeavingData}
              onChange={(e) => dispatch(setReasonLeavingHandler(e))}
              placeholder="جستجو . . ."
            />
            <p className="font12 text-danger mb-0">
              {formErrors.reasonLeavingWork}
            </p>
          </div>
          {/* <div className="mb-4  col-12 col-sm-12  col-md-6  col-lg-4  col-xl-3">
            <label className="required-field">شرکت مربوطه : </label>
            <Select
              id="item5"
              // onKeyDown={() => handleEnter()}
              ref={reasonLeavingInputRef}
              value={reasonLeavingWork}
              // options={reasonData}
              onChange={(e) => setReasonLeavingWork(e)}
              placeholder="جستجو . . ."
            />
            <p className="font12 text-danger mb-0">
              {formErrors.reasonLeavingWork}
            </p>
          </div> */}
          <div className="mb-4 col-12 col-sm-12 col-md-12  col-lg-6  col-xl-6">
            <label className="required-field">تاریخ ترک خدمت : </label>
            <div className="col-12 col-md-6">
              <DatePicker
                id="item6"
                // onKeyDown={() => handleEnter()}
                ref={dateLeavingInputRef}
                className="form-control"
                persianDigits={true}
                value={time}
                onChange={timerHandler}
                isGregorian={false}
                timePicker={false}
                inputFormat="YYYY-M-D"
                inputJalaaliFormat="jYYYY-jM-jD"
              />
              <p className="font12 text-danger mb-0">{formErrors.time}</p>
            </div>
          </div>
          <div className="col-sm-12 col-md-12  col-lg-12  col-xl-12">
            <label className="py-1 " htmlFor="CheckoutTextarea">
              توضیحات :
            </label>
            <textarea
              id="item7"
              // onKeyDown={() => handleEnter()}
              ref={descriptionInputRef}
              value={description}
              onChange={(e) => dispatch(addDescreption(e.target.value))}
              className="form-control"
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
