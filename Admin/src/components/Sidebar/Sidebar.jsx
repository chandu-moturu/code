import React, { useContext } from "react";
// import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { EmpContext } from "../../context/EmpContext";
import { AdminContext } from "../../context/AdminContext";
import './sidebar.css'

const Sidebar = () => {
  const { eToken } = useContext(EmpContext);
  const { aToken } = useContext(AdminContext);

  return (
    <div className="sidebar-main">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            {/* <img className="min-w-5" src={assets.home_icon} alt="" /> */}
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            to={"/all-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            {/* <img className="min-w-5" src={assets.appointment_icon} alt="" /> */}
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            to={"/add-emp"}
            className={({ isActive }) =>
              ` ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            {/* <img className="min-w-5" src={assets.add_icon} alt="" /> */}
            <p className="hidden md:block">Add Emp</p>
          </NavLink>
          <NavLink
            to={"/emp-list"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            {/* <img className="min-w-5" src={assets.people_icon} alt="" /> */}
            <p className="hidden md:block">Emps List</p>
          </NavLink>
        </ul>
      )}

      {eToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to={"/emp-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            {/* <img className="min-w-5" src={assets.home_icon} alt="" /> */}
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            to={"/emp-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            {/* <img className="min-w-5" src={assets.appointment_icon} alt="" /> */}
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            to={"/emp-profile"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            {/* <img className="min-w-5" src={assets.people_icon} alt="" /> */}
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
