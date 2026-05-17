import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../layouts/Layout";
import Popup from "../components/Popup";

import { registerUser } from "../api/apiUser";
import { registerAgency } from "../api/apiAgency";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 40px 20px;

  background: linear-gradient(
    135deg,
    #f8fafc,
    #eff6ff,
    #ffffff
  );
`;

const Card = styled.div`
  width: 100%;
  max-width: 550px;

  background: white;

  padding: 35px;

  border-radius: 20px;

  border: 1px solid #e2e8f0;

  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);

  @media (max-width: 768px) {
    padding: 25px;
  }
`;

const Logo = styled.img`
  width: 150px;
  display: block;
  margin: 0 auto 25px;
`;

const Toggle = styled.div`
  display: flex;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 25px;
`;

const ToggleButton = styled.button`
  flex: 1;
  border: none;
  padding: 12px;
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
    $active ? "white" : "#64748b"};
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  color: #0f172a;
  margin-bottom: 8px;
`;

const Description = styled.p`
  text-align: center;
  color: #64748b;
  font-size: 14px;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
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
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;

  font-size: 14px;

  outline: none;

  transition: 0.3s;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  }
`;

const Button = styled.button`
  border: none;

  padding: 14px;

  border-radius: 12px;

  cursor: pointer;

  color: white;

  font-size: 15px;
  font-weight: 700;

  background: linear-gradient(
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

  const [accountType, setAccountType] =
    useState("user");

  const [popup, setPopup] =
    useState({
      show: false,
      type: "",
      title: "",
      message: ""
    });

  const [userForm, setUserForm] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: ""
    });

  const [agencyForm, setAgencyForm] =
    useState({
      agencyName: "",
      city: "",
      state: "",
      email: "",
      password: "",
      phone: ""
    });

  const showPopup = (
    type,
    title,
    message
  ) => {

    setPopup({
      show: true,
      type,
      title,
      message
    });

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

      let response;

      if (accountType === "user") {

        const payload = {
          fullName: {
            firstName: userForm.firstName,
            lastName: userForm.lastName
          },
          email: userForm.email,
          password: userForm.password,
          phone: userForm.phone
        };

        response =
          await registerUser(payload);

      } else {

        const payload = {
          agencyName: agencyForm.agencyName,

          address: {
            city: agencyForm.city,
            state: agencyForm.state
          },

          email: agencyForm.email,
          password: agencyForm.password,
          phone: agencyForm.phone
        };

        response =
          await registerAgency(payload);

      }

      if (response.success) {

        showPopup(
          "success",
          "Registration Successful",
          "Account created successfully"
        );

        setTimeout(() => {
          navigate("/login");
        }, 1200);

      } else {

        showPopup(
          "error",
          "Registration Failed",
          response.msg ||
          "Something went wrong"
        );

      }

    } catch (error) {

      console.error(error);

      showPopup(
        "error",
        "Server Error",
        "Something went wrong"
      );

    }

  };

  return (
    <Layout>

      <Page>

        <Card>

          <Logo
            src="/waymate_full_logo.png"
            alt="waymate"
          />

          <Toggle>

            <ToggleButton
              type="button"
              $active={accountType === "user"}
              onClick={() =>
                setAccountType("user")
              }
            >
              User
            </ToggleButton>

            <ToggleButton
              type="button"
              $active={accountType === "agency"}
              onClick={() =>
                setAccountType("agency")
              }
            >
              Agency
            </ToggleButton>

          </Toggle>

          <Title>
            Register
          </Title>

          <Description>
            Create your WayMate account.
          </Description>

          <Form onSubmit={handleSubmit}>

            {
              accountType === "user" && (
                <>

                  <Grid>

                    <InputGroup>

                      <label>
                        First Name
                      </label>

                      <Input
                        type="text"
                        name="firstName"
                        placeholder="First name"
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
                        placeholder="Last name"
                        value={userForm.lastName}
                        onChange={handleUserChange}
                        required
                      />

                    </InputGroup>

                  </Grid>

                  <InputGroup>

                    <label>Email</label>

                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={userForm.email}
                      onChange={handleUserChange}
                      required
                    />

                  </InputGroup>

                  <Grid>

                    <InputGroup>

                      <label>Password</label>

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

                      <label>Phone</label>

                      <Input
                        type="text"
                        name="phone"
                        placeholder="Phone number"
                        value={userForm.phone}
                        onChange={handleUserChange}
                        required
                      />

                    </InputGroup>

                  </Grid>

                </>
              )
            }

            {
              accountType === "agency" && (
                <>

                  <InputGroup>

                    <label>
                      Agency Name
                    </label>

                    <Input
                      type="text"
                      name="agencyName"
                      placeholder="Agency name"
                      value={agencyForm.agencyName}
                      onChange={handleAgencyChange}
                      required
                    />

                  </InputGroup>

                  <Grid>

                    <InputGroup>

                      <label>City</label>

                      <Input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={agencyForm.city}
                        onChange={handleAgencyChange}
                        required
                      />

                    </InputGroup>

                    <InputGroup>

                      <label>State</label>

                      <Input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={agencyForm.state}
                        onChange={handleAgencyChange}
                        required
                      />

                    </InputGroup>

                  </Grid>

                  <InputGroup>

                    <label>Email</label>

                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={agencyForm.email}
                      onChange={handleAgencyChange}
                      required
                    />

                  </InputGroup>

                  <Grid>

                    <InputGroup>

                      <label>Password</label>

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

                      <label>Phone</label>

                      <Input
                        type="text"
                        name="phone"
                        placeholder="Phone number"
                        value={agencyForm.phone}
                        onChange={handleAgencyChange}
                        required
                      />

                    </InputGroup>

                  </Grid>

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

      <Popup
        show={popup.show}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={() =>
          setPopup({
            ...popup,
            show: false
          })
        }
      />

    </Layout>
  );
};

export default Register;