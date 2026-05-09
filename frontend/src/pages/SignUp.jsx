import styled from "styled-components";

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

const SignUpCard = styled.div`
  width: 100%;
  max-width: 460px;

  background: rgba(255,255,255,0.92);

  backdrop-filter: blur(18px);

  border: 1px solid rgba(37,99,235,0.08);

  border-radius: 24px;

  padding: 42px 35px;

  box-shadow:
    0 10px 40px rgba(15,23,42,0.08);

  @media (max-width: 480px) {
    padding: 30px 22px;
  }
`;

const Logo = styled.img`
  width: 150px;

  display: block;
  margin: 0 auto 24px;
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

const TermsText = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  margin-top: 4px;

  font-size: 13px;

  color: #64748b;

  line-height: 1.5;

  input {
    margin-top: 2px;

    accent-color: #0284c7;
  }

  a {
    color: #0284c7;

    text-decoration: none;

    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignUpButton = styled.button`
  margin-top: 10px;

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

  box-shadow:
    0 10px 24px rgba(37,99,235,0.16);

  &:hover {
    transform: translateY(-2px);

    box-shadow:
      0 14px 28px rgba(37,99,235,0.22);
  }
`;

const Divider = styled.div`
  margin: 26px 0;

  display: flex;
  align-items: center;
  gap: 12px;

  color: #94a3b8;
  font-size: 13px;

  &::before,
  &::after {
    content: "";

    flex: 1;
    height: 1px;

    background: #e2e8f0;
  }
`;

const GoogleButton = styled.button`
  width: 100%;

  padding: 13px;

  border-radius: 14px;

  border: 1px solid #e2e8f0;

  background: white;

  color: #0f172a;

  font-weight: 600;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    background: #f8fafc;
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

const SignUp = () => {
  return (
    <PageContainer>

      <SignUpCard>

        <Logo src="/waymate_full_logo.png" alt="waymate"/>

        <Heading>
          Create Account
        </Heading>

        <SubText>
          Join waymate and make every journey easier, greener, and more connected.
        </SubText>

        <Form>

          <InputGroup>
            <label>Full Name</label>

            <Input
              type="text"
              placeholder="Enter your full name"
            />
          </InputGroup>

          <InputGroup>
            <label>Email Address</label>

            <Input
              type="email"
              placeholder="Enter your email"
            />
          </InputGroup>

          <InputGroup>
            <label>Password</label>

            <Input
              type="password"
              placeholder="Create a password"
            />
          </InputGroup>

          <InputGroup>
            <label>Confirm Password</label>

            <Input
              type="password"
              placeholder="Confirm your password"
            />
          </InputGroup>

          <TermsText>
            <input type="checkbox" />

            <span>
              I agree to the
              <a href="/"> Terms & Conditions </a>
              and
              <a href="/"> Privacy Policy</a>
            </span>
          </TermsText>

          <SignUpButton>
            Create Account
          </SignUpButton>

        </Form>

        <Divider>
          OR
        </Divider>

        <GoogleButton>
          Continue with Google
        </GoogleButton>

        <BottomText>
          Already have an account?
          <a href="/signin">
            Sign In
          </a>
        </BottomText>

      </SignUpCard>

    </PageContainer>
  );
};

export default SignUp;