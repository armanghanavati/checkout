import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import OverTimeForm from "../../components/forms/overTime/OverTimeForm";
import { fetchOverTimeReason } from "../../components/slices/OverTimeSlice";

const Overtime = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOverTimeReason());
  }, [dispatch]);

  return (
    <Container className="p-3" fluid>
      <OverTimeForm />
    </Container>
  );
};

export default Overtime;
