import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import RelatedEmps from "../../components/relatedEmps/RelatedEmps";
import axios from "axios";
import { toast } from "react-toastify";

interface EmpSlot {
  datetime: Date;
  time: string;
}

interface EmpInfo {
  id: string;
  name: string;
  degree: string;
  speciality: string;
  experience: string;
  about: string;
  fees: number;
  slots_booked: Record<string, string[]>; // Key is slotDate, value is an array of booked time slots
}

interface AppointmentProps {
  empId: string;
}

const Appointment: React.FC = () => {
  const { empId } = useParams<AppointmentProps>();
  const { emps, currencySymbol, backendUrl, token, getEmpsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [empInfo, setEmpInfo] = useState<EmpInfo | null>(null);
  const [empSlots, setEmpSlots] = useState<EmpSlot[][]>([]);
  const [slotIndex, setSlotIndex] = useState<number>(0);
  const [slotTime, setSlotTime] = useState<string>("");

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    console.log("Fetching emp info...");
    const selectedEmp = emps.find((emp) => emp._id === empId);
    console.log("Selected Employee:", selectedEmp);
    setEmpInfo(selectedEmp || null); // If no employee found, set null
  };

  const getAvailableSolts = async () => {
    if (!empInfo) return;
    console.log("Getting available slots...");

    setEmpSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots: EmpSlot[] = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable =
          empInfo.slots_booked[slotDate] &&
          empInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setEmpSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book appointment");
      return navigate("/login");
    }

    if (!empSlots[slotIndex]?.[0]) return; // Check if the selected slot exists

    const date = empSlots[slotIndex][0].datetime;

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const slotDate = `${day}_${month}_${year}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { empId, slotDate, slotTime },
        { headers: { authorization: token } }
      );
      if (data.success) {
        toast.success(data.message);
        getEmpsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while booking the appointment"
      );
    }
  };

  useEffect(() => {
    console.log("empId from params:", empId);
    console.log("emps from context:", emps);

    if (emps.length > 0 && empId) {
      fetchDocInfo();
    }
  }, [emps, empId]);

  useEffect(() => {
    if (empInfo) {
      console.log("Employee info fetched, getting available slots...");
      getAvailableSolts();
    }
  }, [empInfo]);

  return empInfo ? (
    <div>
      <h1>Appointment Page</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          {/* <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={empInfo.image} alt="" /> */}
        </div>

        <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {empInfo.name}
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {empInfo.degree} - {empInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {empInfo.experience}
            </button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
              About
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {empInfo.about}
            </p>
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-800">
              {currencySymbol}
              {empInfo.fees}
            </span>
          </p>
        </div>
      </div>

      <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {empSlots.length &&
            empSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-[#DDDDDD]"
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {empSlots.length &&
            empSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                key={index}
                className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? "bg-primary text-white"
                    : "text-[#949494] border border-[#B4B4B4]"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6"
        >
          Book an appointment
        </button>
      </div>

      <RelatedEmps speciality={empInfo?.speciality} empId={empId} />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Appointment;
