import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/apiUser";
import Layout from "../layouts/Layout";

const PageContainer = styled.div`
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

const LoginCard = styled.div`
  width: 100%;
  max-width: 430px;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(37,99,235,0.08);
  border-radius: 24px;
  padding: 42px 35px;
  box-shadow: 0 10px 40px rgba(15,23,42,0.08);

  @media (max-width: 480px) {
    padding: 30px 22px;
  }
`;

const Logo = styled.img`
  width: 150px;
  display: block;
  margin: 0 auto 25px;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  text-align: center;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: rgba(248,250,252,0.9);
  font-size: 14px;
  color: #0f172a;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #38bdf8;
    box-shadow:
      0 0 0 4px rgba(56,189,248,0.12);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const OptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ForgotPassword = styled(Link)`
  text-decoration: none;
  color: #0284c7;
  font-size: 13px;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  margin-top: 8px;
  padding: 14px;
  border: none;
  border-radius: 14px;
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
  transition: 0.35s;
  box-shadow: 0 10px 24px rgba(37,99,235,0.16);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(37,99,235,0.22);
  }
`;

const BottomText = styled.p`
  margin-top: 26px;
  text-align: center;
  color: #64748b;
  font-size: 14px;

  a {
    text-decoration: none;
    color: #0284c7;
    font-weight: 700;
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);
      console.log(res);

      if (res.success) {
        localStorage.setItem("isLoggedIn", true);
        navigate("/");
      }

    } catch (error) {
      console.error(error);
      alert("Login Failed");

    }
  };

  return (
    <Layout>
    <PageContainer>

      <LoginCard>
        <Logo src="/waymate_full_logo.png" alt="waymate" />

        <Heading> Welcome Back </Heading>

        <SubText>
          Log in to continue with a smarter,
          greener, and more connected way of traveling.
        </SubText>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <label>Email Address</label>
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange} />
          </InputGroup>

          <InputGroup>
            <label>Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange} />
          </InputGroup>

          <OptionsRow>
            <ForgotPassword to="/">
              Forgot Password?
            </ForgotPassword>
          </OptionsRow>

          <LoginButton type="submit">
            Sign In
          </LoginButton>
        </Form>

        <BottomText>
          Don’t have an account?
          <Link to="/signUp">
            Sign Up
          </Link>
        </BottomText>
      </LoginCard>
    </PageContainer>
    </Layout>
  );
};

export default Login;