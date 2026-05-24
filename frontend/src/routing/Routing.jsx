import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import About from "../pages/About";
import Help from "../pages/Help";
import Profile from "../pages/Profile";
import MyTrip from "../pages/MyTrip";
import SearchResults from "../pages/SearchResults";


const Routing = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-trip" element={<MyTrip />} />
                <Route path="/search-results" element={<SearchResults />} />
            </Routes>
        </>
    )
}

export default Routing