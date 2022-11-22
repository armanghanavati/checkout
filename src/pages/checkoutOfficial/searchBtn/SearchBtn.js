import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { postAllUsersByPersonalCode } from "../../../common/services";
import axios from "axios";

const SearchBtn = ({ users, meliCodeProp, handleGetUser }) => {
  const [showUser, setShowUser] = useState(false);



  return (
    <div className="col-12 col-md-1 d-flex align-items-end">
      <Button onClick={()=>handleGetUser()}>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
      {showUser && "hello world"}
    </div>
  );
};

export default SearchBtn;
