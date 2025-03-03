import { createContext, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'

export const EmpContext = createContext()

const EmpContextProvider = (props) => {
  const backendUrl = `http://localhost:5000/api`;

  const [eToken, setEToken] = useState(
    localStorage.getItem("eToken") ? localStorage.getItem("eToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/emp/appointments`, {
        headers: { authorization: eToken },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/emp/profile`, {
        headers: { authorization:eToken },
      });
      console.log(data.profileData);
      setProfileData(data.profileData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/emp/cancel-appointment`,
        { appointmentId },
        { headers: { eToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        // after creating dashboard
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/emp/complete-appointment`,
        { appointmentId },
        { headers: { eToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        // Later after creating getDashData Function
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/emp/dashboard`, {
        headers: { authorization: eToken },
      });

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    eToken,
    setEToken,
    backendUrl,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    dashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
  };

  return (
    <EmpContext.Provider value={value}>
      {props.children}
    </EmpContext.Provider>
  );
};

export default EmpContextProvider;