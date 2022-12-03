import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleGetUsersTable } from "../../components/checkoutOfficialSlice/TableCheckoutSlice";
import FieldsTableCheckout from "../../components/tableChackoutLists/fieldsTableCheckout/FieldsTableCheckout";
import TableChackoutLists from "../../components/tableChackoutLists/tableChackoutLists/TableChackoutLists";

const CheckoutList = () => {
  // const [checkoutList, setCheckoutList] = useState([]);
  // const [filterUsers, setFilterUsers] = useState([])
  // const userData = useSelector(loginInfo);
  const dispatch = useDispatch();

  // const handleGetUsersTable = async () => {
  //   try {
  //     const checkoutListRes = await getUserListTable();
  //     console.log(checkoutListRes);
  //     setCheckoutList(checkoutListRes.data.list);
  //     setFilterUsers(checkoutListRes.data.members)
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // };

  useEffect(() => {
    // handleGetUsersTable();
    dispatch(handleGetUsersTable());
  }, []);

  return (
    <main>
      <Container fluid>
        <FieldsTableCheckout />
        <TableChackoutLists />
        {/* <TestTable /> */}
        {/* <PageShows /> */}
      </Container>
    </main>
  );
};

export default CheckoutList;
