import "./App.css";
import Header from "./layout/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import CheckoutOfficial from "./pages/checkoutOfficial/CheckoutOfficial";

function App() {
  return (
    <div className="base_cont">
      <header>
        <Header />
      </header>
      <Switch>
        <Router>
          <main>
            <Route path="/" element={<Home />} exact />
            <Route path="/checkout" element={<CheckoutOfficial />} />
          </main>
        </Router>
      </Switch>
      <div>{/* contant */}</div>
      <footer>{/* footer */}</footer>
    </div>
  );
}

export default App;
