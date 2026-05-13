import { Route, Routes } from "react-router-dom";
import Navbar from "../Pages/Navbar";
import Footer from "../Pages/Footer";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Search from "../Pages/Search";


const MainRoute = () => {
    return (
        <>
            <Routes>
                <Route path='/Search' element={<Search />} />
                <Route path='/SignIn' element={<SignIn />} />
                <Route path='/SignUp' element={<SignUp />} />
            </Routes>
        </>
    )
}

export default MainRoute