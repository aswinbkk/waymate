import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../layouts/Layout";
import RideGrid from "../components/RideGrid";
import CreateRidePopup from "../components/CreateRidePopup";
import RideDetailsPopup from "../components/RideDetailsPopup";
import { createUserRide } from "../api/apiUserRide"
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

  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const [showRidePopup, setShowRidePopup] = useState(false);

  const [selectedRide, setSelectedRide] = useState(null);

  const [rideType, setRideType] = useState("");

  // Example Offered Rides
  const offeredRides = [
    {
      id: 1,
      origin: "Pathanamthitta",
      destination: "Kottayam",
      date: new Date(),
      availableSeats: 3,
      totalSeats: 5,
      vehicleNumber: "KL 02 CD 5678",
      status: "Active",
      pricePerSeat: 300,
      preferences: {
        gender: "Male",
        ac: false
      }
    }
  ];

  // Example Joined Rides
  const joinedRides = [
    {
      id: 2,
      origin: "Kochi",
      destination: "Trivandrum",
      date: new Date(),
      availableSeats: 2,
      totalSeats: 4,
      vehicleNumber: "KL 01 AB 1234",
      status: "Joined",
      pricePerSeat: 450,
      preferences: {
        gender: "Any",
        ac: true
      }
    }
  ];

  // Create Ride
  const handleCreateRide = async (rideData) => {

    console.log("Ride Data:", rideData);

    try {

      const response = await createUserRide(rideData);

      console.log("response:", response);

      if (response?.success) {

        toast.success(
          "Ride created successfully"
        );

        setShowCreatePopup(false);

      } else {

        toast.error(
          response?.msg ||
          "Ride creation failed"
        );

      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Something went wrong"
      );

    }
  };

  // Click Offered Ride
  const handleOfferedRideClick = (ride) => {

    setSelectedRide(ride);

    setRideType("offered");

    setShowRidePopup(true);
  };

  // Click Joined Ride
  const handleJoinedRideClick = (ride) => {

    setSelectedRide(ride);

    setRideType("joined");

    setShowRidePopup(true);
  };

  // Update Ride
  const handleUpdateRide = () => {

    console.log("Update Ride:", selectedRide);

    // update api

    setShowRidePopup(false);
  };

  // Delete Ride
  const handleDeleteRide = () => {

    console.log("Delete Ride:", selectedRide);

    // delete api

    setShowRidePopup(false);
  };

  // Leave Ride
  const handleLeaveRide = () => {

    console.log("Leave Ride:", selectedRide);

    // leave api

    setShowRidePopup(false);
  };

  return (
    <Layout>

      <Page>

        <Container>

          {/* Offered Rides */}
          <Section>

            <TopBar>

              <TitleWrapper>

                <Title>
                  Offered Rides
                </Title>

                <Description>
                  Manage rides created by you
                  for other passengers.
                </Description>

              </TitleWrapper>

              <AddRideButton
                onClick={() => setShowCreatePopup(true)}
              >
                +
              </AddRideButton>

            </TopBar>

            <RideGrid
              rides={offeredRides}
              onRideClick={handleOfferedRideClick}
            />

          </Section>

          {/* Joined Rides */}
          <Section>

            <Title>
              Joined Rides
            </Title>

            <Description>
              View rides you joined through
              the WayMate platform.
            </Description>

            <RideGrid
              rides={joinedRides}
              onRideClick={handleJoinedRideClick}
            />

          </Section>

        </Container>

      </Page>

      {/* Create Ride Popup */}
      <CreateRidePopup
        show={showCreatePopup}
        onClose={() => setShowCreatePopup(false)}
        onCreateRide={handleCreateRide}
      />

      {/* Ride Details Popup */}
      <RideDetailsPopup
        show={showRidePopup}
        ride={selectedRide}
        type={rideType}
        onClose={() => setShowRidePopup(false)}
        onUpdate={handleUpdateRide}
        onDelete={handleDeleteRide}
        onLeave={handleLeaveRide}
      />

    </Layout>
  );
};

export default MyTrip;