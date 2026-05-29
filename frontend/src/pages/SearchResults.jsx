import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../layouts/Layout";
import RideGrid from "../components/RideGrid";
import JoinLeavePopup from "../components/JoinLeavePopup";
import { searchUserRides } from "../api/apiUserRide";
import { searchAgencyRides } from "../api/apiAgencyRide";
import useRideActions from "../hooks/useRideActions";
import { AuthContext } from "../context/AuthContext";
import { viewUserJoinedRides, viewUserCreatedRides } from "../api/apiUserRide";

const Container = styled.div`
  padding: 40px;
  max-width: 1300px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 800;
  margin-bottom: 10px;
  color: #0f172a;
`;

const Description = styled.p`
  color: #64748b;
  margin-bottom: 30px;
  font-size: 15px;
`;

const LoadingText = styled.p`
  color: #2563eb;
`;

const EmptyText = styled.p`
  color: #64748b;
`;

const SearchResults = () => {
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const [searchParams] = useSearchParams();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [joinedRideIds, setJoinedRideIds] = useState([]);
  const [createdRideIds, setCreatedRideIds] = useState([]);
  const type = searchParams.get("type") || "user";
  const originName = searchParams.get("originName") || "";
  const destinationName = searchParams.get("destinationName") || "";
  const range = searchParams.get("range") || "";
  const status = searchParams.get("status") || "open";

  // FETCH ALL DATA
  const fetchAllData = async () => {
    await fetchSearchResults();

    if (isLoggedIn) {
      await fetchJoinedRides();
      await fetchCreatedRides();
    } else {
      setJoinedRideIds([]);
      setCreatedRideIds([]);
    }
  };

  const {
    showRidePopup,
    selectedRide,
    openRidePopup,
    closeRidePopup,
    handleJoinRide,
    handleLeaveRide
  } = useRideActions({
    fetchRides: fetchAllData
  });

  //FETCH JOINED IDS
  const fetchJoinedRides = async () => {
    try {
      const res = await viewUserJoinedRides();
      setJoinedRideIds( res?.joinedRideIds?.map(String) || [] );

    } catch (error) {
      console.error(error);
      setJoinedRideIds([]);
    }
  };

  // FETCH CREATED IDS
  const fetchCreatedRides = async () => {
    try {
      const res = await viewUserCreatedRides();
      setCreatedRideIds(
        res?.createdRideIds?.map(String) || []
      );
    } catch (error) {
      console.error(error);
      setCreatedRideIds([]);
    }
  };

  // SEARCH
  const fetchSearchResults = async () => {
    try {
      setLoading(true);

      const searchData = {
        originName,
        destinationName,
        range,
        status
      };

      const response =
        type === "agency"
          ? await searchAgencyRides(searchData)
          : await searchUserRides(searchData);

      const result = response?.data || [];

      setRides(result);
      setCount(result.length);

    } catch (error) {
      console.error(error);
      setRides([]);
      setCount(0);

    } finally {
      setLoading(false);
    }
  };

  //  EFFECT 
  useEffect(() => {
    fetchAllData();
  }, [
    isLoggedIn,
    type,
    originName,
    destinationName,
    range,
    status
  ]);

  // FILTER OWNER RIDES
  const filteredRides = isLoggedIn
    ? rides.filter(
        (ride) =>
          !createdRideIds.includes(
            String(ride.id)
          )
      )
    : rides;

  // STATUS
  const rideId = String( selectedRide?.id || ""
  );

  const isJoined =
    joinedRideIds.includes(rideId);

  const isOwner =
    createdRideIds.includes(rideId);

  // JOIN 
  const onJoinRide = async () => {
    await handleJoinRide();

    setJoinedRideIds((prev) => [
      ...prev,
      rideId
    ]);
  };

  // LEAVE
  const onLeaveRide = async () => {
    await handleLeaveRide();

    setJoinedRideIds((prev) =>
      prev.filter((id) => id !== rideId)
    );
  };

  return (
    <Layout>
      <Container>
        <Title>
          {type === "agency"
            ? "Agency Ride Results"
            : "User Ride Results"}
        </Title>

        <Description>
          {count} rides found matching your search
        </Description>

        {loading ? (
          <LoadingText> Loading rides... </LoadingText>
        ) : filteredRides.length === 0 ? (
          <EmptyText>
            No rides found
          </EmptyText>
        ) : (
          <RideGrid
            rides={filteredRides}
            onViewRide={(ride) =>
              openRidePopup(ride)
            }
          />
        )}
      </Container>

      <JoinLeavePopup
        show={!!selectedRide}
        ride={selectedRide}
        isLoggedIn={isLoggedIn}
        isJoined={isJoined}
        isOwner={isOwner}
        onClose={closeRidePopup}
        onJoin={onJoinRide}
        onLeave={onLeaveRide}
      />
    </Layout>
  );
};

export default SearchResults;