// import { useTranslation } from "react-i18next";
import "./App.css";
// import PanoramaViewer from "./components/PanoramaViewer/PanoramaViewer";
import Navbar from "./components/navbar/Navbar";
import { Home } from "./pages/Home/Home";
import { Services } from "./pages/services/Services";
import Footer from "./components/Footer/Footer";
import Team from "./pages/Team/Team";
import Lines from "./components/lines/Lines";
import ScrollUpButton from "./components/scrollUpButton/ScrollUpButton";
import Banner from "./components/banner/Banner";

import {Routes, Route} from 'react-router-dom';
import Login from "./pages/Login/Login";
import Contact from "./pages/contact/Contact";
import MyProfile from "./pages/MyProfile/MyProfile";
import Emps from "./pages/Emps/Emps";
import MyAppointments from "./pages/myAppointments/MyAppointments";
import Appointment from "./pages/appointment/Appointment";
// import {ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  // const { t, i18n } = useTranslation();

  // const toggleLanguage = () => {
  //   const newLang = i18n.language === "de" ? "en" : "de";
  //   i18n.changeLanguage(newLang);
  // };

  return (
    <div className="app-main">
      <Navbar />

      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/my-profile" element={<MyProfile/>}/>
          <Route path="/emps" element={<Emps/>}/>
          <Route path="/emps/:speciality" element={<Emps/>}/>
          <Route path="/my-appointments" element={<MyAppointments/>}/>
          <Route path="/appointment/:empId" element={<Appointment/>}/>
        </Routes>
        {/* <Home />
        <Services />
        <Team />
        <Banner/> */}
      </div>
      <Lines />
      <Footer />
      <ScrollUpButton />
    </div>
  );
};

export default App;


//  <div className="test">
//    <h1>{t("welcome")}</h1>
//    <p>{t("name")}</p>

//    <div>
//      <button onClick={toggleLanguage}>
//        {i18n.language === "de" ? "English" : "Deutsch"}
//      </button>

//      {/* <PanoramaViewer/> */}
//    </div>
//  </div>;