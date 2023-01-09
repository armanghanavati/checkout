import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import OverTimeFilter from "../../components/filter/overTimeFilter/OverTimeFilter";
import {
  handleDepartments,
  handlePermisionPresent,
  patchPermisionChanged,
} from "../../components/slices/mainSlices";
import { handleUsersOverTime } from "../../components/slices/OverTimeSlice";
import { handlStatusesCheckout } from "../../components/slices/TableCheckoutSlice";
import OverTimeTableList from "../../components/table/overTimeTable/OverTimeTableList";

const OverTimeTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleDepartments());
    dispatch(handleUsersOverTime());
    dispatch(handlStatusesCheckout());
    dispatch(handlePermisionPresent());
    dispatch(patchPermisionChanged());
  }, [dispatch]);

  return (
    <main>
      <Container fluid>
        <OverTimeFilter />
        <OverTimeTableList />
      </Container>
    </main>
  );
};

export default OverTimeTable;
