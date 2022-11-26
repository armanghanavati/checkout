import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";

const SearchBtn = ({ users, meliCodeProp, handleGetUser }) => {
  const [showUser, setShowUser] = useState(false);

  return (
    <div className="col-4 col-md-4 col-lg-3 col-sm-4 d-flex align-items-end">
      <Button onClick={() => handleGetUser()}>
        <FontAwesomeIcon icon={faSearch} />
        <ToastContainer />
      </Button>
      {showUser && "hello world"}
    </div>
  );
};

export default SearchBtn;
