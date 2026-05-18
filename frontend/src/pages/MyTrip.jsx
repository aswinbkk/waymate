import React from "react";
import styled from "styled-components";

import Layout from "../layouts/Layout";

import RideGrid from "../components/RideGrid";

const Page = styled.div`
  min-height: 100vh;

  padding: 40px 20px;

  background:
    linear-gradient(
      180deg,
      #f8fbff,
      #ffffff
    );
`;

const Container = styled.div`
  max-width: 1300px;
  margin: auto;
`;

const Section = styled.div`
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 700;

  color: #0f172a;

  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #64748b;

  font-size: 15px;

  line-height: 1.6;

  margin-bottom: 30px;
`;

const MyTrip = () => {

  // Example Joined Rides
  const joinedRides = [
    {
      id: 1,
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

  // Example Created Rides
  const offeredRides = [
    {
      id: 2,
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

  return (
    <Layout>

      <Page>

        <Container>

          <Section>

            <Title>
              Joined Rides
            </Title>

            <Description>
              View all rides you joined
              through the WayMate platform.
            </Description>

            <RideGrid rides={joinedRides} />

          </Section>

          <Section>

            <Title>
              Created Rides
            </Title>

            <Description>
              Manage rides created by you
              for other passengers.
            </Description>

            <RideGrid rides={offeredRides} />

          </Section>

        </Container>

      </Page>

    </Layout>
  );
};

export default MyTrip;