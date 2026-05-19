import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import Popup from "../components/Popup";
import { loginUser } from "../api/apiUser";
import { loginAgency } from "../api/apiAgency";

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
  max-width: 420px;
  background: white;
  padding: 35px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);

  @media (max-width: 480px) {
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

const ForgotPassword = styled(Link)`
  text-align: right;
  font-size: 13px;
  font-weight: 600;
  color: #0284c7;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
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

const Login = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("user");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [popup, setPopup] = useState({ show: false, type: "", title: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showPopup = (type, title, message) => {
    setPopup({ show: true, type, title, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (accountType === "user") {
        response = await loginUser(formData);

      } else {
        response = await loginAgency(formData);
      }

      if (response.success) {
        localStorage.setItem(
          "isLoggedIn", "true"
        );

        localStorage.setItem(
          "accountType", accountType
        );

        showPopup(
          "success",
          "Login Successful",
          "Welcome to waymate"
        );
        setTimeout(() => { navigate("/"); }, 1200);
      } else {
        showPopup(
          "error",
          "Login Failed",
          response.msg ||
          "Invalid credentials"
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
          <Logo src="/waymate_full_logo.png" alt="waymate" />
          <Toggle>
            <ToggleButton
              type="button"
              $active={accountType === "user"}
              onClick={() => setAccountType("user")}
            > User
            </ToggleButton>
            <ToggleButton
              type="button"
              $active={accountType === "agency"}
              onClick={() => setAccountType("agency")}
            > Agency
            </ToggleButton>
          </Toggle>
          <Title>Login</Title>
          <Description>Continue your smart ride journey.</Description>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <label>Email</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required />
            </InputGroup>

            <InputGroup>
              <label>Password</label>
              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required />
            </InputGroup>
            <ForgotPassword to="/">Forgot Password?</ForgotPassword>
            <Button type="submit">Login</Button>
          </Form>

          <BottomText>Don’t have an account?
            <Link to="/register">Register</Link>
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

export default Login;