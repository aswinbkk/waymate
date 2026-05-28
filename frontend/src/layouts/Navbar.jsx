import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import Search from "../components/Search";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import {logoutUser} from "../api/apiUser"

const NavbarContainer = styled.nav`
  width: 100%;
  height: 80px;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(0, 119, 255, 0.08);
  box-shadow: 0 4px 30px rgba(15, 23, 42, 0.06);
  @media (max-width: 992px) {
    padding: 0 20px;
  }
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 42px;
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
    transition: 0.3s;
    &:hover {
      color: #0284c7;
    }
  }
`;

const NavbarSearch = styled.div`
  width: 250px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  border-radius: 14px;
  background: #f1f5f9;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: white;
    box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.12);
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
  position: relative;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const OutlineButton = styled.button`
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
  }
`;

const GradientButton = styled.button`
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
  transition: 0.3s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const MenuContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 55px;
  right: 0;
  width: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: white;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 14px 40px rgba(15, 23, 42, 0.12);
  animation: fadeIn 0.2s ease;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MenuItem = styled(Link)`
  padding: 12px 14px;
  text-decoration: none;
  border-radius: 12px;
  color: #0f172a;
  font-size: 14px;
  font-weight: 600;
  transition: 0.3s;
  &:hover {
    background: #f1f5f9;
    color: #0284c7;
  }
`;

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

// Logout
const handleLogout = async () => {

  try {

    const response =
      await logoutUser();

    if (response.success) {

      setUser(null);

      toast.success(
        "Logout Successful"
      );

      navigate("/login");

    } else {

      toast.error(
        response.msg ||
        "Logout Failed"
      );
    }

  } catch (error) {

    console.error(error);

    toast.error(
      "Something went wrong"
    );
  }
};

  // Close menu outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <>
      <NavbarContainer>
        <NavbarLeft>
          <img
            src="/waymate_wordmark_logo.png"
            alt="waymate"
            onClick={() => navigate("/")}
          />
        </NavbarLeft>

        <NavbarCenter>
          <NavLinks>
            <Link to="/">Home</Link>
            <Link to="/">User Ride</Link>
            <Link to="/">Agency Ride</Link>
            <Link to="/help">Help</Link>
            <Link to="/about">About</Link>
          </NavLinks>

          <NavbarSearch onClick={() => setShowSearch(true)}>
            <img src="/search_icon.png" alt="search" />
            <span>Search ride...</span>
          </NavbarSearch>
        </NavbarCenter>

        <NavbarRight>
          {user ? (
            <>
              <MenuContainer ref={menuRef}>
                <OutlineButton
                  onClick={() => setShowMenu(!showMenu)}
                >
                  Menu
                </OutlineButton>

                {showMenu && (
                  <DropdownMenu>
                    <MenuItem to="/profile">
                      My Profile
                    </MenuItem>

                    <MenuItem to="/my-trip">
                      My Trips
                    </MenuItem>
                  </DropdownMenu>
                )}
              </MenuContainer>

              <GradientButton onClick={handleLogout}>
                Logout
              </GradientButton>
            </>
          ) : (
            <>
              <StyledLink to="/login">
                <OutlineButton>
                  Login
                </OutlineButton>
              </StyledLink>

              <StyledLink to="/register">
                <GradientButton>
                  Get Started
                </GradientButton>
              </StyledLink>
            </>
          )}
        </NavbarRight>
      </NavbarContainer>

      {showSearch && (
        <Search setShowSearch={setShowSearch} />
      )}
    </>
  );
};

export default Navbar;