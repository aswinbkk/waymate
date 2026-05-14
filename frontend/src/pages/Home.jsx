import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import RideGrid from "../components/RideGrid";
import { getUserRide } from "../api/apiUserRide";

const PageContainer = styled.div`
  min-height: 100vh;
  background:
    linear-gradient(
      180deg,
      #f8fbff 0%,
      #ffffff 100%
    );
`;

const ContentWrapper = styled.div`
  width: 100%;

  max-width: 1400px;

  margin: auto;

  padding: 40px 50px 80px;

  @media (max-width: 768px) {
    padding: 30px 20px 60px;
  }
`;

const HeroSection = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 800;

  color: #0f172a;

  margin-bottom: 14px;

  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  max-width: 700px;

  color: #64748b;

  font-size: 16px;

  line-height: 1.7;
`;

const Home = () => {

  const [rides, setRides] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await getUserRide();

        setRides(response.data);

        console.log(
          "Ride Data:",
          response
        );

      } catch (error) {

        console.error(
          "Error fetching data:",
          error
        );
      }
    };

    fetchData();

  }, []);

  return (
    <PageContainer>

      <Navbar />

      <ContentWrapper>

        <HeroSection>

          <Title>
            Find Your Perfect Ride
          </Title>

          <Subtitle>
            Connect with riders travelling
            on the same route and enjoy
            affordable, comfortable and
            smart carpooling with WayMate.
          </Subtitle>

        </HeroSection>

        <RideGrid rides={rides} />

      </ContentWrapper>

      <Footer />

    </PageContainer>
  );
};

export default Home;