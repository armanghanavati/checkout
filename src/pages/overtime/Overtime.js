import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import OverTimeForm from "../../components/forms/overTime/OverTimeForm";
import { handleUserInformation } from "../../components/slices/mainSlices";
import { handleReasonOvertime } from "../../components/slices/OverTimeSlice";

const Overtime = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleReasonOvertime());
    dispatch(handleUserInformation());
  }, [dispatch]);

  return (
    <Container className="p-3" fluid>
      <OverTimeForm />
    </Container>
  );
};

export default Overtime;
