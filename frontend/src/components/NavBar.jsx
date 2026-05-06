import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarLeft = styled.div`
  width: 50px;
`;

const NavbarCenter = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

const NavbarSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarCenterUl = styled.ul`
  list-style: none;
  display: flex;
  gap: 2em;
`;

const NavbarRight = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  max-width: 70px;
  color: red;
  background-color: green;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarLeft>
        <img src="/waymate_standalone_icon.png" alt="logo" />
      </NavbarLeft>

      <NavbarCenter>
        <NavbarSearch>

        </NavbarSearch>
        <NavbarCenterUl>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </NavbarCenterUl>
      </NavbarCenter>

      <NavbarRight>
        <Button>Login</Button>
        <Button>Sign Up</Button>
      </NavbarRight>
    </NavbarContainer>
  );
};

export default Navbar;