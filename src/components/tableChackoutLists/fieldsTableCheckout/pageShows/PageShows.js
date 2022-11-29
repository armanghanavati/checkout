import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import items from "../../../tableData/OptionsItem";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

const PageShows = () => {
  const [values, setValues] = useState();

  return (
    <div className="mx-4">
      <div className="d-flex mx-4 justify-content-center">
        <div className="mx-4">
          <select
            value={values}
            onChange={(e) => setValues(e.target.value)}
            className="form-control"
          >
            {items.map((item, i) => (
              <option key={i}> {item.value} </option>
            ))}
          </select>
        </div>
        <label className="mx-4">برو به صفحه:</label>
        <div>
          <input className="form-control" />
        </div>
        <p className="mx-4"> صفحه 1 از 1 </p>
        <div className="mx-4">
          <button disabled className="mx-1 rounded border border-none">
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
          <button disabled className="mx-1 rounded border border-none">
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button disabled className="mx-1 rounded border border-none">
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button disabled className="mx-1 rounded border border-none">
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageShows;
