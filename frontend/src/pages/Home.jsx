import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../layouts/Layout";
import RideGrid from "../components/RideGrid";
import Popup from "../components/Popup";
import RideDetailsPopup from "../components/RideDetailsPopup";
import { getUserRide, userJoinRide } from "../api/apiUserRide";
import { getAgencyRide } from "../api/apiAgencyRide";

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
  const [popup, setPopup] = useState({ show: false, type: "", title: "", message: "" });
  const [showRidePopup, setShowRidePopup] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [rideType, setRideType] = useState("available");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const showPopup = (type, title, message) => {
    setPopup({ show: true, type, title, message });
    setTimeout(() => { setPopup((prev) => ({ ...prev, show: false })); }, 2000);
  };

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

  // Open Ride Popup
  const handleViewRide = (ride, type = "available") => {
    setSelectedRide(ride);
    setRideType(type);
    setShowRidePopup(true);
  };

  // Join Ride
  const handleJoinRide = async () => {
    try {
      const response = await userJoinRide(selectedRide._id || selectedRide.id);
      if (response.success) {
        showPopup(
          "success",
          "Ride Joined",
          "Successfully joined ride"
        );
        setShowRidePopup(false);
        fetchUserRides();

      } else {
        showPopup(
          "error",
          "Join Failed",
          response.msg
        );
      }

    } catch (error) {
      console.error(error);
      showPopup(
        "error",
        "Server Error",
        "Something went wrong"
      );
    }
  };

  // Dummy handlers
  const handleUpdateRide = () => {
    console.log("Update Ride");
  };

  const handleDeleteRide = () => {
    console.log("Delete Ride");
  };

  const handleLeaveRide = () => {
    console.log("Leave Ride");
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
            onViewRide={(ride) => handleViewRide(ride, "available")}
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
            onViewRide={(ride) => handleViewRide(ride, "available")}
          />
        </ContentWrapper>
      </PageContainer>

      <Popup
        show={popup.show}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={() => setPopup({ ...popup, show: false })
        }
      />

      <RideDetailsPopup
        show={showRidePopup}
        ride={selectedRide}
        type={rideType}
        onClose={() => setShowRidePopup(false)}
        onJoin={handleJoinRide}
        onUpdate={handleUpdateRide}
        onDelete={handleDeleteRide}
        onLeave={handleLeaveRide}
      />
    </Layout>
  );
};

export default Home;