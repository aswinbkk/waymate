import React, {
  useState,
  useEffect,
  useContext
} from "react";

import styled from "styled-components";

import Layout from "../layouts/Layout";

import RideGrid from "../components/RideGrid";

import CreateRidePopup from "../components/CreateRidePopup";

import JoinLeavePopup from "../components/JoinLeavePopup";

import UpdateDeletePopup from "../components/UpdateDeletePopup";

import useRideActions from "../hooks/useRideActions";

import {
  viewUserCreatedRides,
  viewUserJoinedRides,
  createUserRide
} from "../api/apiUserRide";

import { toast } from "react-toastify";

import { AuthContext } from "../context/AuthContext";

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

  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.18);

  transition: 0.3s;

  &:hover {
    transform: translateY(-3px);
  }
`;

const MyTrip = () => {

  const { user } =
    useContext(AuthContext);

  const isLoggedIn = !!user;

  const [offeredRides,
    setOfferedRides] = useState([]);

  const [joinedRides,
    setJoinedRides] = useState([]);

  const [createdRideIds,
    setCreatedRideIds] = useState([]);

  const [joinedRideIds,
    setJoinedRideIds] = useState([]);

  const [showCreatePopup,
    setShowCreatePopup] = useState(false);

  // ---------------- FETCH OFFERED RIDES ----------------

  const fetchOfferedRides =
    async () => {

      try {

        const response =
          await viewUserCreatedRides();

        setOfferedRides(
          response.data || []
        );

        setCreatedRideIds(
          response.createdRideIds?.map(
            String
          ) || []
        );

      } catch (error) {

        console.error(error);
      }
    };

  // ---------------- FETCH JOINED RIDES ----------------

  const fetchJoinedRides =
    async () => {

      try {

        const response =
          await viewUserJoinedRides();

        setJoinedRides(
          response.data || []
        );

        setJoinedRideIds(
          response.joinedRideIds?.map(
            String
          ) || []
        );

      } catch (error) {

        console.error(error);
      }
    };

  // ---------------- FETCH ALL ----------------

  const fetchAllTrips =
    async () => {

      await fetchOfferedRides();

      await fetchJoinedRides();
    };

  // ---------------- CUSTOM HOOK ----------------

  const {
    selectedRide,

    openRidePopup,
    closeRidePopup,

    handleUpdateRide,
    handleDeleteRide,

    handleJoinRide,
    handleLeaveRide

  } = useRideActions({
    fetchRides: fetchAllTrips
  });

  // ---------------- EFFECT ----------------

  useEffect(() => {

    if (isLoggedIn) {

      fetchAllTrips();
    }

  }, [isLoggedIn]);

  // ---------------- CREATE RIDE ----------------

  const handleCreateRide =
    async (rideData) => {

      try {

        const response =
          await createUserRide(
            rideData
          );

        if (response.success) {

          toast.success(
            "Ride created successfully"
          );

          setShowCreatePopup(false);

          fetchAllTrips();

        } else {

          toast.error(
            response.message ||
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

  // ---------------- STATUS ----------------

  const rideId = String(
    selectedRide?._id ||
    selectedRide?.id ||
    ""
  );

  const isJoined =
    joinedRideIds.includes(
      rideId
    );

  const isOwner =
    createdRideIds.includes(
      rideId
    );

  // ---------------- JOIN ----------------

  const onJoinRide =
    async () => {

      await handleJoinRide();

      setJoinedRideIds(
        (prev) => [
          ...prev,
          rideId
        ]
      );
    };

  // ---------------- LEAVE ----------------

  const onLeaveRide =
    async () => {

      await handleLeaveRide();

      setJoinedRideIds(
        (prev) =>
          prev.filter(
            (id) =>
              id !== rideId
          )
      );

      setJoinedRides(
        (prev) =>
          prev.filter(
            (ride) =>
              String(
                ride._id ||
                ride.id
              ) !== rideId
          )
      );

      closeRidePopup();
    };

  // ---------------- UPDATE ----------------

  const onUpdateRide =
    async (
      rideId,
      updatedData
    ) => {

      await handleUpdateRide(
        rideId,
        updatedData
      );

      toast.success(
        "Ride updated successfully"
      );

      fetchAllTrips();
    };

  // ---------------- DELETE ----------------

  const onDeleteRide =
    async (rideId) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this ride?"
        );

      if (!confirmDelete) return;

      await handleDeleteRide(
        rideId
      );

      toast.success(
        "Ride deleted successfully"
      );

      fetchAllTrips();

      closeRidePopup();
    };

  return (
    <Layout>

      <Page>

        <Container>

          {/* OFFERED RIDES */}

          <Section>

            <TopBar>

              <TitleWrapper>

                <Title>
                  Offered Rides
                </Title>

                <Description>
                  Manage rides created by
                  you for other passengers.
                </Description>

              </TitleWrapper>

              <AddRideButton
                onClick={() =>
                  setShowCreatePopup(
                    true
                  )
                }
              >
                +
              </AddRideButton>

            </TopBar>

            <RideGrid
              rides={offeredRides}
              onViewRide={(ride) =>
                openRidePopup(ride)
              }
            />

          </Section>

          {/* JOINED RIDES */}

          <Section>

            <Title>
              Joined Rides
            </Title>

            <Description>
              View rides you joined
              through WayMate.
            </Description>

            <RideGrid
              rides={joinedRides}
              onViewRide={(ride) =>
                openRidePopup(ride)
              }
            />

          </Section>

        </Container>

      </Page>

      {/* CREATE RIDE */}

      <CreateRidePopup
        show={showCreatePopup}
        onClose={() =>
          setShowCreatePopup(
            false
          )
        }
        onCreateRide={
          handleCreateRide
        }
      />

      {/* OWNER POPUP */}

      {isOwner ? (

        <UpdateDeletePopup
          show={!!selectedRide}
          ride={selectedRide}
          onClose={
            closeRidePopup
          }
          onUpdate={
            onUpdateRide
          }
          onDelete={
            onDeleteRide
          }
        />

      ) : (

        /* JOIN / LEAVE POPUP */

        <JoinLeavePopup
          show={!!selectedRide}
          ride={selectedRide}
          isLoggedIn={
            isLoggedIn
          }
          isJoined={isJoined}
          isOwner={isOwner}
          onClose={
            closeRidePopup
          }
          onJoin={
            onJoinRide
          }
          onLeave={
            onLeaveRide
          }
        />

      )}

    </Layout>
  );
};

export default MyTrip;