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
`;

const HeroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  margin-bottom: 90px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroContent = styled.div``;

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
  font-size: 56px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  margin-bottom: 22px;

  @media (max-width: 768px) {
    font-size: 38px;
  }
`;

const GradientText = styled.span`
  background: linear-gradient( 135deg, #22c55e, #06b6d4, #2563eb );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  color: #64748b;
  font-size: 16px;
  line-height: 1.8;
  max-width: 600px;

  @media (max-width: 900px) {
    margin: auto;
  }
`;

const HeroImage = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    max-width: 340px;
    filter: drop-shadow( 0 20px 40px rgba(37,99,235,0.18));
  }
`;

const Section = styled.div`
  margin-bottom: 90px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 40px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const SectionText = styled.p`
  max-width: 700px;
  margin: auto auto 50px;
  text-align: center;
  color: #64748b;
  font-size: 16px;
  line-height: 1.8;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 24px;
  text-align: center;
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
  margin: auto auto 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  background: linear-gradient( 135deg, #22c55e, #06b6d4, #2563eb );
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 12px;
`;

const FeatureText = styled.p`
  color: #64748b;
  font-size: 15px;
  line-height: 1.7;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  padding: 34px 20px;
  border-radius: 24px;
  text-align: center;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 30px rgba(15,23,42,0.05);
`;

const StatNumber = styled.h2`
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 10px;
  background: linear-gradient( 135deg, #22c55e, #06b6d4, #2563eb );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.p`
  color: #64748b;
  font-size: 15px;
  font-weight: 600;
`;

const About = () => {
  return (
    <Layout>
      <Page>
        <Container>
          <HeroSection>
            <HeroContent>
              <Badge> Smart Ride Sharing Platform </Badge>
              <Title> Travel Smarter With{" "}
                <GradientText> waymate </GradientText>
              </Title>

              <Description>
                waymate is a modern ride-sharing
                platform that helps users and
                agencies connect easily for
                affordable, comfortable and
                eco-friendly travel.
              </Description>
            </HeroContent>

            <HeroImage>
              <img src="/waymate_standalone_icon.png" alt="waymate" />
            </HeroImage>
          </HeroSection>

          <Section>
            <SectionTitle> Why Choose{" "}
              <GradientText> waymate </GradientText>
              ?
            </SectionTitle>
            <SectionText>
              Enjoy secure ride-sharing,
              smart route matching and
              affordable travel with
              a simple and modern platform.
            </SectionText>

            <FeatureGrid>
              <FeatureCard>
                <Icon> 🚗 </Icon>
                <FeatureTitle> Smart Matching </FeatureTitle>

                <FeatureText>
                  Find people travelling
                  on the same route and
                  reduce travel costs.
                </FeatureText>
              </FeatureCard>

              <FeatureCard>
                <Icon> 🛡️ </Icon>
                <FeatureTitle> Safe Travel </FeatureTitle>

                <FeatureText>
                  Verified profiles and
                  trusted ride providers
                  for secure journeys.
                </FeatureText>
              </FeatureCard>

              <FeatureCard>
                <Icon> 🌍 </Icon>
                <FeatureTitle> Eco Friendly </FeatureTitle>

                <FeatureText>
                  Share rides and help
                  reduce traffic and
                  pollution together.
                </FeatureText>
              </FeatureCard>
            </FeatureGrid>
          </Section>

          <Section>
            <SectionTitle>waymate In Numbers </SectionTitle>
            <SectionText>
              Thousands of riders trust
              waymate every day for
              comfortable ride-sharing.
            </SectionText>

            <StatsGrid>
              <StatCard>
                <StatNumber> 10K+ </StatNumber>
                <StatLabel> Active Users </StatLabel>
              </StatCard>

              <StatCard>
                <StatNumber> 5K+ </StatNumber>
                <StatLabel> Daily Rides </StatLabel>
              </StatCard>

              <StatCard>
                <StatNumber> 98% </StatNumber>
                <StatLabel> Satisfaction Rate </StatLabel>
              </StatCard>

              <StatCard>
                <StatNumber> 20+ </StatNumber>
                <StatLabel> Cities Connected </StatLabel>
              </StatCard>
            </StatsGrid>
          </Section>
        </Container>
      </Page>
    </Layout>
  );
};

export default About;