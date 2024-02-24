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
            <Route element={<PrivateRoute />}>
              <Route path="/InvoiceForm" element={<InvoiceForm />} />
              <Route path="/PreviousBills" element={<PreviousBills />} />
              <Route path="/Bills" element={<Bills />} />
              <Route path="/Register" element={<Register />} />
            </Route>
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
