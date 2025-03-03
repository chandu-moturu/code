import React, { useContext, useEffect } from "react";
// import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashboardData, cancelAppointment, dashboardData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken]);

  return (
    dashboardData && (
      <div  className="dashboard-main">
        <div>
          <div >
            <img   alt="" />
            <div>
              <p >
                {dashboardData.emps}
              </p>
              <p >Emps</p>
            </div>
          </div>
          <div >
            {/* <img  src={assets.appointments_icon} alt="" /> */}
            <div>
              <p >
                {dashboardData.appointments}
              </p>
              <p >Appointments</p>
            </div>
          </div>
          <div >
            {/* <img  src={assets.patients_icon} alt="" /> */}
            <div>
              <p>
                {dashboardData.users}
              </p>
              <p>Users</p>
            </div>
          </div>
        </div>

        <div >
          <div >
            {/* <img src={assets.list_icon} alt="" /> */}
            <p >Latest Bookings</p>
          </div>

          <div >
            {dashboardData.latestAppointments.slice(0, 5).map((item, index) => (
              <div
                
                key={index}
              >
                <img
                  
                  src={item.docData.image}
                  alt=""
                />
                <div>
                  <p >
                    {item.docData.name}
                  </p>
                  <p >
                    Booking on {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p >Cancelled</p>
                ) : item.isCompleted ? (
                  <p >
                    Completed
                  </p>
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
      </div>
    )
  );
};

export default Dashboard;
