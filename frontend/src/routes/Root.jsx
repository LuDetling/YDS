import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home/Home";
import Profil from "../pages/Profil/Profil";
import Idees from "../pages/Idees/Idees";

export default function Root() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profil" element={<Profil />} />
        <Route path="idees" element={<Idees />} />
      </Routes>
    </>
  );
}
