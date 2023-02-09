import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CheckoutList from "./components/checkoutOfficial/pages/CheckoutTable";
import ExpenseAccount from "./components/expensesAccount/pages/ExpenseAccount";
import ExpensesAccountTable from "./components/expensesAccount/table/ExpensesAccountTable";
import CheckoutOfficial from "./components/checkoutOfficial/form/CheckoutOfficial";
import Overtime from "./components/overTime/pages/Overtime";
import OverTimeTable from "./components/overTime/pages/OverTimeTable";
import Layout from "./layout/Layout";
import FilesCloud from "./components/filesCloud/forms/FilesCloud";
import Login from "./components/account/Login";
import Home from "./layout/Home";
import Header from "./layout/Header/Header";
import FilesCloudTable from "./components/filesCloud/table/FilesCloudTable";

function App() {
  return (
    <>
      <Router>
        <Layout>

          <Routes>
            {/* <Route
              path="/checkout"
              render={() =>
                localStorage.getItem("id") !== null ? (
                  <CheckoutList />
                  ) : (
                    <Navigate to="/" />
                )
              }
            /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/checkout" element={<CheckoutOfficial />} />
            <Route path="/checkoutList" element={<CheckoutList />} />
            <Route path="/overTime" element={<Overtime />} />
            <Route path="/overtimeTableList" element={<OverTimeTable />} />
            <Route path="/expenseAccount" element={<ExpenseAccount />} />
            <Route path="/filesCloud" element={<FilesCloud />} />
            <Route
              path="/expenseAccountTable"
              element={<ExpensesAccountTable />}
            />
            <Route
              path="/filesCloudList"
              element={<FilesCloudTable />}
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
