import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../layouts/Layout";
import RideGrid from "../components/RideGrid";
import RideDetailsPopup from "../components/RideDetailsPopup";
import { getUserRide, userJoinRide, userLeaveRide } from "../api/apiUserRide";
import { getAgencyRide } from "../api/apiAgencyRide";
import useRideActions from "../hooks/useRideActions";

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
  const [userRides, setUserRides] = useState([]);
  const [agencyRides, setAgencyRides] = useState([]);
  const fetchAllRides = () => { fetchUserRides(); fetchAgencyRides(); };
  const {
    showRidePopup,
    selectedRide,
    rideType,
    openRidePopup,
    closeRidePopup,
    handleJoinRide
  } = useRideActions({ fetchRides: fetchAllRides });

  // Fetch User Rides
  const fetchUserRides = async () => {
    try {
      const response = await getUserRide();
      setUserRides(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Agency Rides
  const fetchAgencyRides = async () => {
    try {
      const response = await getAgencyRide();
      setAgencyRides(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserRides();
    fetchAgencyRides();
  }, []);

  return (
    <Layout>
      <PageContainer>
        <ContentWrapper>
          <HeroSection>
            <Title>Find Your Perfect User Ride</Title>
            <Subtitle>
              Connect with riders travelling
              on the same route and enjoy
              affordable, comfortable and
              smart carpooling with WayMate.
            </Subtitle>
          </HeroSection>
          <RideGrid
            rides={userRides}
            onViewRide={(ride) =>
              openRidePopup(ride, "available")
            }
          />
        </ContentWrapper>

        <ContentWrapper>
          <HeroSection>
            <Title>Find Your Perfect Agency Ride</Title>
            <Subtitle>
              Book reliable agency rides with
              premium comfort, verified drivers
              and affordable pricing.
            </Subtitle>
          </HeroSection>
          <RideGrid
            rides={agencyRides}
            onViewRide={(ride) =>
              openRidePopup(ride, "available")
            }
          />
        </ContentWrapper>
      </PageContainer>
      <RideDetailsPopup
        show={showRidePopup}
        ride={selectedRide}
        type={rideType}
        onClose={closeRidePopup}
        onJoin={handleJoinRide}
      />
    </Layout>
  );
};

export default Home;