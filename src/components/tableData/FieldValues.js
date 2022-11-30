export default [
  {
    id: 1,
    label: "سریال: ",
    name: "serial",
    placeholder: "سریال",
    type: "numb",
    format: "######",
    md:'4',
    lg:'3',
    xxl: '2'
  },
  {
    id: 2,
    label: "درخواست کننده: ",
    name: "userLogin",
    placeholder: "درخواست کننده",
    type: "select",
    md:'4',
    lg: '3',
    xxl: '2'
  },
  {
    id: 3,
    label: "وضعیت درخواست: ",
    name: "status",
    placeholder: "وضعیت درخواست",
    type: "select",
    md:'4',
    lg: '3',
    xxl: '2'
  },
  {
    id: 4,
    label: "از تاریخ: ",
    name: "fromDate",
    type: "date",
    inputFormat: "YYYY-M-D",
    inputJalaaliFormat: "jYYYY-jM-jD",
    persianDigits: true,
    isGregorian: false,
    timePicker: false,
    md:'4',
    lg: '3',
    xxl:'2'
  },
  {
    id: 5,
    label: "تا تاریخ :",
    name: "untilDate",
    type: "date",
    inputFormat: "YYYY-M-D",
    inputJalaaliFormat: "jYYYY-jM-jD",
    persianDigits: true,
    isGregorian: false,
    timePicker: false,
    md:'4',
    lg: '3',
    xxl:'2'
  },
];
