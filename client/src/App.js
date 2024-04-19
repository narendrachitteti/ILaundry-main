import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound.js";
import Landing from "./Landing/App.js";
import Login from "./components/Login/Login.js";
import PreLoader from "./Pages/Loading.js";
import InvoiceForm from "./Pages/InvoiceForm.js";
import PreviousBills from "./Pages/PreviousBills.js";
import { useEffect, useState } from "react";
import Bills from "./Pages/Bills.js";
import PrivateRoute from "./ProtectedRoute/ProtectedRoute.js";
import Register from "./components/Register/Register.jsx";
import Registration from "./components/Registration/Registration.js";
import OldLogin from "./components/Registration/OldLogin.js";
import StaffLogin from "./components/Registration/StaffLogin.js";
import ContactForm from "./sections/ContactForm.js";
import Userlist from "./components/Userlist.js";
import Dashboard from "./Pages/Dashboard.js";
import OrdersTable from "./Pages/OrdersTable.js";
import StarRating from "./Pages/StarRating.js";
import StaffNavbar from "./components/StaffNavbar.js";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/InvoiceForm" element={<InvoiceForm />} />
            <Route path="/PreviousBills" element={<PreviousBills />} />
            <Route path="/Bills" element={<Bills />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/OldLogin" element={<OldLogin />} />
            <Route path="/StaffLogin" element={<StaffLogin />} />
            <Route element={<PrivateRoute />}></Route>
            <Route path="/contact" component={ContactForm} />
            <Route path="/Userlist" element={<Userlist />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rating" element={<StarRating />} />
            <Route path="/orderstable" element={<OrdersTable />} />

            <Route path="/stafflogin" element={<StaffNavbar/>}/>
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
