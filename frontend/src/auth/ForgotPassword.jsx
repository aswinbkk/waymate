import React, { useState } from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../layouts/Layout";

import {
  forgotUserPassword,
  resetUserPassword
} from "../api/apiUser";

import {
  forgotAgencyPassword,
  resetAgencyPassword
} from "../api/apiAgency";

const Page = styled.div`
  min-height: 100vh;

  padding: 40px 20px;

  display: flex;
  justify-content: center;
  align-items: center;

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
  max-width: 420px;

  padding: 35px;

  background: white;

  border-radius: 20px;

  border: 1px solid #e2e8f0;

  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.08);

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

  padding: 4px;

  margin-bottom: 25px;

  background: #f1f5f9;

  border-radius: 12px;
`;

const ToggleButton = styled.button`
  flex: 1;

  border: none;

  padding: 12px;

  cursor: pointer;

  border-radius: 10px;

  font-size: 14px;
  font-weight: 600;

  transition: 0.3s;

  background:
    ${({ $active }) =>
      $active
        ? "linear-gradient(135deg,#22c55e,#2563eb)"
        : "transparent"};

  color:
    ${({ $active }) =>
      $active
        ? "white"
        : "#64748b"};
`;

const Title = styled.h1`
  text-align: center;

  font-size: 28px;

  color: #0f172a;

  margin-bottom: 8px;
`;

const Description = styled.p`
  text-align: center;

  font-size: 14px;

  color: #64748b;

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

    box-shadow:
      0 0 0 4px rgba(37, 99, 235, 0.1);
  }
`;

const Button = styled.button`
  border: none;

  padding: 14px;

  cursor: pointer;

  border-radius: 12px;

  color: white;

  font-size: 15px;
  font-weight: 700;

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

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const BottomText = styled.p`
  margin-top: 24px;

  text-align: center;

  font-size: 14px;

  color: #64748b;

  a {
    margin-left: 4px;

    color: #0284c7;

    font-weight: 700;

    text-decoration: none;
  }
`;

const ForgotPassword = () => {

  const [accountType, setAccountType] =
    useState("user");

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      otp: "",
      newPassword: "",
      confirmPassword: ""
    });

  // Handle Input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Send OTP
  const handleSendOtp = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response =
        accountType === "user"
          ? await forgotUserPassword({
              email: formData.email
            })
          : await forgotAgencyPassword({
              email: formData.email
            });

      if (
        response?.msg ===
        "OTP sent to email"
      ) {

        toast.success(
          "OTP sent to your email"
        );

        setStep(2);

      } else {

        toast.error(
          response?.msg ||
          "Failed to send OTP"
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  // Reset Password
  const handleResetPassword = async (e) => {

    e.preventDefault();

    // Password Match Check
    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return;
    }

    setLoading(true);

    try {

      const payload = {
        email: formData.email,
        otp: formData.otp,
        newPassword:
          formData.newPassword
      };

      const response =
        accountType === "user"
          ? await resetUserPassword(payload)
          : await resetAgencyPassword(payload);

      if (
        response?.msg ===
        "Password reset successful"
      ) {

        toast.success(
          "Password reset successful"
        );

        setStep(3);

      } else {

        toast.error(
          response?.msg ||
          "Reset failed"
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
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
            Forgot Password
          </Title>

          <Description>

            {
              step === 1 &&
              "Enter your email to receive OTP"
            }

            {
              step === 2 &&
              "Enter OTP and new password"
            }

            {
              step === 3 &&
              "Password updated successfully"
            }

          </Description>

          {/* Step 1 */}
          {
            step === 1 && (

              <Form onSubmit={handleSendOtp}>

                <InputGroup>

                  <label>
                    Email
                  </label>

                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </InputGroup>

                <Button
                  type="submit"
                  disabled={loading}
                >

                  {
                    loading
                      ? "Sending OTP..."
                      : "Send OTP"
                  }

                </Button>

              </Form>
            )
          }

          {/* Step 2 */}
          {
            step === 2 && (

              <Form onSubmit={handleResetPassword}>

                <InputGroup>

                  <label>
                    OTP
                  </label>

                  <Input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                  />

                </InputGroup>

                <InputGroup>

                  <label>
                    New Password
                  </label>

                  <Input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={handleChange}
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
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                </InputGroup>

                <Button
                  type="submit"
                  disabled={loading}
                >

                  {
                    loading
                      ? "Resetting..."
                      : "Reset Password"
                  }

                </Button>

              </Form>
            )
          }

          {/* Step 3 */}
          {
            step === 3 && (

              <BottomText>

                Password changed successfully.

                <Link to="/login">
                  Login
                </Link>

              </BottomText>
            )
          }

          {
            step !== 3 && (

              <BottomText>

                Back to

                <Link to="/login">
                  Login
                </Link>

              </BottomText>
            )
          }

        </Card>

      </Page>

    </Layout>
  );
};

export default ForgotPassword;