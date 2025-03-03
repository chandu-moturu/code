import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
// import { assets } from "../assets/assets";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [image, setImage] = useState(false);

  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);

  // Function to update user profile data using API
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      // image && formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { authorization:token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error:any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <div >
        <h1>My Profile</h1>
      {isEdit ? (
        <label htmlFor="image">
          <div >
            <img
            //   className="w-36 rounded opacity-75"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt=""
            />
            {/* <img
            //   className="w-10 absolute bottom-12 right-12"
              src={image ? "" : assets.upload_icon}
              alt=""
            /> */}
          </div>
          {/* <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          /> */}
        </label>
      ) : (
        <img  src={userData.image} alt="" />
      )}

      {isEdit ? (
        <input
          
          type="text"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          value={userData.name}
        />
      ) : (
        <p >
          {userData.name}
        </p>
      )}

      <hr />

      <div>
        <p >CONTACT INFORMATION</p>
        <div >
          <p >Email id:</p>
          <p >{userData.email}</p>
          <p >Phone:</p>

          {isEdit ? (
            <input
            //   className="bg-gray-50 max-w-52"
              type="text"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              value={userData.phone}
            />
          ) : (
            <p >{userData.phone}</p>
          )}

          <p >Address:</p>

          {isEdit ? (
            <p>
              <input
                // className="bg-gray-50"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData?.address?.line1}
              />
              <br />
              <input
                // className="bg-gray-50"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData?.address?.line2}
              />
            </p>
          ) : (
            <p>
              {userData?.address?.line1} <br /> {userData?.address?.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p >BASIC INFORMATION</p>
        <div >
          <p >Gender:</p>

          {isEdit ? (
            <select
            //   className="max-w-20 bg-gray-50"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p >{userData.gender}</p>
          )}

          <p >Birthday:</p>

          {isEdit ? (
            <input
              className="max-w-28 bg-gray-50"
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob}
            />
          ) : (
            <p className="text-gray-500">{userData.dob}</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            // className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Save information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            // className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default MyProfile;
