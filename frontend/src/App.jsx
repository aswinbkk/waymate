import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";


const App = () => {
  return (
    <>
      <Navbar />
      <SignIn />
      <SignUp />
      <Footer />
    </>
  );
};

export default App;