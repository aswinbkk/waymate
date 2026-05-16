import React from "react";
import styled from "styled-components";
import Layout from "../layouts/Layout";

const PageContainer = styled.div`
  min-height: 100vh;

  background:
    linear-gradient(
      180deg,
      #f8fbff 0%,
      #ffffff 100%
    );
`;

const HeroSection = styled.section`
  width: 100%;
  max-width: 1300px;

  margin: auto;

  padding: 90px 50px 70px;

  text-align: center;

  @media (max-width: 768px) {
    padding: 70px 20px 50px;
  }
`;

const HeroBadge = styled.div`
  width: fit-content;

  margin: auto auto 24px;

  padding: 10px 18px;

  border-radius: 999px;

  background:
    linear-gradient(
      135deg,
      rgba(34,197,94,0.12),
      rgba(6,182,212,0.12),
      rgba(37,99,235,0.12)
    );

  color: #0284c7;

  font-size: 13px;
  font-weight: 700;
`;

const HeroTitle = styled.h1`
  font-size: 58px;
  font-weight: 800;

  color: #0f172a;

  line-height: 1.15;

  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const GradientText = styled.span`
  background:
    linear-gradient(
      135deg,
      #22c55e,
      #06b6d4,
      #2563eb
    );

  -webkit-background-clip: text;

  -webkit-text-fill-color: transparent;
`;

const HeroDescription = styled.p`
  max-width: 760px;

  margin: auto;

  color: #64748b;

  font-size: 17px;

  line-height: 1.9;
`;

const HelpContainer = styled.section`
  width: 100%;
  max-width: 1300px;

  margin: auto;

  padding: 0 50px 90px;

  @media (max-width: 768px) {
    padding: 0 20px 70px;
  }
`;

const HelpGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 28px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const HelpCard = styled.div`
  background: rgba(255,255,255,0.95);

  border-radius: 28px;

  padding: 34px;

  border: 1px solid rgba(37,99,235,0.08);

  box-shadow:
    0 10px 30px rgba(15,23,42,0.06);

  transition: 0.35s;

  text-align: center;

  &:hover {
    transform: translateY(-6px);

    box-shadow:
      0 18px 40px rgba(15,23,42,0.12);
  }
`;

const HelpIcon = styled.div`
  width: 75px;
  height: 75px;

  margin: auto auto 24px;

  border-radius: 22px;

  display: flex;
  justify-content: center;
  align-items: center;

  background:
    linear-gradient(
      135deg,
      #22c55e,
      #06b6d4,
      #2563eb
    );

  color: white;

  font-size: 30px;

  box-shadow:
    0 12px 24px rgba(37,99,235,0.18);
`;

const HelpTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;

  color: #0f172a;

  margin-bottom: 16px;
`;

const HelpText = styled.p`
  color: #64748b;

  font-size: 15px;

  line-height: 1.8;
`;

const FAQSection = styled.div`
  margin-top: 90px;
`;

const FAQTitle = styled.h2`
  font-size: 42px;
  font-weight: 800;

  text-align: center;

  margin-bottom: 50px;

  color: #0f172a;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const FAQGrid = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
`;

const FAQCard = styled.div`
  background: white;

  border-radius: 24px;

  padding: 28px;

  border: 1px solid rgba(37,99,235,0.08);

  box-shadow:
    0 10px 30px rgba(15,23,42,0.05);
`;

const Question = styled.h3`
  font-size: 20px;
  font-weight: 700;

  color: #0f172a;

  margin-bottom: 14px;
`;

const Answer = styled.p`
  color: #64748b;

  font-size: 15px;

  line-height: 1.8;
`;

const ContactSection = styled.div`
  margin-top: 90px;

  background: white;

  border-radius: 32px;

  padding: 60px 40px;

  text-align: center;

  border: 1px solid rgba(37,99,235,0.08);

  box-shadow:
    0 10px 30px rgba(15,23,42,0.05);

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const ContactTitle = styled.h2`
  font-size: 40px;
  font-weight: 800;

  color: #0f172a;

  margin-bottom: 18px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const ContactText = styled.p`
  max-width: 700px;

  margin: auto auto 32px;

  color: #64748b;

  font-size: 16px;

  line-height: 1.8;
`;

const ContactButton = styled.button`
  padding: 16px 30px;

  border: none;
  border-radius: 16px;

  cursor: pointer;

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

  transition: 0.35s;

  box-shadow:
    0 10px 24px rgba(37,99,235,0.16);

  &:hover {
    transform: translateY(-2px);

    box-shadow:
      0 14px 28px rgba(37,99,235,0.22);
  }
`;

const Help = () => {

  return (
    <Layout>
    <PageContainer>

      <HeroSection>

        <HeroBadge>
          Support & Help Center
        </HeroBadge>

        <HeroTitle>
          Need Help With{" "}
          <GradientText>
            waymate
          </GradientText>
          ?
        </HeroTitle>

        <HeroDescription>
          Find answers to common questions,
          learn how the platform works and
          get support for your rides,
          bookings and account management.
        </HeroDescription>

      </HeroSection>

      <HelpContainer>

        <HelpGrid>

          <HelpCard>

            <HelpIcon>
              🚗
            </HelpIcon>

            <HelpTitle>
              Book a Ride
            </HelpTitle>

            <HelpText>
              Search available rides,
              compare routes and join
              rides instantly with ease.
            </HelpText>

          </HelpCard>

          <HelpCard>

            <HelpIcon>
              👤
            </HelpIcon>

            <HelpTitle>
              Manage Account
            </HelpTitle>

            <HelpText>
              Update your profile,
              manage preferences and
              keep your account secure.
            </HelpText>

          </HelpCard>

          <HelpCard>

            <HelpIcon>
              💳
            </HelpIcon>

            <HelpTitle>
              Payments & Pricing
            </HelpTitle>

            <HelpText>
              Learn about ride pricing,
              seat booking costs and
              secure payment handling.
            </HelpText>

          </HelpCard>

        </HelpGrid>

        <FAQSection>

          <FAQTitle>
            Frequently Asked Questions
          </FAQTitle>

          <FAQGrid>

            <FAQCard>

              <Question>
                How do I join a ride?
              </Question>

              <Answer>
                Search for rides based on
                your destination, select
                the ride you prefer and
                click the join button to
                reserve your seat.
              </Answer>

            </FAQCard>

            <FAQCard>

              <Question>
                Can I create my own ride?
              </Question>

              <Answer>
                Yes. Users and agencies can
                create rides by entering
                route details, available
                seats and ride preferences.
              </Answer>

            </FAQCard>

            <FAQCard>

              <Question>
                Is waymate safe?
              </Question>

              <Answer>
                waymate focuses on verified
                users, transparent ride
                details and secure
                communication for a trusted
                ride-sharing experience.
              </Answer>

            </FAQCard>

          </FAQGrid>

        </FAQSection>

        <ContactSection>

          <ContactTitle>
            Still Need Help?
          </ContactTitle>

          <ContactText>
            Our support team is always ready
            to assist you with ride issues,
            account problems or general
            platform guidance.
          </ContactText>

          <ContactButton>
            Contact Support
          </ContactButton>

        </ContactSection>

      </HelpContainer>
    </PageContainer>
    </Layout>

  );
};

export default Help;