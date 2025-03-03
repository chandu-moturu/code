import axios from 'axios'
import { createContext, useState } from 'react'
import {toast} from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
  const backendUrl = `http://localhost:5000/api`;

  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const [appointments, setAppointments] = useState([]);
  const [emps, setEmps] = useState([]);
  const [dashboardData, setDashboardData] = useState(false);

  const getAllEmps = async () => {
    try {
      console.log(aToken)
      const { data } = await axios.get(`${backendUrl}/admin/all-emps`, {
        headers: { authorization: aToken },
      });
      console.log(data)
      if (data.success) {
        setEmps(data.emps);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (empId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/admin/change-availability`,
        { empId },
        { headers: { authorization: aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllEmps();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/admin/appointments`, {
        headers: { authorization: aToken },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/admin/cancel-appointment`,
        { appointmentId },
        { headers: { authorization: aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/admin/dashboard`, {
        headers: { authorization: aToken },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    emps,
    getAllEmps,
    changeAvailability,
    appointments,
    getAllAppointments,
    getDashboardData,
    cancelAppointment,
    dashboardData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

