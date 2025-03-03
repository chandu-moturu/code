import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import './myAppointments.css'


const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<any[]>([]);


  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Function to format the date eg. (20_01_2000 => 20 Jan 2000)
  const slotDateFormat = (slotDate: string) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  // Getting User Appointments Data Using API
  const getUserAppointments = async () => {
    try {
      if (!token) {
        toast.error("User not logged in or token missing.");
        return;
      }

      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { authorization: token },
      });

      if (data.appointments && Array.isArray(data.appointments)) {
        setAppointments(data.appointments); // Ensure you only set an array
      } else {
        setAppointments([]); // Fallback to an empty array if no appointments
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to cancel appointment Using API
  const cancelAppointment = async (appointmentId: string) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { authorization:token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };


  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="appointments-main">
      
      <h1>My Appointments</h1>
    
    
      <div className="">
        {appointments.length === 0 ? (
          <p>No appointments available.</p>
        ) : (
          appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
            >
              <div>
                <img
                  className="w-36 bg-[#EAEFFF]"
                  src={item.empData.image}
                  alt=""
                />
              </div>
              <div className="flex-1 text-sm text-[#5E5E5E]">
                <p className="text-[#262626] text-base font-semibold">
                  {item.empData.name}
                </p>
                <p>{item.empData.speciality}</p>
                <p className="text-[#464646] font-medium mt-1">Address:</p>
                <p>{item.empData.address.line1}</p>
                <p>{item.empData.address.line2}</p>
                <p className="mt-1">
                  <span className="text-sm text-[#3C3C3C] font-medium">
                    Date & Time:
                  </span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end text-sm text-center">
               
          
                {!item.cancelled  && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border rounded text-[#696969]  bg-[#EAEFFF]">
                    Pending appointment
                  </button>
                )}

                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                    Completed
                  </button>
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Cancel appointment
                  </button>
                )}
                {item.cancelled && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
