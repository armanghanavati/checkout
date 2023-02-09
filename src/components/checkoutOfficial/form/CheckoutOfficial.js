import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import Select from "react-select";
import { Button, Form, Col, Row, Modal } from "react-bootstrap";
import SearchBtn from "./searchBtn/SearchBtn";
import {
  RsetPersonalCode,
  selectPersonalCode,
  handleReasonLeavingWork,
  selectReasonLeavingData,
  selectReasonLeaving,
  RsetReasonLeavingWork,
  selectMeliCode,
  RsetMeliCode,
  selectUserValue,
  RsetUsernames,
  RsetDescriptions,
  selectDescription,
  RsetApplyModal,
  selectApplyModal,
  handleUsersCheckout,
  selectAllUserNames,
} from "../../slices/CheckoutOfficialSlice";
import {
  postAction,
  actionAddPerson,
} from "../../../Services/r-ghanavatian/mainApi";
import DatePicker from "react-datepicker2";
import {
  handleLogin,
  handleUserLogin,
  selectUserLogin,
} from "../../slices/mainSlices";
import {
  getUser,
  postUserDataCheckout,
} from "../../../Services/r-ghanavatian/checkout";
import { errorMessage, successMessage } from "../../../utils/message";
import Header from "../../../layout/Header/Header";

