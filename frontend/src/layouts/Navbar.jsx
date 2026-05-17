import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Search from "../components/Search";

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

  @media (max-width: 992px) {
    padding: 0 20px;
  }
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;

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

  @media (max-width: 992px) {
    display: none;
  }
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
  }
`;

const NavbarSearch = styled.div`
  display: flex;
  align-items: center;

  width: 250px;

  padding: 10px 14px;

  border-radius: 14px;

  background: rgba(241, 245, 249, 0.9);

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    background: white;

    box-shadow:
      0 0 0 4px rgba(56, 189, 248, 0.12);
  }

  img {
    width: 16px;
    opacity: 0.55;
  }

  span {
    margin-left: 10px;

    font-size: 14px;

    color: #64748b;
  }
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
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
  background:
    linear-gradient(
      135deg,
      #22c55e,
      #06b6d4,
      #2563eb
    );

  color: white;
  font-weight: 700;
  cursor: pointer;
  &:hover { 
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(37, 99, 235, 0.24); 
  }
`;

const Navbar = () => {

  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <>
      <NavbarContainer>

        <NavbarLeft>

          <img src="/waymate_wordmark_logo.png" alt="waymate Logo" />

        </NavbarLeft>

        <NavbarCenter>

          <NavLinks>
            <Link to="/">Home</Link>
            <Link to="/">User Ride</Link>
            <Link to="/">Agency Ride</Link>
            <Link to="/help">Help</Link>
            <Link to="/about">About</Link>
          </NavLinks>

          <NavbarSearch
            onClick={() => setShowSearch(true)}
          >
            <img
              src="/search_icon.png"
              alt="search"
            />

            <span>
              Search ride...
            </span>
          </NavbarSearch>

        </NavbarCenter>

        <NavbarRight>

          {
            isLoggedIn ? (
              <>

                <StyledLink to="/user">
                  <LoginButton>
                    Profile
                  </LoginButton>
                </StyledLink>

                <SignupButton
                  onClick={handleLogout}
                >
                  Logout
                </SignupButton>

              </>
            ) : (
              <>

                <StyledLink to="/login">
                  <LoginButton>
                    Login
                  </LoginButton>
                </StyledLink>

                <StyledLink to="/register">
                  <SignupButton>
                    Get Started
                  </SignupButton>
                </StyledLink>

              </>
            )
          }

        </NavbarRight>

      </NavbarContainer>

      {
        showSearch && (
          <Search
            setShowSearch={setShowSearch}
          />
        )
      }
    </>
  );
};

export default Navbar;