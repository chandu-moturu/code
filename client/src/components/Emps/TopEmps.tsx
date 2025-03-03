import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const TopEmps = () => {
  const navigate = useNavigate();

  const { emps } = useContext(AppContext);

  return (
    <div >
      <h1 >Top Emps to Book</h1>
      <p >
        Simply browse through our extensive list of trusted emps.
      </p>
      <div >
        {emps.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
           
            key={index}
          >
            <img  src={item.image} alt="" />
            <div >
              <div
                // className={`flex items-center gap-2 text-sm text-center ${
                //   item.available ? "text-green-500" : "text-gray-500"
                // }`}
              >
                <p
                //   className={`w-2 h-2 rounded-full ${
                //     item.available ? "bg-green-500" : "bg-gray-500"
                //   }`}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p >{item.name}</p>
              <p >{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/emps");
          scrollTo(0, 0);
        }}
     
      >
        more
      </button>
    </div>
  );
};

export default TopEmps;
