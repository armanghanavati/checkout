import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  RsetFilterItems,
  RsetListItems,
  selectFilterItems,
  selectItemId,
  selectListItems,
} from "../../slices/expencesAccountSlice";

const ExpensesAccountModal = ({ itemId }) => {
  const dispatch = useDispatch();
  const listItems = useSelector(selectListItems);
  const filterItem = useSelector(selectFilterItems);

  const handleFilterItems = (itemId) => {
    console.log(itemId)
    const items = [...listItems];
    const filteredItems = items.filter((item) => itemId !== item.id);
    console.log(filteredItems);
    dispatch(RsetListItems(filteredItems));
    dispatch(RsetFilterItems(false));
  };

  return (
    <Modal
      centered
      show={filterItem}
      onHide={() => dispatch(RsetFilterItems(false))}
      backdrop="static"
      role="dialog"
      size="sm"
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Body className="show-grid">
        از حذف این مورد اطمینان دارید؟
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button
          name="acceptModal"
          variant="danger"
          onClick={() => handleFilterItems(itemId)}
        >
          بله
        </Button>
        <Button
          name="cancelModal"
          variant="secondary"
          onClick={() => dispatch(RsetFilterItems(false))}
        >
          خیر
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExpensesAccountModal;
