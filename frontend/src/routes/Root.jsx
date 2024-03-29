import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home/Home";
import Profil from "../pages/Profil/Profil";
import Idees from "../pages/Idees/Idees";
import Agenda from "../pages/Agenda/Agenda";
import Login from "../pages/Log/Login";
import Signup from "../pages/Log/Signup";
import Footer from "../components/Footer";

export default function Root() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profil" element={<Profil />} />
        <Route path="idees" element={<Idees />} />
        <Route path="agenda/:date" element={<Agenda />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}
