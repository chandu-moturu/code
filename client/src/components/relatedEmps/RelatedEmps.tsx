import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";


const RelatedEmptors = ({ speciality, empId }) => {
  const navigate = useNavigate();
  const { emps } = useContext(AppContext);

  const [relEmp, setRelEmp] = useState([]);

  useEffect(() => {
    if (emps.length > 0 && speciality) {
      const empsData = emps.filter(
        (emp) => emp.speciality === speciality && emp._id !== empId
      );
      setRelEmp(empsData);
    }
  }, [emps, speciality, empId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626]">
      <h1 className="text-3xl font-medium">Related Emps</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted Emps.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relEmp.map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
           
            key={index}
          >
            <img className="bg-[#EAEFFF]" src={item.image} alt="" />
            <div className="p-4">
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
              <p className="text-[#262626] text-lg font-medium">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <button className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'>more</button> */}
    </div>
  );
};

export default RelatedEmptors;
