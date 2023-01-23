import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import OverTimeForm from "../form/OverTimeForm";
import { handleUserInformation } from "../../slices/mainSlices";
import { handleReasonOvertime } from "../../slices/OverTimeSlice";
import Header from "../../../layout/Header/Header";

const Overtime = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleReasonOvertime());
    dispatch(handleUserInformation());
  }, [dispatch]);

  return (
    <Container className="p-3" fluid>
      <Header />

      <OverTimeForm />
    </Container>
  );
};

export default Overtime;
