import React from "react";
import Routing from "./routing/Routing";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routing />
    </>
  );
};

export default App;