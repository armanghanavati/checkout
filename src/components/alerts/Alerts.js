import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Alerts() {
  const [click, setClick] = useState(true);

  const notify = () => {
    if (click) {
      toast("! لطفا فیلد ها را بر کنید ");
    } else {
      alert("alert");
    }
  };
  return (
    <div>
      <button onClick={notify}>
        سی
        <ToastContainer />
      </button>
    </div>
  );
}

export default Alerts;
