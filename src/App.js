import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckoutList from "./components/checkoutOfficial/pages/CheckoutTable";
import ExpenseAccount from "./components/expensesAccount/pages/ExpenseAccount";
import ExpensesAccountTable from "./components/expensesAccount/table/ExpensesAccountTable";
import CheckoutOfficial from "./components/checkoutOfficial/form/CheckoutOfficial";
import Overtime from "./components/overTime/pages/Overtime";
import OverTimeTable from "./components/overTime/pages/OverTimeTable";
import Login from "./components/account/Login";
import PrivateRoute from "./components/account/PrivateRoute";
import Header from "./layout/Header/Header";
import Home from "./layout/Home";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/checkout" element={<CheckoutOfficial />} />
            <Route path="/checkoutList" element={<CheckoutList />} />
            <Route path="/overTime" element={<Overtime />} />
            <Route path="/overtimeTableList" element={<OverTimeTable />} />
            <Route path="/expenseAccount" element={<ExpenseAccount />} />
            <Route
              path="/expenseAccountTable"
              element={<ExpensesAccountTable />}
            />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
