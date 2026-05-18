import React from "react";
import styled from "styled-components";

import Layout from "../layouts/Layout";

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
  max-width: 1100px;
  margin: auto;
`;

const ProfileCard = styled.div`
  background: white;

  border-radius: 24px;

  padding: 40px;

  border: 1px solid #e2e8f0;

  box-shadow:
    0 10px 30px rgba(15,23,42,0.06);

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 20px;

  flex-wrap: wrap;

  margin-bottom: 40px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Avatar = styled.div`
  width: 90px;
  height: 90px;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 34px;
  font-weight: 700;

  color: white;

  background:
    linear-gradient(
      135deg,
      #22c55e,
      #06b6d4,
      #2563eb
    );
`;

const UserDetails = styled.div`
  h1 {
    font-size: 30px;
    color: #0f172a;
    margin-bottom: 6px;
  }

  p {
    color: #64748b;
    font-size: 15px;
  }
`;

const Button = styled.button`
  padding: 12px 20px;

  border: none;
  border-radius: 12px;

  cursor: pointer;

  font-size: 14px;
  font-weight: 600;

  color: white;

  background:
    linear-gradient(
      135deg,
      #22c55e,
      #06b6d4,
      #2563eb
    );

  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  color: #0f172a;

  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 20px;

  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  padding: 20px;

  border-radius: 18px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;
`;

const Label = styled.p`
  font-size: 13px;
  font-weight: 600;

  color: #64748b;

  margin-bottom: 8px;
`;

const Value = styled.h3`
  font-size: 18px;
  color: #0f172a;

  word-break: break-word;
`;

const StatsGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  padding: 24px;

  border-radius: 18px;

  text-align: center;

  background: #f8fafc;

  border: 1px solid #e2e8f0;
`;

const StatNumber = styled.h1`
  font-size: 38px;
  margin-bottom: 10px;

  background:
    linear-gradient(
      135deg,
      #22c55e,
      #06b6d4,
      #2563eb
    );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.p`
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
`;

const Profile = () => {

  const userData = {
    firstName: "User",
    lastName: "Name",
    email: "username@gmail.com",
    phone: "+91 9876543210",
    totalRides: 10,
    joinedRides: 4,
    offeredRides: 6
  };

  return (
    <Layout>

      <Page>

        <Container>

          <ProfileCard>

            <TopSection>

              <ProfileInfo>

                <Avatar>
                  {userData.firstName.charAt(0)}
                </Avatar>

                <UserDetails>

                  <h1>
                    {userData.firstName}
                    {" "}
                    {userData.lastName}
                  </h1>

                  <p>
                    Smart Rider at WayMate
                  </p>

                </UserDetails>

              </ProfileInfo>

              <Button>
                Edit Profile
              </Button>

            </TopSection>

            <SectionTitle>
              Personal Details
            </SectionTitle>

            <Grid>

              <Card>

                <Label>
                  Email Address
                </Label>

                <Value>
                  {userData.email}
                </Value>

              </Card>

              <Card>

                <Label>
                  Phone Number
                </Label>

                <Value>
                  {userData.phone}
                </Value>

              </Card>

            </Grid>

            <SectionTitle>
              Ride Statistics
            </SectionTitle>

            <StatsGrid>

              <StatCard>

                <StatNumber>
                  {userData.totalRides}
                </StatNumber>

                <StatLabel>
                  Total Rides
                </StatLabel>

              </StatCard>

              <StatCard>

                <StatNumber>
                  {userData.joinedRides}
                </StatNumber>

                <StatLabel>
                  Joined Rides
                </StatLabel>

              </StatCard>

              <StatCard>

                <StatNumber>
                  {userData.offeredRides}
                </StatNumber>

                <StatLabel>
                  Offered Rides
                </StatLabel>

              </StatCard>

            </StatsGrid>

          </ProfileCard>

        </Container>

      </Page>

    </Layout>
  );
};

export default Profile;