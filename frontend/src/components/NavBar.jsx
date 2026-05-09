import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 50px;
  background: linear-gradient(90deg, #0f172a, #020617);
  color: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 38px;
  }
`;

const NavbarCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const NavbarSearch = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.05);
  padding: 8px 14px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  transition: 0.3s;

  &:focus-within {
    border: 1px solid #38bdf8;
  }

  img {
    width: 16px;
    opacity: 0.7;
  }

  input {
    background: transparent;
    border: none;
    outline: none;
    color: white;
    margin-left: 10px;
    width: 180px;
  }
`;

const NavbarRight = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 7px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s;

  &:first-child {
    background: transparent;
    color: white;
    border: 1px solid #38bdf8;
  }

  &:last-child {
    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
    color: black;
    font-weight: 600;
  }

  &:hover {
    box-shadow: 0 4px 10px rgba(56,189,248,0.3);
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>

      <NavbarLeft>
        <img src="/waymate_standalone_icon.png" alt="logo" />
      </NavbarLeft>

      <NavbarCenter>
        <NavbarSearch>
          <img src="/search_icon.png" alt="search" />
          <input type="text" placeholder="Search rides..." />
        </NavbarSearch>
      </NavbarCenter>

      <NavbarRight>
        <Button>Login</Button>
        <Button>Sign Up</Button>
      </NavbarRight>

    </NavbarContainer>
  );
};

export default Navbar;