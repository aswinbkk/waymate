import React, {
  useEffect,
  useState
} from "react";

import {
  useSearchParams
} from "react-router-dom";

import styled from "styled-components";

import Layout from "../layouts/Layout";
import RideGrid from "../components/RideGrid";
import RideDetailsPopup from "../components/RideDetailsPopup";

import {
  searchUserRides
} from "../api/apiUserRide";

import {
  searchAgencyRides
} from "../api/apiAgencyRide";

import useRideActions from "../hooks/useRideActions";

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

  const [searchParams] =
    useSearchParams();

  const [rides, setRides] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [count, setCount] =
    useState(0);

  const type =
    searchParams.get("type") ||
    "user";

  const originName =
    searchParams.get("originName") ||
    "";

  const destinationName =
    searchParams.get("destinationName") ||
    "";

  const range =
    searchParams.get("range") || "";

  const status =
    searchParams.get("status") ||
    "open";

  const {
    showRidePopup,
    selectedRide,
    rideType,
    openRidePopup,
    closeRidePopup,
    handleJoinRide
  } = useRideActions({});

  // Fetch Search Results
  const fetchSearchResults =
    async () => {

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
            ? await searchAgencyRides(
                searchData
              )
            : await searchUserRides(
                searchData
              );

        console.log(
          "Search Response:",
          response
        );

        if (response?.success) {

          setRides(response.data);

          setCount(
            response.data.length
          );

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
    };

  useEffect(() => {

    fetchSearchResults();

  }, []);

  return (
    <Layout>

      <Container>

        <Title>
          {type === "agency"
            ? "Agency Ride Results"
            : "User Ride Results"}
        </Title>

        <Description>
          {count} rides found matching
          your search
        </Description>

        {loading ? (

          <LoadingText>
            Loading rides...
          </LoadingText>

        ) : rides.length === 0 ? (

          <EmptyText>
            No rides found
          </EmptyText>

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