import React, { useEffect, useState, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
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
import HomeSlider from "../components/HomeSlider";

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const ContentWrapper = styled.section`
  width: 100%;
  max-width: 1350px;

  margin: auto;

  padding: 40px 32px;

  @media (max-width: 768px) {
    padding: 28px 18px;
  }
`;

const HeroSection = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 28px;

  padding-bottom: 18px;

  border-bottom: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    margin-bottom: 22px;
    padding-bottom: 14px;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Badge = styled.div`
  width: fit-content;

  padding: 8px 14px;

  border-radius: 999px;

  background: rgba(37, 99, 235, 0.08);

  color: #2563eb;

  font-size: 12px;
  font-weight: 700;

  letter-spacing: 0.4px;

  margin-bottom: 14px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 800;

  color: #0f172a;

  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.p`
  margin-top: 10px;

  color: #64748b;

  font-size: 15px;
  line-height: 1.7;

  max-width: 650px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ViewAllButton = styled.button`
  border: none;
  outline: none;

  padding: 12px 18px;

  border-radius: 14px;

  background: white;

  border: 1px solid #dbeafe;

  color: #2563eb;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition: all 0.25s ease;

  &:hover {
    background: #eff6ff;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Home = () => {
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const location = useLocation();
  const [userRides, setUserRides] = useState([]);
  const [agencyRides, setAgencyRides] = useState([]);
  const [joinedRideIds, setJoinedRideIds] = useState([]);
  const [createdRideIds, setCreatedRideIds] = useState([]);
  const [showAllUserRides, setShowAllUserRides] =
    useState(false);

  const [
    showAllAgencyRides,
    setShowAllAgencyRides,
  ] = useState(false);


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

  const userRideRef = useRef(null);

  const agencyRideRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(
      location.search
    );

    const section =
      params.get("section");

    if (section === "user-rides") {

      setShowAllUserRides(true);

      setTimeout(() => {
        userRideRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);

    } else if (
      section === "agency-rides"
    ) {

      setShowAllAgencyRides(true);

      setTimeout(() => {
        agencyRideRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  }, [location]);

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
          <HomeSlider />
        </ContentWrapper>
        <ContentWrapper ref={userRideRef}>
          <HeroSection>

            <HeroContent>
              <Badge>COMMUNITY RIDES</Badge>

              <Title>User Rides</Title>

              <Subtitle>
                Connect with riders travelling on the
                same route and enjoy affordable,
                eco-friendly journeys together.
              </Subtitle>
            </HeroContent>

            {filteredUserRides.length > 4 && (
              <ViewAllButton
                onClick={() =>
                  setShowAllUserRides(
                    !showAllUserRides
                  )
                }
              >
                {showAllUserRides
                  ? "Show Less"
                  : "View All"}
              </ViewAllButton>
            )}

          </HeroSection>

          <RideGrid
            rides={
              showAllUserRides
                ? filteredUserRides
                : filteredUserRides.slice(0, 4)
            }
            onViewRide={(ride) =>
              openRidePopup(ride)
            }
          />
        </ContentWrapper>

        <ContentWrapper ref={agencyRideRef}>
          <HeroSection>

            <HeroContent>
              <Badge>PREMIUM TRAVEL</Badge>

              <Title>Agency Rides</Title>

              <Subtitle>
                Book verified agency rides with
                comfortable seating and professional
                travel experience.
              </Subtitle>
            </HeroContent>

            {filteredAgencyRides.length > 4 && (
              <ViewAllButton
                onClick={() =>
                  setShowAllAgencyRides(
                    !showAllAgencyRides
                  )
                }
              >
                {showAllAgencyRides
                  ? "Show Less"
                  : "View All"}
              </ViewAllButton>
            )}

          </HeroSection>

          <RideGrid
            rides={
              showAllAgencyRides
                ? filteredAgencyRides
                : filteredAgencyRides.slice(0, 4)
            }
            onViewRide={(ride) =>
              openRidePopup(ride)
            }
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