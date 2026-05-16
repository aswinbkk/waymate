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
  max-width: 1400px;

  margin: auto;

  padding: 90px 50px 70px;

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 60px;

  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    padding: 70px 20px 50px;

    text-align: center;
  }
`;

const HeroContent = styled.div``;

const HeroBadge = styled.div`
  width: fit-content;

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

  margin-bottom: 24px;

  @media (max-width: 900px) {
    margin-inline: auto;
  }
`;

const HeroTitle = styled.h1`
  font-size: 58px;
  font-weight: 800;

  color: #0f172a;

  line-height: 1.15;

  margin-bottom: 24px;

  letter-spacing: -1.5px;

  display: flex;
  flex-direction: column;

  gap: 10px;

  span {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;

    gap: 14px;
  }

  img {
    height: 58px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    font-size: 42px;

    gap: 8px;

    img {
      height: 42px;
    }
  }

  @media (max-width: 480px) {
    font-size: 34px;

    span {
      flex-direction: column;
      align-items: center;

      gap: 10px;
    }

    img {
      height: 36px;
    }
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
  color: #64748b;

  font-size: 17px;

  line-height: 1.9;

  max-width: 620px;

  @media (max-width: 900px) {
    margin: auto;
  }
`;

const HeroImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-width: 380px;

    object-fit: contain;

    animation: float 4s ease-in-out infinite;

    filter:
      drop-shadow(
        0 25px 50px rgba(37,99,235,0.18)
      );
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-12px);
    }

    100% {
      transform: translateY(0px);
    }
  }
`;

const Section = styled.section`
  width: 100%;
  max-width: 1400px;

  margin: auto;

  padding: 20px 50px 90px;

  @media (max-width: 768px) {
    padding: 20px 20px 70px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 42px;
  font-weight: 800;

  text-align: center;

  color: #0f172a;

  margin-bottom: 18px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const SectionSubtitle = styled.p`
  max-width: 720px;

  margin: auto;

  text-align: center;

  color: #64748b;

  font-size: 16px;

  line-height: 1.8;

  margin-bottom: 60px;
`;

const FeatureGrid = styled.div`
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

const FeatureCard = styled.div`
  background: rgba(255,255,255,0.95);

  border-radius: 28px;

  padding: 34px;

  border: 1px solid rgba(37,99,235,0.08);

  box-shadow:
    0 10px 30px rgba(15,23,42,0.06);

  transition: 0.35s;

  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-6px);

    box-shadow:
      0 18px 40px rgba(15,23,42,0.12);
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;

  border-radius: 22px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 24px;

  background:
    linear-gradient(
      135deg,
      #22c55e,
      #06b6d4,
      #2563eb
    );

  color: white;

  font-size: 28px;
  font-weight: 700;

  box-shadow:
    0 12px 24px rgba(37,99,235,0.18);
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;

  color: #0f172a;

  margin-bottom: 16px;
`;

const FeatureText = styled.p`
  color: #64748b;

  font-size: 15px;

  line-height: 1.8;
`;

const StatsSection = styled.div`
  margin-top: 90px;

  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;

  border-radius: 24px;

  padding: 36px 20px;

  text-align: center;

  border: 1px solid rgba(37,99,235,0.08);

  box-shadow:
    0 10px 30px rgba(15,23,42,0.05);
`;

const StatNumber = styled.h2`
  font-size: 44px;
  font-weight: 800;

  margin-bottom: 10px;

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

const StatLabel = styled.p`
  color: #64748b;

  font-size: 15px;

  font-weight: 600;
`;

const About = () => {

  return (

    <Layout>
    <PageContainer>


      <HeroSection>

        <HeroContent>

          <HeroBadge>
            Smart Carpooling Platform
          </HeroBadge>

          <HeroTitle>
            <span>
              Travel Smarter With
            </span>

            <GradientText>
              waymate
            </GradientText>
          </HeroTitle>

          <HeroDescription>
            waymate is a modern carpooling
            platform that connects people
            travelling on the same route.

            Our mission is to make travel
            affordable, eco-friendly and
            convenient through smart
            ride-sharing technology.
          </HeroDescription>

        </HeroContent>

        <HeroImage>

          <img
            src="/waymate_standalone_icon.png"
            alt="WayMate Icon"
          />

        </HeroImage>

      </HeroSection>

      <Section>

        <SectionTitle>
          Why Choose{" "}
          <GradientText>
            waymate
          </GradientText>
          ?
        </SectionTitle>

        <SectionSubtitle>
          We provide a secure and intelligent
          ride-sharing experience for both
          riders and agencies with advanced
          matching and comfort preferences.
        </SectionSubtitle>

        <FeatureGrid>

          <FeatureCard>

            <FeatureIcon>
              🚗
            </FeatureIcon>

            <FeatureTitle>
              Smart Ride Matching
            </FeatureTitle>

            <FeatureText>
              Instantly connect with people
              travelling on the same route
              and save travel costs together.
            </FeatureText>

          </FeatureCard>

          <FeatureCard>

            <FeatureIcon>
              🛡️
            </FeatureIcon>

            <FeatureTitle>
              Safe & Trusted
            </FeatureTitle>

            <FeatureText>
              Verified profiles, trusted
              ride providers and secure
              ride-sharing experience for
              every passenger.
            </FeatureText>

          </FeatureCard>

          <FeatureCard>

            <FeatureIcon>
              🌍
            </FeatureIcon>

            <FeatureTitle>
              Eco Friendly
            </FeatureTitle>

            <FeatureText>
              Reduce traffic congestion
              and carbon emissions by
              sharing rides with other
              commuters.
            </FeatureText>

          </FeatureCard>

        </FeatureGrid>

        <StatsSection>

          <StatCard>

            <StatNumber>
              10K+
            </StatNumber>

            <StatLabel>
              Active Users
            </StatLabel>

          </StatCard>

          <StatCard>

            <StatNumber>
              5K+
            </StatNumber>

            <StatLabel>
              Daily Rides
            </StatLabel>

          </StatCard>

          <StatCard>

            <StatNumber>
              98%
            </StatNumber>

            <StatLabel>
              Satisfaction Rate
            </StatLabel>

          </StatCard>

          <StatCard>

            <StatNumber>
              20+
            </StatNumber>

            <StatLabel>
              Cities Connected
            </StatLabel>

          </StatCard>

        </StatsSection>

      </Section>

      <Footer />

    </PageContainer>
    </Layout>
  );
};

export default About;