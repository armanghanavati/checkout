import React, { Component } from "react";
import DatePicker from "react-datepicker2";
import momentJalaali from "moment-jalaali";

export default class DateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: momentJalaali("1396/7/6", "jYYYY/jM/jD"),
    };
  }

  render() {
    const dateHandler = (value) => {
      console.log(this.setState({ value }));
    };

    return (
      <div className="col-2">
        <DatePicker
          className="form-control"
          isGregorian={false}
          value={this.state.value}
          onChange={dateHandler}
        />
      </div>
    );
  }
}
