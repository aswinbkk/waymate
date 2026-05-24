import React, {
  useEffect,
  useState
} from "react";

import styled from "styled-components";

import { useSearchParams } from "react-router-dom";

import Layout from "../layouts/Layout";

import RideGrid from "../components/RideGrid";

import RideDetailsPopup from "../components/RideDetailsPopup";

import {
  searchUserRides
} from "../api/apiUserRide";

import useRideActions from "../hooks/useRideActions";

const Page = styled.div`
  min-height: 100vh;

  padding: 40px 20px;

  background: #f8fafc;
`;

const Container = styled.div`
  max-width: 1300px;

  margin: auto;
`;

const Header = styled.div`
  margin-bottom: 35px;
`;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 800;

  color: #0f172a;

  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 15px;

  color: #64748b;

  line-height: 1.7;
`;

const LoadingText = styled.p`
  font-size: 16px;

  color: #334155;

  padding: 30px 0;
`;

const EmptyState = styled.div`
  background: white;

  padding: 40px 20px;

  border-radius: 24px;

  text-align: center;

  border: 1px solid #e2e8f0;

  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.05);
`;

const EmptyTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;

  color: #0f172a;

  margin-bottom: 10px;
`;

const EmptyText = styled.p`
  color: #64748b;

  font-size: 15px;
`;

const SearchResults = () => {

  const [searchParams] =
    useSearchParams();

  const [rides, setRides] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [count, setCount] =
    useState(0);

  const originName =
    searchParams.get("originName") || "";

  const destinationName =
    searchParams.get("destinationName") || "";

  const range =
    searchParams.get("range") || "";

  const status =
    searchParams.get("status") || "open";

  const {
    showRidePopup,
    selectedRide,
    rideType,
    openRidePopup,
    closeRidePopup,
    handleJoinRide
  } = useRideActions({
    fetchRides: fetchSearchResults
  });

  // Fetch Search Results
  async function fetchSearchResults() {

    try {

      setLoading(true);

      const response =
        await searchUserRides({
          originName,
          destinationName,
          range,
          status
        });

      console.log(
        "Search Response:",
        response
      );

      if (response?.success) {

        setRides(response.data);

        setCount(response.count);

      } else {

        setRides([]);

        setCount(0);
      }

    } catch (error) {

      console.error(error);

      setRides([]);

      setCount(0);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    fetchSearchResults();

  }, []);

  return (
    <Layout>

      <Page>

        <Container>

          <Header>

            <Title>
              Search Results
            </Title>

            <Description>
              Available rides matching your
              search ({count} rides found)
            </Description>

          </Header>

          {loading ? (

            <LoadingText>
              Loading rides...
            </LoadingText>

          ) : rides.length === 0 ? (

            <EmptyState>

              <EmptyTitle>
                No Rides Found
              </EmptyTitle>

              <EmptyText>
                Try changing the origin,
                destination or ride status.
              </EmptyText>

            </EmptyState>

          ) : (

            <RideGrid
              rides={rides}
              onViewRide={(ride) =>
                openRidePopup(
                  ride,
                  "available"
                )
              }
            />

          )}

        </Container>

      </Page>

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

export default SearchResults;