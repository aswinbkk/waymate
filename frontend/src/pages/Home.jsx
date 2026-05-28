import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Layout from "../layouts/Layout";
import RideGrid from "../components/RideGrid";
import JoinLeavePopup from "../components/JoinLeavePopup";
import {
  getUserRide,
  viewUserJoinedRides,
  viewUserCreatedRides
} from "../api/apiUserRide";
import { getAgencyRide } from "../api/apiAgencyRide";
import useRideActions from "../hooks/useRideActions";
import { AuthContext } from "../context/AuthContext";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
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
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 16px;
  margin-top: 10px;
`;

const Home = () => {
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const [userRides, setUserRides] = useState([]);
  const [agencyRides, setAgencyRides] = useState([]);
  const [joinedRideIds, setJoinedRideIds] = useState([]);
  const [createdRideIds, setCreatedRideIds] = useState([]);

  const fetchAllRides = async () => {
    await fetchUserRides();
    await fetchAgencyRides();

    if (isLoggedIn) {
      await fetchJoinedRides();
      await fetchCreatedRides();
    }
  };

  const {
    showRidePopup,
    selectedRide,
    openRidePopup,
    closeRidePopup,
    handleJoinRide,
    handleLeaveRide
  } = useRideActions({ fetchRides: fetchAllRides });

  // ---------------- FETCH RIDES ----------------
  const fetchUserRides = async () => {
    try {
      const res = await getUserRide();
      setUserRides(res?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAgencyRides = async () => {
    try {
      const res = await getAgencyRide();
      setAgencyRides(res?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- FETCH JOINED IDS ----------------
  const fetchJoinedRides = async () => {
    try {
      const res = await viewUserJoinedRides();
      console.log("viewUserJoinedRides", res);
      const ids = res?.joinedRideIds || [];
      console.log("joinedRideIds", ids);
      setJoinedRideIds(ids.map(String));

    } catch (err) {
      console.error(err);
      setJoinedRideIds([]);
    }
  };

  // ---------------- FETCH CREATED IDS ----------------
  const fetchCreatedRides = async () => {
    try {
      const res = await viewUserCreatedRides();
      console.log("viewUserCreatedRides", res);
      const ids = res?.createdRideIds || [];
      setCreatedRideIds(ids.map(String));

    } catch (err) {
      console.error(err);
      setCreatedRideIds([]);
    }
  };

  // ---------------- EFFECT ----------------
  useEffect(() => {
    fetchUserRides();
    fetchAgencyRides();

    if (isLoggedIn) {
      fetchJoinedRides();
      fetchCreatedRides();
    } else {
      setJoinedRideIds([]);
      setCreatedRideIds([]);
    }
  }, [isLoggedIn]);

  // ---------------- FILTER ----------------
  const filteredUserRides = isLoggedIn
    ? userRides.filter((r) => !createdRideIds.includes(String(r.id)))
    : userRides;

  const filteredAgencyRides = isLoggedIn
    ? agencyRides.filter((r) => !createdRideIds.includes(String(r.id)))
    : agencyRides;

  // ---------------- STATUS ----------------
  const rideId = String(selectedRide?.id || "");

  const isJoined = joinedRideIds.includes(rideId);
  const isOwner = createdRideIds.includes(rideId);

  return (
    <Layout>
      <PageContainer>
        <ContentWrapper>
          <HeroSection>
            <Title>User Rides</Title>
            <Subtitle>Connect with riders travelling on same route</Subtitle>
          </HeroSection>

          <RideGrid
            rides={filteredUserRides}
            onViewRide={(ride) => openRidePopup(ride)}
          />
        </ContentWrapper>

        <ContentWrapper>
          <HeroSection>
            <Title>Agency Rides</Title>
            <Subtitle>Premium verified agency rides</Subtitle>
          </HeroSection>

          <RideGrid
            rides={filteredAgencyRides}
            onViewRide={(ride) => openRidePopup(ride)}
          />
        </ContentWrapper>
      </PageContainer>

      {/* POPUP */}
      <JoinLeavePopup
        show={!!selectedRide}
        ride={selectedRide}
        isLoggedIn={isLoggedIn}
        isJoined={isJoined}
        isOwner={isOwner}
        onClose={closeRidePopup}
        onJoin={handleJoinRide}
        onLeave={handleLeaveRide}
      />
    </Layout>
  );
};

export default Home;