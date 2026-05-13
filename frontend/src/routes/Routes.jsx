import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const Routes = () => {
    return (
        <>
            <Routes>
                <Route path= "/Home" element={<Home />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
            </Routes>
        </>
    )
}

export default Routes