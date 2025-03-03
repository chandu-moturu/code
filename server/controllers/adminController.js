import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";
import empModel from "../models/empModel.js";

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// to get appointments List
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    req.json({ success: false, message: error.message });
  }
};

const addEmp = async (req, res) => {
  console.log(req.body)
  try {
    const {
      name,
      email,
      password,
      speciality,
      experience,
      about,
      fees,
      address,
    } = req.body;
    
    // const imageFile = req.imageFile;

    console.log("name",name)

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      console.log( name, email, password, speciality, experience,about,fees,address)
      return res.json({ success: false, message: "Missing Details" });
      
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const existingUser = await empModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resourse_type: "image"})
    // const imageUrl = imageUpload.secure_url
    const imageUrl = "google.com";

    const empData = {
      name,
      email,
      // image: imageUrl,
      password: hashedPassword,
      speciality,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      address,
      date: Date.now(),
    };

    const newEmp = new empModel(empData);
    await newEmp.save();

    res.json({ success: true, message: "Employee Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};




const allEmps = async (req, res) => {
  try {
    const emps = await empModel.find({}).select("-password");
    res.json({ success: true, emps });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminDashboard = async (req, res) => {
  try {
    const emps = await empModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashboardData = {
      emps: emps.length,
      appointments: appointments.length,
      customers: users.length,
      latestAppointments: appointments.reverse(),
    };
    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  addEmp,
  allEmps,
  adminDashboard,
};
