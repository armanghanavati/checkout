import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment-jalaali";
import { toast } from "react-toastify";
import { getOverTimeReason, postOverTime } from "../../common/overTime";
import { postAction } from "../../common/services";

const initialState = {
  startTimeDate: null,
  endTimeDate: null,
  formErrors: {},
  des: "",
  overTimeReson: [],
  overTimeReasonValue: [],
};

export const fetchOverTimeReason = createAsyncThunk(
  "overTime/fetchOverTimeReason",
  async () => {
    try {
      const overTimeRes = await getOverTimeReason();
      return overTimeRes.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postOverTimeApi = createAsyncThunk(
  "overTime/postOverTimeApi",
  async (obj, { dispatch, getState }) => {
    try {
      const { overTimeReasonValue, startTimeDate, endTimeDate, des } =
        getState().overTime;
      const { user } = getState().checkout;
      const values = {
        reason: overTimeReasonValue.value,
        fromDate: startTimeDate,
        toDate: endTimeDate,
        description: des,
      };
      const postOverTimeRes = await postOverTime(values);
      if (postOverTimeRes.data.code === 415) {
        const actionValues = {
          action_id: postOverTimeRes.data.id,
          action_code: 0,
          user_id: localStorage.getItem("id"),
          toPersons: user.supervisor._id,
          type: 14,
        };
        console.log(actionValues);
        const postOverTimeActionRes = await postAction(actionValues);
        console.log(postOverTimeActionRes);
        if (postOverTimeActionRes.data.code === 415) {
          toast.success("با موفقیت ثبت و ارسال شد.", {
            className: "bg-success text-white",
          });
          dispatch(addStartDate(null));
          dispatch(addEndDate(null));
          dispatch(addDescreption(""));
          dispatch(addOverTimeReasonValue(""));
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
);

const OverTimeSlice = createSlice({
  name: "overTime",
  initialState,
  reducers: {
    addFormErrors: (state, { payload }) => {
      return { ...state, formErrors: payload };
    },
    addStartDate: (state, { payload }) => {
      return { ...state, startTimeDate: payload };
    },
    addEndDate: (state, { payload }) => {
      return { ...state, endTimeDate: payload };
    },
    addDescreption: (state, { payload }) => {
      return { ...state, des: payload };
    },
    addOverTimeReasonValue: (state, { payload }) => {
      return { ...state, overTimeReasonValue: payload };
    },
  },
  extraReducers: {
    [fetchOverTimeReason.fulfilled]: (state, { payload }) => {
      return { ...state, overTimeReson: payload };
    },
  },
});

export const {
  addStartDate,
  addEndDate,
  addDescreption,
  addOverTimeReasonValue,
  addFormErrors,
} = OverTimeSlice.actions;

export const selectOverTimeReason = (state) => state.overTime.overTimeReson;
export const selectStartDate = (state) => state.overTime.startTimeDate;
export const selectEndDate = (state) => state.overTime.endTimeDate;
export const selectDescreption = (state) => state.overTime.des;
export const selectFormErrors = (state) => state.overTime.formErrors;
export const selectOverTimeReasonValue = (state) =>
  state.overTime.overTimeReasonValue;
export default OverTimeSlice.reducer;
