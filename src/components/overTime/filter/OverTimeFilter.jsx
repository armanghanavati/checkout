import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker2";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  handleDepartments,
  handleReqsList,
  RsetRealFilter,
  selectAllDeps,
  selectRealFilter,
  selectRequestMemb,
} from "../../slices/mainSlices";
import {
  RsetToDate,
  RsetFromDate,
  RsetUserListValue,
  selectDepartmant,
  selectEndDate,
  selectStartDate,
  selectStatus,
  selectUserRequestFilter,
  RsetDepartemant,
  RsetStatus,
  handleResetOverTimeFilter,
} from "../../slices/OverTimeSlice";
import { selectAllStatus } from "../../slices/CheckoutOfficialSlice";

const OverTimeFilter = () => {
  const realFilter = useSelector(selectRealFilter);
  const allDeps = useSelector(selectAllDeps);
  const requestMembs = useSelector(selectRequestMemb);
  const allStatuses = useSelector(selectAllStatus);
  const fromDate = useSelector(selectStartDate);
  const toDate = useSelector(selectEndDate);
  const status = useSelector(selectStatus);
  const dep = useSelector(selectDepartmant);
  const members = useSelector(selectUserRequestFilter);
  const dispatch = useDispatch();

  // let getAllDep = [];
  // getAllDep.push({ value: "", label: "همه" });

  //  allDeps.map((dep) => {
  //   return getAllDep.push({
  //     value: dep.DeptCode,
  //     label: dep.DeptName,
  //   });
  // });

  // const {
  //   gotoPage,
  //   state: { pageIndex, pageSize, sortBy },
  // } = useTable();

  let addAllDepsValue = []
  addAllDepsValue.push({ label: 'همه', value: "", coId: "" })

  const addValue = allDeps.map((dep) => {
    console.log(dep);
    return addAllDepsValue.push({ label: dep.label, value: dep.value, coId: dep.coId })
  })

  return (
    <section>
      <Form>
        <Row>
          <Col lg="3">
            <Form.Label> درخواست کننده: </Form.Label>
            <Select
              options={requestMembs}
              className="mb-3"
              value={members}
              onChange={(e) => {
                dispatch(RsetUserListValue(e));
                if (realFilter) {
                  const filterValues = {
                    applicant_id: localStorage.getItem("id"),
                    memberId: e !== "" ? e.value : e,
                    mDep: dep !== "" ? dep.value : dep,
                    status: status !== "" ? status.value : status,
                    fromDate:
                      fromDate !== null
                        ? fromDate.format("YYYY/MM/DD")
                        : "null",
                    toDate:
                      toDate !== null ? toDate.format("YYYY/MM/DD") : "null",
                    type: 14,
                  };
                  dispatch(handleReqsList(filterValues));
                }
              }}
              placeholder="انتخاب"
            />
          </Col>
          <Col lg="3">
            <Form.Label> واحد: </Form.Label>
            <Select
              className="mb-3"
              value={dep}
              onChange={(e) => {
                dispatch(RsetDepartemant(e));
                if (realFilter) {
                  const filterValues = {
                    applicant_id: localStorage.getItem("id"),
                    memberId: members !== "" ? members.value : members,
                    mDep: e !== "" ? e.value : e,
                    status: status !== "" ? status.value : status,
                    fromDate:
                      fromDate !== null
                        ? fromDate.format("YYYY/MM/DD")
                        : "null",
                    toDate:
                      toDate !== null ? toDate.format("YYYY/MM/DD") : "null",
                    type: 14,
                  };
                  dispatch(handleReqsList(filterValues));
                }
              }}
              options={addAllDepsValue}
              placeholder="جستجو . . ."
            />
          </Col>
          <Col lg="3">
            <Form.Label> وضعیت درخواست: </Form.Label>
            <Select
              className="mb-3"
              value={status}
              onChange={(e) => {
                dispatch(RsetStatus(e));
                if (realFilter) {
                  const filterValues = {
                    applicant_id: localStorage.getItem("id"),
                    memberId: members !== "" ? members.value : members,
                    mDep: dep !== "" ? dep.value : dep,
                    status: e !== "" ? e.value : e,
                    fromDate:
                      fromDate !== null
                        ? fromDate.format("YYYY/MM/DD")
                        : "null",
                    toDate:
                      toDate !== null ? toDate.format("YYYY/MM/DD") : "null",
                    type: 14,
                  };
                  dispatch(handleReqsList(filterValues));
                }
              }}
              options={allStatuses}
              placeholder="انتخاب"
            />
          </Col>
          <Col lg="3">
            <Form.Label> تاریخ شروع: </Form.Label>
            <DatePicker
              persianDigits={false}
              isGregorian={false}
              timePicker={false}
              value={fromDate}
              onChange={(e) => {
                dispatch(RsetFromDate(e));
                if (realFilter) {
                  const filterValues = {
                    applicant_id: localStorage.getItem("id"),
                    memberId: members !== "" ? members.value : members,
                    mDep: dep !== "" ? dep.value : dep,
                    status: status !== "" ? status.value : status,
                    fromDate: e !== null ? e.format("YYYY/MM/DD") : "null",
                    toDate:
                      toDate !== null ? toDate.format("YYYY/MM/DD") : "null",
                    type: 14,
                  };
                  dispatch(handleReqsList(filterValues));
                }
              }}
              className="form-control mb-3"
            />
          </Col>
          <Col lg="3">
            <Form.Label> تاریخ پایان: </Form.Label>
            <DatePicker
              value={toDate}
              onChange={(e) => {
                dispatch(RsetToDate(e));
                if (realFilter) {
                  const filterValues = {
                    applicant_id: localStorage.getItem("id"),
                    memberId: members !== "" ? members.value : members,
                    mDep: dep !== "" ? dep.value : dep,
                    status: status !== "" ? status.value : status,
                    fromDate:
                      fromDate !== null
                        ? fromDate.format("YYYY/MM/DD")
                        : "null",
                    toDate: e !== null ? e.format("YYYY/MM/DD") : "null",
                    type: 14,
                  };
                  dispatch(handleReqsList(filterValues));
                }
              }}
              persianDigits={false}
              isGregorian={false}
              timePicker={false}
              className="form-control mb-3"
            />
          </Col>
          <Col className="text-end" lg="3">
            <Form.Group className="d-flex align-items-center mb-3 justify-content-end">
              <input className="" type='checkbox' name='realFilter'
                value={realFilter}
                checked={realFilter}
                onChange={() => { dispatch(RsetRealFilter(!realFilter)) }} />
              <Form.Label className='ms-2 font12 mb-0'> جستجو لحظه ای </Form.Label>
            </Form.Group>
            <Button
              onClick={(e) => {
                const filterValues = {
                  applicant_id: localStorage.getItem("id"),
                  memberId: members !== "" ? members.value : members,
                  mDep: dep !== "" ? dep.value : dep,
                  status: status !== "" ? status.value : status,
                  fromDate:
                    fromDate !== null ? fromDate.format("YYYY/MM/DD") : "null",
                  toDate:
                    toDate !== null ? toDate.format("YYYY/MM/DD") : "null",
                  type: 14,
                };
                e.preventDefault();
                console.log(fromDate);
                dispatch(handleReqsList(filterValues));
              }}
              className="me-1 font12"
              variant="success"
            >
              اعمال فیلتر
            </Button>
            <Button
              className="font12"
              onClick={() => {
                dispatch(handleResetOverTimeFilter());
              }}
              variant="secondary"
            >
              لغو فیلتر
            </Button>
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default OverTimeFilter;
