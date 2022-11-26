import React, { useState } from "react";
import Alerts from "./components/alerts/Alerts";

const Test = () => {
  const [click, setClick] = useState(true);

  return <div>{click ? <Alerts /> : "nithing"}</div>;
};

export default Test;
