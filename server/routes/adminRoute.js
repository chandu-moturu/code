import express from "express";
import { loginAdmin,addEmp,appointmentCancel,appointmentsAdmin,adminDashboard, allEmps} from "../controllers/adminController.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/empController.js";


const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/add-emp", authAdmin, addEmp);

adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);

adminRouter.get("/all-emps", authAdmin, allEmps);
adminRouter.post("/change-availability", authAdmin, changeAvailablity);
adminRouter.get("/dashboard", authAdmin, adminDashboard);


export default adminRouter;