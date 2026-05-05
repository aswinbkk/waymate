import React from "react";
import styled from "styled-components";
import NavBar from "../src/components/NavBar"

const StyledButton = styled.button`
 background-color: #6200ea;
 color: white;
 padding: 10px 20px;
 border: none;
 border-radius: 5px;
 font-size: 1rem;
 cursor: pointer;
 &:hover {
   background-color: #ff69b4;
 }
`;

const App = () => {
 return (
   <div>
   <NavBar></NavBar>
     <h1>Hello Styled Components</h1>
     <StyledButton>Click Me</StyledButton>
   </div>
 );
};
export default App;