import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarContainer = styled.nav`
  width: 100%;
  height: 80px;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(0, 119, 255, 0.08);
  box-shadow: 0 4px 30px rgba(15, 23, 42, 0.06);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  img {
    height: 42px;
    object-fit: contain;
    cursor: pointer;
  }
`;

const NavbarCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  a {
    text-decoration: none;
    color: #0f172a;
    font-size: 15px;
    font-weight: 600;
    position: relative;
    transition: 0.3s;
    &:hover {
      color: #0284c7;
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 0%;
      height: 2px;
      background: linear-gradient(
        90deg,
        #22c55e,
        #06b6d4,
        #2563eb
      );
      transition: 0.3s;
      border-radius: 20px;
    }
    &:hover::after {
      width: 100%;
    }
  }
`;

const NavbarSearch = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(241, 245, 249, 0.9);
  border: 1px solid transparent;
  transition: 0.3s;
  &:focus-within {
    border: 1px solid #38bdf8;
    background: white;
    box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.12);
  }
  img {
    width: 16px;
    opacity: 0.55;
  }
  input {
    width: 100%;
    margin-left: 10px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    color: #0f172a;
    &::placeholder {
      color: #64748b;
    }
  }
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LoginButton = styled.button`
  padding: 10px 18px;
  border-radius: 12px;
  border: 1px solid rgba(2, 132, 199, 0.18);
  background: white;
  color: #0369a1;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: rgba(14, 165, 233, 0.08);
    border-color: #38bdf8;
  }
`;

const SignupButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    #22c55e,
    #06b6d4,
    #2563eb
  );
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: 0.35s;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.18);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(37, 99, 235, 0.24);
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarLeft>
        <img
          src="/waymate_wordmark_logo.png"
          alt="WayMate Logo"
        />
      </NavbarLeft>

      <NavbarCenter>
        <NavLinks>
          <Link to="/Search">Home</Link>
          <Link to="/Search">User Ride</Link>
          <Link to="/Search">Agency Ride</Link>
          <Link to="/Search">About</Link>
        </NavLinks>

        <NavbarSearch>
          <img src="/search_icon.png" alt="search" />
          <input type="text" placeholder="Search ride..." />
        </NavbarSearch>
      </NavbarCenter>

      <NavbarRight>
        <LoginButton>
          <Link to="/SignIn">SignIn</Link>
        </LoginButton>
        <SignupButton>
          <Link to="/SignUp">Get Started</Link>
        </SignupButton>
      </NavbarRight>
    </NavbarContainer>
  );
};

export default Navbar;