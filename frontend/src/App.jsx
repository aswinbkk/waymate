import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SearchRide from "./components/rides/SearchRide";


const App = () => {
  return (
    <>
      {/* <Navbar />
      <SignIn />
      <SignUp />
      <Footer /> */}

      <SearchRide/>
    </>
  );
};

export default App;