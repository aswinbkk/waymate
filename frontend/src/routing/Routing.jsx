import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import About from "../pages/About";
import Help from "../pages/Help";


const Routing = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/About" element={<About />} />
                <Route path="/Help" element={<Help />} />
            </Routes>
        </>
    )
}

export default Routing