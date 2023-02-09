import React, { Fragment } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker2";
import NumberFormat from "react-number-format";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Select from "react-select";
import {
    handleCloudListFile,
    RsetAppNameFilterFC, RsetFromDateFilterFC, RsetSerialFilterFC,
    RsetToDateFilterFC,
    RsetUserNameReqFilterFC, selectAllAppName, selectAllCloudList, selectAllMemberCloudList, selectAppNameFilterFC,
    selectFromDateFilterFC, selectSerialFilterFC, selectToDateFilterFC,
    selectUserNameReqFilterFC
} from "../../slices/filesCloudSlice";
import { RsetRealFilter, selectRealFilter } from "../../slices/mainSlices";

const FileClodFilter = () => {
    const dispatch = useDispatch()
    const serialNumber = useSelector(selectSerialFilterFC)
    const userName = useSelector(selectUserNameReqFilterFC)
    const allCloudList = useSelector(selectAllCloudList);
    const appNameFilter = useSelector(selectAppNameFilterFC);
    const fromDateFilterFC = useSelector(selectFromDateFilterFC);
    const toDateFilterFC = useSelector(selectToDateFilterFC);
    const allAppName = useSelector(selectAllAppName)
    const allMemberList = useSelector(selectAllMemberCloudList)
    const realFilter = useSelector(selectRealFilter)


    // const alluserReqFileClode = 

    return (
        <Fragment>
            <Form>
                <Row>
                    <Col xl="3">
                        <label className="mb-1  mt-4">سریال:</label>
                        <NumberFormat
                            className="form-control"
                            format="######"
                            dir="ltr"
                            value={serialNumber}
                            onChange={(e) => {
                                console.log(e);
                                dispatch(RsetSerialFilterFC(e.target.value))
                            }
                            }
                        />
                    </Col>
                    <Col xl="3">
                        <label className="mb-1  mt-4">ارسال کننده:</label>
                        <Select
                            value={userName}
                            onChange={(e) => dispatch(RsetUserNameReqFilterFC(e))}
                            options={allMemberList}
                            placeholder="انتخاب"
                        />
                    </Col>
                    <Col xl="3">
                        <label className="mb-1 mt-4">نام فایل:</label>
                        <Form.Control
                            value={appNameFilter}
                            options={allAppName}
                            onChange={(e) => dispatch(RsetAppNameFilterFC(e))}
                            placeholder="" />
                    </Col>
                    <Col xl="3">
                        <label className="mb-1 mt-4">نام نرم افزار:</label>
                        <Select
                            value={appNameFilter}
                            options={allAppName}
                            onChange={(e) => dispatch(RsetAppNameFilterFC(e))}
                            placeholder="انتخاب" />
                    </Col>
                    <Col xl="3">
                        <label className="mb-1 mt-4">از تاریخ:</label>
                        <DatePicker
                            type="date"
                            v-model="dateWhichShouldShow"
                            inputFormat="YYYY-MM-DD"
                            pick12HourFormat={false}
                            isGregorian={false}
                            timePicker={true}
                            value={fromDateFilterFC}
                            onChange={(e) => dispatch(RsetFromDateFilterFC(e))}
                            className="form-control" />
                    </Col>
                    <Col xl="3">
                        <label className="mb-1 mt-4">تا تاریخ:</label>
                        <DatePicker
                            value={toDateFilterFC}
                            onChange={(e) => dispatch(RsetToDateFilterFC(e))}
                            type="date"
                            v-model="dateWhichShouldShow"
                            inputFormat="YYYY-MM-DD"
                            pick12HourFormat={false}
                            isGregorian={false}
                            timePicker={true}

                            className="form-control" />
                    </Col>
                    <Col xl="3" className="mt-4 justify-content-center">
                        <Form.Group className="d-flex align-items-center mb-3 justify-content-end">
                            <input className="" type='checkbox' name='realFilter'
                                value={realFilter}
                                checked={realFilter}
                                onChange={() => { dispatch(RsetRealFilter(!realFilter)) }} />
                            <Form.Label className='ms-2 font12 mb-0'> جستجو لحظه ای </Form.Label>
                        </Form.Group>
                        <div className=" d-flex justify-content-end">
                            <Button onClick={() => {
                                const filterValues = {
                                    application: appNameFilter !== "" ? appNameFilter.value : appNameFilter,
                                    fromDate: fromDateFilterFC !== null ? fromDateFilterFC.format("YYYY/MM/DD") : "null",
                                    toDate: toDateFilterFC !== null ? toDateFilterFC.format("YYYY/MM/DD") : "null",
                                    memberId: userName !== "" ? userName.value : userName,
                                    serial: serialNumber
                                }
                                dispatch(handleCloudListFile(filterValues))
                            }} className="me-2 mt-2 font12 " variant="success">
                                اعمال فیلتر
                            </Button>
                            <Button onClick={() => {
                                dispatch(RsetSerialFilterFC(""))
                                dispatch(RsetUserNameReqFilterFC(""))
                                dispatch(RsetAppNameFilterFC(""))
                                dispatch(RsetFromDateFilterFC(null))
                                dispatch(RsetToDateFilterFC(null))
                            }} className="font12  mt-2" variant="secondary">
                                لغو فیلتر
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    );
};

export default FileClodFilter;