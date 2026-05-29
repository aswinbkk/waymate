import React from "react";
import styled from "styled-components";
import Layout from "../layouts/Layout";

const Page = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 70px 20px;

  @media (max-width: 768px) {
    padding: 50px 16px;
  }
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 70px;
`;

const Badge = styled.div`
  display: inline-block;
  padding: 10px 18px;
  border-radius: 999px;
  background: #e0f2fe;
  color: #0284c7;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 22px;
`;

const Title = styled.h1`
  font-size: 52px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  margin-bottom: 18px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const GradientText = styled.span`
  background: linear-gradient( 135deg, #22c55e, #06b6d4, #2563eb );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  max-width: 700px;
  margin: auto;
  color: #64748b;
  font-size: 16px;
  line-height: 1.8;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 70px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  padding: 30px;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 30px rgba(15,23,42,0.05);
  transition: 0.3s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const Icon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  margin-bottom: 20px;
  background: linear-gradient( 135deg, #22c55e, #06b6d4, #2563eb )
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 12px;
`;

const CardText = styled.p`
  color: #64748b;
  font-size: 15px;
  line-height: 1.7;
`;

const FAQSection = styled.div`
  margin-bottom: 70px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 38px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const FAQGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FAQCard = styled.div`
  background: white;
  padding: 28px;
  border-radius: 22px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 30px rgba(15,23,42,0.05);
`;

const Question = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 12px;
`;

const Answer = styled.p`
  color: #64748b;
  line-height: 1.8;
  font-size: 15px;
`;

const ContactCard = styled.div`
  background: white;
  border-radius: 28px;
  padding: 50px 30px;
  text-align: center;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 30px rgba(15,23,42,0.05);
`;

const ContactTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 18px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const ContactText = styled.p`
  max-width: 650px;
  margin: auto auto 28px;
  color: #64748b;
  font-size: 16px;
  line-height: 1.8;
`;

const ContactButton = styled.button`
  padding: 14px 28px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  color: white;
  font-size: 15px;
  font-weight: 700;
  background: linear-gradient( 135deg, #22c55e, #06b6d4, #2563eb );
  transition: 0.3s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const Help = () => {
  return (
    <Layout>
      <Page>
        <Container>
          <Hero>
            <Badge> Help & Support </Badge>
            <Title> Need Help With{" "} <GradientText> waymate </GradientText>
              ?
            </Title>

            <Description>
              Find answers to common questions, manage your rides and get support for bookings, payments and account related issues.
            </Description>
          </Hero>

          <CardGrid>
            <Card>
              <Icon> 🚗 </Icon>
              <CardTitle> Join a Ride </CardTitle>
              <CardText> Search available rides and reserve your seat quickly and easily. </CardText>
            </Card>

            <Card>
              <Icon> 👤 </Icon>
              <CardTitle> Manage Account </CardTitle>
              <CardText> Update profile details, preferences and manage your account securely. </CardText>
            </Card>

            <Card>
              <Icon> 💳 </Icon>
              <CardTitle> Payments </CardTitle>
              <CardText> Learn about pricing, bookings and secure payment options. </CardText>
            </Card>
          </CardGrid>

          <FAQSection>
            <SectionTitle> Frequently Asked Questions </SectionTitle>
            <FAQGrid>
              <FAQCard>
                <Question> How do I join a ride? </Question>
                <Answer>
                  Browse available rides, choose your preferred ride and click the join button.
                </Answer>
              </FAQCard>

              <FAQCard>
                <Question> Can I create my own ride? </Question>
                <Answer>
                  Yes. Users and agencies can create rides by adding route, timing and seat details.
                </Answer>
              </FAQCard>

              <FAQCard>
                <Question> Is waymate safe? </Question>
                <Answer>
                  waymate focuses on verified users and transparent ride information for a safer ride-sharing experience.
                </Answer>
              </FAQCard>
            </FAQGrid>
          </FAQSection>

          <ContactCard>
            <ContactTitle> Still Need Help? </ContactTitle>
            <ContactText>
              Contact our support team for ride issues, booking problems or account related help.
            </ContactText>
            <ContactButton> Contact Support </ContactButton>
          </ContactCard>
        </Container>
      </Page>
    </Layout>
  );
};

export default Help;