const CheckoutOfficial = () => {
  const [time, setTime] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [officeUser, setOfficeUser] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [department, setDepartment] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [requestUserId, setRequestUserId] = useState("");

  const meliCodeInputRef = useRef();
  const personalCodeInputRef = useRef();
  const searchingInputRef = useRef();
  const userNameInputRef = useRef();
  const descriptionInputRef = useRef();
  const dateLeavingInputRef = useRef();

  const dispatch = useDispatch();
  const users = useSelector(selectAllUserNames);
  const userName = useSelector(selectUserValue);

  const description = useSelector(selectDescription);
  const personalCode = useSelector(selectPersonalCode);
  const userData = useSelector(selectUserLogin);
  const melliCode = useSelector(selectMeliCode);
  const reasonLeaving = useSelector(selectReasonLeaving);
  const reasonLeavingData = useSelector(selectReasonLeavingData);
  const applyModal = useSelector(selectApplyModal);

  console.log(userData);

  const handleGetUser = async (
    userName,
    melliCode,
    personalCode,
    supervisor
  ) => {
    try {
      const values = {
        meliCode: melliCode,
        personelCode: personalCode,
        id: userName.value !== undefined ? userName.value : "",
        supervisor: supervisor,
      };
      const userRes = await getUser(values);
      console.log(userRes.data.length);

      if (userRes.data.length !== 0) {
        setOfficeUser(userRes.data[0].manager);
        setCompanyName(userRes.data[0].company);
        setDepartment(userRes.data[0].department);
        setSupervisor(
          `${userRes.data[0].supervisor.first_name} ${userRes.data[0].supervisor.last_name}`
        );
        dispatch(
          RsetUsernames({
            value: userRes.data[0]._id,
            label: `${userRes.data[0].first_name} ${userRes.data[0].last_name}`,
          })
        );
        dispatch(RsetPersonalCode(userRes.data[0].personelCode));
        dispatch(RsetMeliCode(userRes.data[0].user_name));
        console.log(meliCodeInputRef.current.state.numAsString.length);
      } else if (
        meliCodeInputRef.current.state.numAsString.length === 10 ||
        personalCodeInputRef.current.state.numAsString.length === 7
      ) {
        errorMessage("کاربر یافت نشد");
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const validationForm = ({
    personalCode,
    melliCode,
    userName,
    reasonLeaving,
    time,
  }) => {
    const errors = {};
    if (!personalCode) {
      errors.personalCode = "لطفا کد پرسنلی را مشخص کنید!";
    }
    if (!melliCode) {
      errors.melliCode = "لطفا کد ملی را مشخص کنید!";
    }
    if (!userName) {
      errors.userName = "لطفا نام و نام خانوادگی را انتخاب نمایید!";
    }
    if (!reasonLeaving) {
      errors.reasonLeaving = "لطفا علت ترک خدمت را انتخاب نمایید!";
    }
    if (!time) {
      errors.time = "لطفا تاریخ ترک خدمت را مشخص کنید!";
    }
    return errors;
  };

  const timerHandler = (e) => {
    setTime(e);
  };

  const handleCheckputRegistration = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (userName && personalCode && melliCode && time && reasonLeaving) {
      console.log(reasonLeaving);
      setFormErrors("");
      try {
        const checkoutValues = {
          leaver: userName.value,
          description: description,
          leavingWorkCause: reasonLeaving.value,
          leavingWorkDate: time,
        };
        console.log(checkoutValues);
        const userPostReasonLeavingRes = await postUserDataCheckout(
          checkoutValues
        );
        console.log(userPostReasonLeavingRes);
        setRequestUserId(userPostReasonLeavingRes.data.id);
        if (userPostReasonLeavingRes.data.code === 415) {
          if (officeUser !== undefined) {
            const ActionValues = {
              action_id: userPostReasonLeavingRes.data.id,
              action_code: 0,
              user_id: localStorage.getItem("id"),
              type: 10,
            };
            console.log(ActionValues);
            const actionRes = await postAction(ActionValues);
            console.log(actionRes);
            dispatch(RsetApplyModal(true));
          } else {
            errorMessage("مدیر کاربرمورد نظر یافت نشد!");
          }
        }

        if (userPostReasonLeavingRes.data.code === 412) {
          setFormErrors(
            validationForm({
              personalCode: personalCode,
              melliCode: melliCode,
              userName: userName.value,
              reasonLeaving: reasonLeaving.value,
              time: time,
            })
          );
        }
      } catch (ex) {
        console.log(ex);
      }
    } else {
      setFormErrors(
        validationForm({
          personalCode: personalCode,
          melliCode: melliCode,
          userName: userName.value,
          reasonLeaving: reasonLeaving.value,
          time: time,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(handleLogin());
    dispatch(handleReasonLeavingWork());
  }, [dispatch]);

  useEffect(() => {
    function paterNhandler() {
      // if (userData.first_name !== undefined) {
      //   dispatch(handleUsersCheckout());
      // }
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        return personalCode, melliCode, userName;
      }
    }
    paterNhandler();
  }, [formErrors, dispatch]);

  const [melliCodeCopy, setMelliCodeCopy] = useState("");

  const meliCodeHandler = (event) => {
    console.log(melliCode);
    dispatch(RsetMeliCode(event.target.value));
    var valueLength = event.target.value.replace(/\s/g, "").length;
    console.log(valueLength, melliCodeCopy, event.target.value);
    if (valueLength === 10 && melliCodeCopy !== event.target.value) {
      setMelliCodeCopy(event.target.value);
      handleGetUser(userName, event.target.value, personalCode, supervisor);
    } else if (valueLength < 10) {
      dispatch(RsetPersonalCode(""));
      dispatch(RsetUsernames(""));
      setMelliCodeCopy("");
      setCompanyName("");
      setDepartment("");
      setSupervisor("");
    }
  };

  const [personalCodeCopy, setPersonalCodeCopy] = useState("");

  const personalCodeHandler = (e) => {
    dispatch(RsetPersonalCode(e.target.value));
    var valueLength = e.target.value.replace(/\s/g, "").length;

    if (valueLength === 7 && personalCodeCopy !== e.target.value) {
      setPersonalCodeCopy(e.target.value);
      handleGetUser(userName, melliCode, e.target.value, supervisor);
    } else if (valueLength < 7) {
      dispatch(RsetMeliCode(""));
      dispatch(RsetUsernames(""));
      setPersonalCodeCopy("");
      setCompanyName("");
      setDepartment("");
      setSupervisor("");
    }
  };

  const userNameHandler = (e) => {
    dispatch(RsetUsernames(e));
    handleGetUser(e);
    dispatch(RsetMeliCode(""));
    dispatch(RsetPersonalCode(""));
    setSupervisor("");
  };

  const handleResetForm = (e) => {
    e.preventDefault();
    dispatch(RsetMeliCode(""));
    dispatch(RsetPersonalCode(""));
    dispatch(RsetDescriptions(""));
    dispatch(RsetReasonLeavingWork(""));
    dispatch(RsetUsernames(""));
    setSupervisor("");
    setTime(null);
    setIsDisable(false);
    setFormErrors("");
    setCompanyName("");
    setDepartment("");
  };

  const handleActionToPersons = async (e) => {
    try {
      e.preventDefault();
      const toPersons = {
        toPersons: [officeUser],
      };
      const addPersonActionRes = await actionAddPerson(
        requestUserId,
        10,
        toPersons
      );
      console.log(addPersonActionRes.data);
      if (addPersonActionRes.data.code === 415) {
        dispatch(RsetApplyModal(false));
        handleResetForm(e);
        successMessage("درخواست با موفقیت ثبت و ارسال شد!");
      } else {
        errorMessage("عملیات انجام نشد");
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
      var form = event.target.form;
      var index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  });

  return (
    <div className="container-fluid">
      <Form className="form-group">
        <Row>
          <Col className="mb-4" md="12" lg="6" xl="2">
            <label className="mb-1 required-field form-label">
              نام و نام خانوادگی:{" "}
            </label>
            <Select
              id="item1"
              ref={userNameInputRef}
              value={userName}
              options={users}
              placeholder="جستجو . . ."
              // onBlur={() => handleGetUser()}
              onChange={userNameHandler}
            />

            {!userName.value && (
              <p className="font12 text-danger mb-0 mt-1">
                {formErrors.userName}
              </p>
            )}
          </Col>
          <Col className=" mb-4" md="12" lg="6" xl="2">
            <label className="mb-1 required-field form-label"> کد ملی: </label>
            <NumberFormat
              id="item2"
              // onKeyDown={handleEnter}
              ref={meliCodeInputRef}
              className="form-control"
              value={melliCode}
              onChange={meliCodeHandler}
              // onBlur={() => handleGetUser()}
              name="meliCode"
              format="##########"
            />
            {!melliCode && (
              <p className="font12 text-danger mt-1 mb-0">
                {formErrors.melliCode}
              </p>
            )}
          </Col>
          <Col className=" mb-4" md="12" lg="6" xl="2">
            <label className="mb-1 required-field form-label">
              کد پرسنلی:{" "}
            </label>
            <NumberFormat
              id="item3"
              // onKeyDown={() => handleEnter()}
              ref={personalCodeInputRef}
              className="form-control"
              name="personalCode"
              value={personalCode}
              onChange={personalCodeHandler}
              // onBlur={() => handleGetUser()}
              format="#######"
            />
            {!personalCode && (
              <p className="font12 text-danger mt-1 mb-0">
                {formErrors.personalCode}
              </p>
            )}
          </Col>
          <Col className="mb-4" md="12" lg="6" xl="2">
            <label className="mb-1"> مدیر / سرپرست: </label>
            <Form.Control
              disabled
              value={supervisor}
            // onChange={() => setSupervisor(e.target.value)}
            />
            <p className="font12 text-danger mb-4 mb-md-4"></p>
          </Col>
          <SearchBtn
            className="col-1"
            id="item4"
            userName={userName}
            melliCode={melliCode}
            personalCode={personalCode}
            supervisor={supervisor}
            // handleEnter={() => handleEnter()}
            refrence={searchingInputRef}
            handleGetUser={handleGetUser}
          />
          <Col md="12" lg="6" xl="3" className="mb-4">
            <label className="mb-1  required-field">تاریخ ترک خدمت: </label>
            <DatePicker
              // calendarClass="datePicker"
              datePickerClass="bg-danger"
              id="item6"
              ref={dateLeavingInputRef}
              className="form-control"
              persianDigits={true}
              value={time}
              onChange={timerHandler}
              isGregorian={false}
              timePicker={false}
              inputFormat="YYYY/MM/DD"
              inputJalaaliFormat="jYYYY/jM/jD"
              monthsShown={1}
              timeIntervals={5}
              timeCaption="time"
              popperPlacement="bottom"
              portalId="root-portal"
              dateFormat="yyyy-MM-dd"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              popperClassName="date-picker-reports"
              placeholderText="Choose a date"
              popperModifiers={{
                options: {
                  rootBoundary: "viewport",
                  tether: false,
                  altAxis: true,
                },
                flip: {
                  behavior: ["bottom"],
                },
                preventOverflow: {
                  enabled: false,
                },
                hide: {
                  enabled: false,
                },
              }}
            />
            {!time && (
              <p className="font12 text-danger mt-1 mb-0">{formErrors.time}</p>
            )}
          </Col>
          <Col className=" mb-4" md="12" lg="6" xl="3">
            <label className="mb-1 required-field">علت ترک خدمت: </label>
            <Select
              id="item5"
              value={reasonLeaving}
              options={reasonLeavingData}
              onChange={(e) => dispatch(RsetReasonLeavingWork(e))}
              placeholder="انتخاب"
            />
            {!reasonLeaving.value && (
              <p className="font12 text-danger mt-1 mb-0">
                {formErrors.reasonLeaving}
              </p>
            )}
          </Col>
          <Col className=" mb-4" md="12" lg="6" xl="3">
            <label className="mb-1">شرکت: </label>
            <Form.Control disabled value={companyName} />
          </Col>
          <Col md="12" lg="6" xl="3" className="mb-4">
            <label className="mb-1">واحد: </label>
            <Form.Control disabled value={department} />
          </Col>
          <div className="col-sm-12 col-md-12  col-lg-12  col-xl-12">
            <label className="mb-1 py-1 " htmlFor="CheckoutTextarea">
              توضیحات:
            </label>
            <textarea
              id="item7"
              // onKeyDown={() => handleEnter()}
              ref={descriptionInputRef}
              value={description}
              onChange={(e) => dispatch(RsetDescriptions(e.target.value))}
              className="form-control"
              rows="5"
            />
          </div>
        </Row>
        <div className="justify-content-center text-center d-flex">
          <div className="">
            <button
              onClick={handleResetForm}
              className="me-4 btn btn-secondary my-5"
            >
              ایجاد مورد جدید
            </button>
            <button
              onClick={handleCheckputRegistration}
              disabled={isDisable ? true : false}
              className="ms-4 btn btn-success my-5"
            >
              ثبت
            </button>
          </div>
          <button
            onClick={handleActionToPersons}
            disabled={isDisable ? false : true}
            className="ms-2 btn btn-primary my-5"
          >
            ارسال به مدیران جهت بررسی
          </button>
        </div>
      </Form>
      <Modal
        show={applyModal}
        onHide={() => dispatch(RsetApplyModal(false))}
        backdrop="static"
        role="dialog"
        size="sm"
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header className="d-block bg-success text-white">
          <Modal.Title className="d-flex justify-content-between">
            <div>
              <span>تایید درخواست </span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          درخواست شما با موفقیت ثبت شد.
          <br /> آیا میخواهید آن را برای مدیران ارسال کنید؟
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            name="cancelModal"
            variant="danger"
            onClick={() => {
              dispatch(RsetApplyModal(false));
              setIsDisable(true);
            }}
          >
            خیر
          </Button>
          <Button
            name="acceptModal"
            variant="success"
            onClick={handleActionToPersons}
          >
            بله
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CheckoutOfficial;
