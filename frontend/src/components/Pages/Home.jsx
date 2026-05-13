import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Search from "./Search";


const Home = () => {
    return (
        <>
           <Navbar/>
           <Footer/>
        </>
    )
}

export default Home