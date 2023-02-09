import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import OverTimeForm from "../form/OverTimeForm";
import { handleReasonOvertime } from "../../slices/OverTimeSlice";

const Overtime = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleReasonOvertime());
  }, [dispatch]);



  return (
    <Container className="p-3" fluid>
      <OverTimeForm />
    </Container>
  );
};

export default Overtime;
