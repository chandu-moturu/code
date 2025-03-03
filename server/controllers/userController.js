import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import empModel from "../models/empModel.js";
import appointmentModel from "../models/appointmentModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    console.log(name,email)

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    // const imageFile = req.file

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      // address: JSON.parse(address),
      address,
      dob,
      gender,
    });

    // if (imageFile) {
    //   const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
    //     resource_type: "image",
    //   });
    //   const imageURL = imageUpload.secure_url;

    //   await userModel.findByIdAndUpdate(userId, { image: imageURL });
    // }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { userId, empId, slotDate, slotTime } = req.body;

    // Fetch employee data and ensure it's not circular
    const empData = await empModel.findById(empId).select("-password");

    if (!empData.available) {
      return res.json({ success: false, message: "Employee Not Available" });
    }

    let slots_booked = empData.slots_booked;

    // Check if slot is available and update slots_booked
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot Not Available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    // Fetch user data and ensure it's correct
    const userData = await userModel.findById(userId).select("-password");

    // Create a clean version of empData without the slots_booked
    const empDataToSave = { ...empData._doc, slots_booked: undefined };

    // Create appointment data without the circular references
    const appointmentData = {
      userId,
      empId,
      userData, // Ensure you pass the cleaned up userData
      empData: empDataToSave, // Pass the cleaned up empData
      amount: empData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    // Create and save the appointment
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Update employee slots_booked in the database
    await empModel.findByIdAndUpdate(empId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { empId, slotDate, slotTime } = appointmentData;
    const empData = await empModel.findById(empId);

    let slots_booked = empData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await emptorModel.findByIdAndUpdate(empId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;

    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
};
