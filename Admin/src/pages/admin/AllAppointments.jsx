import React, { useEffect } from "react";
// import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } =
    useContext(AdminContext);
  const { slotDateFormat, calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="appointments-main">
      <p >All Appointments</p>

      <div className="appointments-container" >
        <div className="table-header">
          <p>#</p>
          <p>Customer</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Emp</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            
            key={index}
          >
            <p >{index + 1}</p>
            <div>
              <img
                // src={item.userData.image}
               
                alt=""
              />{" "}
              <p>{item.userData.name}</p>
            </div>
            <p >{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <div >
              <img
                src={item.docData.image}
                
                alt=""
              />{" "}
              <p>{item.docData.name}</p>
            </div>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p >Cancelled</p>
            ) : item.isCompleted ? (
              <p >Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                
                // src={assets.cancel_icon}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
