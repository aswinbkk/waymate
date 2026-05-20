import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import { registerUser } from "../api/apiUser";
import { registerAgency } from "../api/apiAgency";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background:
    linear-gradient(
      135deg,
      #f8fafc,
      #eff6ff,
      #ffffff
    );
`;

const Card = styled.div`
  width: 100%;
  max-width: 700px;
  background: white;
  padding: 40px 30px;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  box-shadow:
    0 10px 30px rgba(15,23,42,0.08);

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Logo = styled.img`
  width: 150px;
  display: block;
  margin: 0 auto 24px;
`;

const ToggleContainer = styled.div`
  display: flex;
  background: #f1f5f9;
  border-radius: 14px;
  padding: 4px;
  margin-bottom: 28px;
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: 0.3s;

  background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg,#22c55e,#2563eb)"
      : "transparent"};

  color: ${({ $active }) =>
    $active
      ? "white"
      : "#64748b"};
`;

const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 10px;
`;

const Description = styled.p`
  text-align: center;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  label {
    font-size: 14px;
    font-weight: 600;

    color: #0f172a;
  }
`;

const Input = styled.input`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
  outline: none;
  transition: 0.3s;
  &:focus {
    border-color: #2563eb;
    box-shadow:
      0 0 0 4px rgba(37,99,235,0.1);
  }
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  color: white;
  background:
    linear-gradient(
      135deg,
      #22c55e,
      #06b6d4,
      #2563eb
    );
  transition: 0.3s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const BottomText = styled.p`
  margin-top: 24px;
  text-align: center;
  color: #64748b;
  font-size: 14px;
  a {
    color: #0284c7;
    font-weight: 700;
    text-decoration: none;
    margin-left: 4px;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [registerRole, setRegisterRole] = useState("user");

  // const [popup, setPopup] =
  //   useState({
  //     show: false,
  //     type: "",
  //     title: "",
  //     message: ""
  //   });

  const [userForm, setUserForm] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: ""
    });

  const [agencyForm, setAgencyForm] =
    useState({
      agencyName: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      gstin: "",
      legalName: "",
      tradeName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: ""
    });

  const showPopup = ( type, title, message ) => {
    setPopup({ show: true, type, title, message});
  };

  const handleUserChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    });

  };

  const handleAgencyChange = (e) => {
    setAgencyForm({
      ...agencyForm,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (registerRole === "user") {

        if ( userForm.password !== userForm.confirmPassword ) {
          showPopup( "error", "Password Error", "Passwords do not match" );
          return;
        }

        const userData = {
          fullName: {
            firstName: userForm.firstName,
            lastName: userForm.lastName
          },
          email: userForm.email,
          password: userForm.password,
          phone: userForm.phone
        };

        const response = await registerUser(userData);

        if (response.success) { 
          // showPopup(
          //   "success",
          //   "Registration Successful",
          //   "User account created successfully" );
          setTimeout(() => { navigate("/login"); }, 1200);
        } else {
          // showPopup(
          //   "error",
          //   "Registration Failed",
          //   response.msg );
        }

      } else {
        if ( agencyForm.password !== agencyForm.confirmPassword ) {
          // showPopup(
          //   "error",
          //   "Password Error",
          //   "Passwords do not match" );
          return;
        }

        const agencyData = {
          agencyName: agencyForm.agencyName,
          address: {
            street: agencyForm.street,
            city: agencyForm.city,
            state: agencyForm.state,
            pincode: agencyForm.pincode
          },
          gst: {
            gstin: agencyForm.gstin,
            legalName: agencyForm.legalName,
            tradeName: agencyForm.tradeName
          },
          email: agencyForm.email,
          password: agencyForm.password,
          phone: agencyForm.phone
        };

        const response = await registerAgency(agencyData);

        if (response.success) {
          // showPopup(
          //   "success",
          //   "Registration Successful",
          //   "Agency account created successfully" );

          setTimeout(() => { navigate("/login"); }, 1200);
        }
      }

    } catch (error) {
      console.error(error);
      // showPopup(
      //   "error",
      //   "Registration Failed",
      //   "Something went wrong" );
    }
  };

  return (
    <Layout>
      <Page>
        <Card>
          <Logo src="/waymate_full_logo.png" alt="waymate" />
          <ToggleContainer>
            <ToggleButton
              type="button"
              $active={ registerRole === "user" }
              onClick={() => setRegisterRole("user") } >
              User
            </ToggleButton>

            <ToggleButton
              type="button"
              $active={
                registerRole === "agency"
              }
              onClick={() =>
                setRegisterRole("agency")
              }
            >
              Agency
            </ToggleButton>

          </ToggleContainer>

          <Title>

            {
              registerRole === "user"
                ? "User Register"
                : "Agency Register"
            }

          </Title>

          <Description>
            Create your WayMate account
            and start ride sharing.
          </Description>

          <Form onSubmit={handleSubmit}>

            {
              registerRole === "user" && (
                <>

                  <InputGrid>

                    <InputGroup>

                      <label>
                        First Name
                      </label>

                      <Input
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        value={userForm.firstName}
                        onChange={handleUserChange}
                        required
                      />

                    </InputGroup>

                    <InputGroup>

                      <label>
                        Last Name
                      </label>

                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        value={userForm.lastName}
                        onChange={handleUserChange}
                        required
                      />

                    </InputGroup>

                  </InputGrid>

                  <InputGrid>

                  <InputGroup>

                    <label>
                      Email
                    </label>

                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={userForm.email}
                      onChange={handleUserChange}
                      required
                    />

                  </InputGroup>

                  <InputGroup>

                    <label>
                      Phone
                    </label>

                    <Input
                      type="text"
                      name="phone"
                      placeholder="Enter phone"
                      value={userForm.phone}
                      onChange={handleUserChange}
                      required
                    />

                  </InputGroup>
                  </InputGrid>

                  <InputGrid>

                    <InputGroup>

                      <label>
                        Password
                      </label>

                      <Input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={userForm.password}
                        onChange={handleUserChange}
                        required
                      />

                    </InputGroup>

                    <InputGroup>

                      <label>
                        Confirm Password
                      </label>

                      <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={
                          userForm.confirmPassword
                        }
                        onChange={handleUserChange}
                        required
                      />

                    </InputGroup>

                  </InputGrid>

                  

                </>
              )
            }

            {
              registerRole === "agency" && (
                <>

                  <InputGroup>

                    <label>
                      Agency Name
                    </label>

                    <Input
                      type="text"
                      name="agencyName"
                      placeholder="Enter agency name"
                      value={agencyForm.agencyName}
                      onChange={handleAgencyChange}
                      required
                    />

                  </InputGroup>

                  <InputGrid>

                    <InputGroup>

                      <label>
                        Street
                      </label>

                      <Input
                        type="text"
                        name="street"
                        placeholder="Enter street"
                        value={agencyForm.street}
                        onChange={handleAgencyChange}
                        required
                      />

                    </InputGroup>

                    <InputGroup>

                      <label>
                        City
                      </label>

                      <Input
                        type="text"
                        name="city"
                        placeholder="Enter city"
                        value={agencyForm.city}
                        onChange={handleAgencyChange}
                        required
                      />

                    </InputGroup>

                  </InputGrid>

                  <InputGrid>

                    <InputGroup>

                      <label>
                        State
                      </label>

                      <Input
                        type="text"
                        name="state"
                        placeholder="Enter state"
                        value={agencyForm.state}
                        onChange={handleAgencyChange}
                        required
                      />

                    </InputGroup>

                    <InputGroup>

                      <label>
                        Pincode
                      </label>

                      <Input
                        type="text"
                        name="pincode"
                        placeholder="Enter pincode"
                        value={agencyForm.pincode}
                        onChange={handleAgencyChange}
                        required
                      />

                    </InputGroup>

                  </InputGrid>

                  <InputGrid>

                    <InputGroup>

                      <label>
                        GSTIN
                      </label>

                      <Input
                        type="text"
                        name="gstin"
                        placeholder="Enter GSTIN"
                        value={agencyForm.gstin}
                        onChange={handleAgencyChange}
                        required
                      />

                    </InputGroup>

                    <InputGroup>

                      <label>
                        Legal Name
                      </label>

                      <Input
                        type="text"
                        name="legalName"
                        placeholder="Enter legal name"
                        value={agencyForm.legalName}
                        onChange={handleAgencyChange}
                        required
                      />

                    </InputGroup>

                  </InputGrid>

                  <InputGroup>

                    <label>
                      Trade Name
                    </label>

                    <Input
                      type="text"
                      name="tradeName"
                      placeholder="Enter trade name"
                      value={agencyForm.tradeName}
                      onChange={handleAgencyChange}
                      required
                    />

                  </InputGroup>

                  <InputGrid>

                    <InputGroup>

                      <label>
                        Email
                      </label>

                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={agencyForm.email}
                        onChange={handleAgencyChange}
                        required
                      />

                    </InputGroup>

                    <InputGroup>

                      <label>
                        Phone
                      </label>

                      <Input
                        type="text"
                        name="phone"
                        placeholder="Enter phone"
                        value={agencyForm.phone}
                        onChange={handleAgencyChange}
                        required
                      />

                    </InputGroup>

                  </InputGrid>

                  <InputGrid>

                    <InputGroup>

                      <label>
                        Password
                      </label>

                      <Input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={agencyForm.password}
                        onChange={handleAgencyChange}
                        required
                      />

                    </InputGroup>

                    <InputGroup>

                      <label>
                        Confirm Password
                      </label>

                      <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={
                          agencyForm.confirmPassword
                        }
                        onChange={handleAgencyChange}
                        required
                      />

                    </InputGroup>

                  </InputGrid>

                </>
              )
            }

            <Button type="submit">
              Register
            </Button>

          </Form>

          <BottomText>

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </BottomText>

        </Card>

      </Page>

    </Layout>
  );
};

export default Register;