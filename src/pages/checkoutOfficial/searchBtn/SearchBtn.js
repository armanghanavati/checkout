import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBtn = ({ handleGetUser, refrence, handleEnter }) => {
  const [showUser, setShowUser] = useState(false);

  return (
    <div className="col-4 mb-4 col-md-4 col-lg-3 col-sm-4 mt-4 mb-md-4">
      <Button
        onKeyUp={handleEnter}
        ref={refrence}
        onClick={() => handleGetUser()}
      >
        <FontAwesomeIcon icon={faSearch} />
      </Button>
      {showUser && "hello world"}
    </div>
  );
};

export default SearchBtn;
