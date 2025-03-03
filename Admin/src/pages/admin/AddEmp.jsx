import React, { useContext, useState } from "react";
// import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import "./admin.css";

const AddEmp = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  // const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  // const [address2, setAddress2] = useState("");

  const { backendUrl } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

const onSubmitHandler = async (event) => {
  event.preventDefault();

  if (
    !name ||
    !email ||
    !password ||
    !experience ||
    !fees ||
    !about ||
    !address1
  ) {
    return toast.error("Please fill in all fields.");
  }

  try {

    const formData = {
      name,
      email,
      password,
      experience,
      fees: Number(fees),
      about,
      speciality,
      address: JSON.stringify({ line1: address1 }),
    };

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });

    console.log(formData)
    
    const { data } = await axios.post(`${backendUrl}/admin/add-emp`, formData, {
      headers: {
        authorization: aToken,
      },
    });

    if (data.success) {
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setAddress1("");
      setAbout("");
      setFees("");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error(error.message);
  }
};

  return (
    <form onSubmit={onSubmitHandler} className="form-main">
      <h3>Add Emp</h3>

      <div className="form-container">
        <div className="form-row">
          <div className="form-image">
            {/* <label htmlFor="doc-img">
              <img
                //   src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt=""
              />
            </label> */}
            <p>Upload emp picture</p>
            <input
              // onChange={(e) => setDocImg(e.target.files[0])}
              type="file"
              name=""
              id="doc-img"
              // hidden
            />
          </div>
          <div>
            <p>Your name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <p>Emp Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <p>Set Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <p>Experience</p>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              className="select-box"
            >
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Years</option>
              <option value="3 Year">3 Years</option>
              <option value="4 Year">4 Years</option>
              <option value="5 Year">5 Years</option>
              <option value="6 Year">6 Years</option>
              <option value="8 Year">8 Years</option>
              <option value="9 Year">9 Years</option>
              <option value="10 Year">10 Years</option>
            </select>
          </div>
          <div>
            <p>Fees</p>
            <input
              onChange={(e) => setFees(e.target.value)}
              value={fees}
              type="number"
              placeholder="Emp fees"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <p>Speciality</p>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              className="select-box"
            >
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>
          <div>
            <p>Address</p>
            <input
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              type="text"
              placeholder="Address 1"
              required
            />
          </div>
        </div>
        <div className="form-about-emp">
          <p>About Emp</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            rows={5}
            placeholder="write about emp"
          ></textarea>
        </div>
        <div className="form-button">
          <button type="submit">Add emp</button>
        </div>
      </div>
    </form>
  );
};

export default AddEmp;
