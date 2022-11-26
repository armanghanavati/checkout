import React, { useState } from "react";
import DatePicker from "react-datepicker2";

function DateTodayComponent() {
  const [time, setTime] = useState(null);

  const timerHandler = (e) => {
    setTime(e);
    console.log(e);
  };

  return (
    <div className="col-6">
      <DatePicker
        className="form-control"
        persianDigits={true}
        value={time}
        onChange={timerHandler}
        isGregorian={false}
        timePicker={false}
        inputFormat="YYYY-M-D"
        inputJalaaliFormat="jYYYY-jM-jD"
      />
    </div>
  );
}

export default DateTodayComponent;
