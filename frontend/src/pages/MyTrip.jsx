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
  background: #f8fafc;
  padding: 40px 20px 80px;
`;

const Container = styled.div`
  max-width: 1400px;
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
  margin-bottom: 28px;
  flex-wrap: wrap;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  color: #64748b;
  font-size: 15px;
  line-height: 1.7;
`;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const PageBadge = styled.div`
  display: inline-flex;
  align-items: center;

  padding: 9px 16px;
  margin-bottom: 22px;

  border-radius: 999px;

  background: #eff6ff;

  border: 1px solid #dbeafe;

  color: #2563eb;

  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.4px;

  text-transform: uppercase;

  @media (max-width: 768px) {
    padding: 8px 14px;
    font-size: 11px;
  }
`;

const ViewAllButton = styled.button`
  padding: 11px 18px;

  border-radius: 12px;

  border: 1px solid #dbeafe;

  background: white;

  color: #2563eb;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.25s ease;

  &:hover {
    background: #eff6ff;

    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
  }
`;

const CreateRideButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px 20px;

  border: none;

  border-radius: 12px;

  background: linear-gradient(
    135deg,
    #22c55e,
    #06b6d4,
    #2563eb
  );

  color: white;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.3s ease;

  box-shadow:
    0 10px 24px rgba(
      37,
      99,
      235,
      0.18
    );

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 11px 16px;
    font-size: 13px;
  }
`;

const PlusIcon = styled.span`
  width: 15px;
  height: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 7px;

  background: rgba(
    255,
    255,
    255,
    0.18
  );

  font-size: 18px;
  font-weight: 600;

  line-height: 1;
`;

const EmptyText = styled.p`
  margin-top: 20px;
  color: #94a3b8;
  font-size: 15px;
`;

const MyTrip = () => {

  const { user } =
    useContext(AuthContext);

  const isLoggedIn = !!user;

  const [
    offeredRides,
    setOfferedRides
  ] = useState([]);

  const [
    joinedRides,
    setJoinedRides
  ] = useState([]);

  const [
    createdRideIds,
    setCreatedRideIds
  ] = useState([]);

  const [
    joinedRideIds,
    setJoinedRideIds
  ] = useState([]);

  const [
    showCreatePopup,
    setShowCreatePopup
  ] = useState(false);

  const [
    showAllOffered,
    setShowAllOffered
  ] = useState(false);

  const [
    showAllJoined,
    setShowAllJoined
  ] = useState(false);

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

          setShowCreatePopup(
            false
          );

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

  // ---------------- DISPLAY RIDES ----------------

  const displayedOfferedRides =
    showAllOffered
      ? offeredRides
      : offeredRides.slice(0, 4);

  const displayedJoinedRides =
    showAllJoined
      ? joinedRides
      : joinedRides.slice(0, 4);

  return (
    <Layout>

      <Page>

        <Container>

          <PageBadge>
            My Trip
          </PageBadge>

          {/* OFFERED RIDES */}

          <Section>

            <TopBar>

              <LeftContent>

                <Title>
                  Offered Rides
                </Title>

                <Description>
                  Manage rides created by
                  you for passengers.
                </Description>

              </LeftContent>

              <ActionWrapper>

                {
                  offeredRides.length >
                  4 && (
                    <ViewAllButton
                      onClick={() =>
                        setShowAllOffered(
                          !showAllOffered
                        )
                      }
                    >
                      {
                        showAllOffered
                          ? "Show Less"
                          : "View All"
                      }
                    </ViewAllButton>
                  )
                }

                <CreateRideButton
                  onClick={() =>
                    setShowCreatePopup(
                      true
                    )
                  }
                >
                  <PlusIcon>
                    +
                  </PlusIcon>

                  Create Ride
                </CreateRideButton>

              </ActionWrapper>

            </TopBar>

            {
              offeredRides.length >
                0 ? (
                <RideGrid
                  rides={
                    displayedOfferedRides
                  }
                  onViewRide={(
                    ride
                  ) =>
                    openRidePopup(
                      ride
                    )
                  }
                />
              ) : (
                <EmptyText>
                  No offered rides found.
                </EmptyText>
              )
            }

          </Section>

          {/* JOINED RIDES */}

          <Section>

            <TopBar>

              <LeftContent>

                <Title>
                  Joined Rides
                </Title>

                <Description>
                  View rides you joined
                  through WayMate.
                </Description>

              </LeftContent>

              {
                joinedRides.length >
                4 && (
                  <ViewAllButton
                    onClick={() =>
                      setShowAllJoined(
                        !showAllJoined
                      )
                    }
                  >
                    {
                      showAllJoined
                        ? "Show Less"
                        : "View All"
                    }
                  </ViewAllButton>
                )
              }

            </TopBar>

            {
              joinedRides.length >
                0 ? (
                <RideGrid
                  rides={
                    displayedJoinedRides
                  }
                  onViewRide={(
                    ride
                  ) =>
                    openRidePopup(
                      ride
                    )
                  }
                />
              ) : (
                <EmptyText>
                  No joined rides found.
                </EmptyText>
              )
            }

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