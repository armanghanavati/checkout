import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { postAllUsersByPersonalCode } from "../../../common/services";

const SearchBtn = ({ users, meliCodeProp, handleGetUser }) => {
  const [showUser, setShowUser] = useState(false);

  const searchHandler = () => {
    if (Object.keys(meliCodeProp).length > 0) {
      console.log("searching succes");
    } else {
      console.log(Object.keys(meliCodeProp));
    }
  };

  return (
    <div className="col-12 col-md-1 d-flex align-items-end">
      <Button onClick={handleGetUser}>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
      {showUser && "hello world"}
    </div>
  );
};

export default SearchBtn;
