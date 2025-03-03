import React, { useContext } from "react";
import { EmpContext } from "./context/EmpContext";
import { AdminContext } from "./context/AdminContext";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import AllAppointments from "./pages/admin/AllAppointments";
import AddEmp from "./pages/admin/AddEmp";
import EmpsList from "./pages/admin/EmpList";
import Login from "./pages/login/Login";
import EmpAppointments from "./pages/emp/EmpAppointments";
import EmpDashboard from "./pages/emp/EmpDashboard";
import EmpProfile from "./pages/emp/EmpProfile";
import './App.css'

const App = () => {
  const { eToken } = useContext(EmpContext);
  const { aToken } = useContext(AdminContext);

  return eToken || aToken ? (
    <div className="app-main">
      <ToastContainer />
      <Navbar />
      <div className="app-container">
        <Sidebar />
        <div className="routes-container">
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-emp" element={<AddEmp />} />
            <Route path="/emp-list" element={<EmpsList />} />
            <Route path="/emp-dashboard" element={<EmpDashboard />} />
            <Route path="/emp-appointments" element={<EmpAppointments />} />
            <Route path="/emp-profile" element={<EmpProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  );
};

export default App;
