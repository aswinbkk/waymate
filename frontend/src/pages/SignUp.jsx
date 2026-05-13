import styled from "styled-components";
import { Link } from "react-router-dom";

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

const SignInCard = styled.div`
  width: 100%;
  max-width: 460px;
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

const Row = styled.div`
  display: flex;
  gap: 14px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const InputGroup = styled.div`
  flex: 1;
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
    box-shadow: 0 0 0 4px rgba(56,189,248,0.12);
  }
  &::placeholder {
    color: #94a3b8;
  }
`;

const OptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const RememberMe = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
  input {
    accent-color: #0284c7;
  }
`;

const ForgotPassword = styled.a`
  text-decoration: none;
  color: #0284c7;
  font-size: 13px;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const SignInButton = styled.button`
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

const AgentSignUp = styled.a`
 text-decoration: none;
 color: #0284c7;
 font-size: 13px;
 font-weight: 600;
 &:hover{
 text-decoration: underline;
 }
`;

const SignUp = () => {
  return (
    <PageContainer>
      <SignInCard>
        <Logo src="/waymate_full_logo.png" alt="waymate" />
        <Heading>Create Account</Heading>
        <SubText>
          Join waymate and make every journey easier, greener, and more connected.
        </SubText>

        <Form>
          <Row>
            <InputGroup>
              <label>First Name</label>
              <Input type="text" placeholder="First name" />
            </InputGroup>

            <InputGroup>
              <label>Last Name</label>
              <Input type="text" placeholder="Last name" />
            </InputGroup>
          </Row>

          <InputGroup>
            <label>Phone Number</label>
            <Input type="tel" placeholder="Enter phone number" />
          </InputGroup>

          <InputGroup>
            <label>Email Address</label>
            <Input type="email" placeholder="Enter your email" />
          </InputGroup>

          <InputGroup>
            <label>Password</label>
            <Input type="password" placeholder="Create password" />
          </InputGroup>

          <OptionsRow>
            <RememberMe>
              <input type="checkbox" />
              I agree to Terms & Conditions
            </RememberMe>
            <AgentSignUp href="/SignUp">
                I am an agent!
            </AgentSignUp>
          </OptionsRow>

          <SignInButton>
            Create Account
          </SignInButton>
        </Form>

        <BottomText>
          Already have an account?
          <Link to="/SignIn">Login</Link>
        </BottomText>
      </SignInCard>
    </PageContainer>
  );
};

export default SignUp;