import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../layouts/Layout";
import RideGrid from "../components/RideGrid";
import CreateRidePopup from "../components/CreateRidePopup";
import RideDetailsPopup from "../components/RideDetailsPopup";
import useRideActions from "../hooks/useRideActions";
import { viewUserCreatedRides, viewUserJoinedRides, createUserRide } from "../api/apiUserRide";
import { toast } from "react-toastify";

const Page = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  background: #f8fafc;
`;

const Container = styled.div`
  max-width: 1300px;
  margin: auto;
`;

const Section = styled.div`
  margin-bottom: 70px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const TitleWrapper = styled.div``;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #64748b;
  font-size: 15px;
  line-height: 1.7;
`;

const AddRideButton = styled.button`
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  font-size: 32px;
  font-weight: 500;
  color: white;

  background: linear-gradient(
    135deg,
    #22c55e,
    #06b6d4,
    #2563eb
  );
  box-shadow: 0 10px 25px rgba(37,99,235,0.18);
  transition: 0.3s;
  &:hover {
    transform: translateY(-3px);
  }
`;

const MyTrip = () => {

  const [offeredRides, setOfferedRides] = useState([]);
  const [joinedRides, setJoinedRides] = useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  // Fetch Offered Rides
  const fetchOfferedRides = async () => {

    try {
      const response = await viewUserCreatedRides();
      setOfferedRides(response.data);

    } catch (error) {
      console.error(error);

    }
  };

  // Fetch Joined Rides
  const fetchJoinedRides = async () => {
    try {
      const response = await viewUserJoinedRides();
      setJoinedRides(response.data);

    } catch (error) {
      console.error(error);

    }
  };

  // Fetch All Trips
  const fetchAllTrips = () => {
    fetchOfferedRides();
    fetchJoinedRides();
  };

  // Custom Hook
  const {
    showRidePopup,
    selectedRide,
    rideType,

    openRidePopup,
    closeRidePopup,

    handleLeaveRide,
    handleDeleteRide,
    handleUpdateRide

  } = useRideActions({ fetchRides: fetchAllTrips });

  useEffect(() => {
    fetchAllTrips();
  }, []);

  // Create Ride
  const handleCreateRide = async (rideData) => {

    try {
      const response = await createUserRide(rideData);
      if (response.success) {
        toast.success("Ride created successfully");
        setShowCreatePopup(false);
        fetchAllTrips();

      } else {
        toast.error(response.message || "Ride creation failed");
      }

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <Page>
        <Container>
          <Section>
            <TopBar>
              <TitleWrapper>
                <Title>Offered Rides</Title>
                <Description>
                  Manage rides created by you
                  for other passengers.
                </Description>
              </TitleWrapper>
              <AddRideButton onClick={() => setShowCreatePopup(true)}>
                +
              </AddRideButton>
            </TopBar>
            <RideGrid
              rides={offeredRides}
              onViewRide={(ride) => openRidePopup(ride, "offered")} />
          </Section>

          <Section>
            <Title> Joined Rides </Title>
            <Description>
              View rides you joined through
              the WayMate platform.
            </Description>
            <RideGrid
              rides={joinedRides}
              onViewRide={(ride) => openRidePopup(ride, "joined")}
            />
          </Section>
        </Container>
      </Page>
      <CreateRidePopup
        show={showCreatePopup}
        onClose={() => setShowCreatePopup(false)}
        onCreateRide={handleCreateRide}
      />

      <RideDetailsPopup
        show={showRidePopup}
        ride={selectedRide}
        type={rideType}
        onClose={closeRidePopup}
        onUpdate={handleUpdateRide}
        onDelete={handleDeleteRide}
        onLeave={handleLeaveRide}
      />
    </Layout>
  );
};

export default MyTrip;