import React from "react";
import styled from "styled-components";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const PageContainer = styled.div`
  min-height: 100vh;

  background:
    linear-gradient(
      180deg,
      #f8fbff 0%,
      #ffffff 100%
    );
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1300px;

  margin: auto;

  padding: 50px;

  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;

const ProfileCard = styled.div`
  background: rgba(255,255,255,0.95);

  border-radius: 30px;

  padding: 40px;

  border: 1px solid rgba(37,99,235,0.08);

  box-shadow:
    0 12px 40px rgba(15,23,42,0.08);

  display: flex;
  flex-direction: column;

  gap: 40px;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 30px;

  flex-wrap: wrap;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  gap: 24px;
`;

const UserAvatar = styled.div`
  width: 95px;
  height: 95px;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  background:
    linear-gradient(
      135deg,
      #22c55e,
      #06b6d4,
      #2563eb
    );

  color: white;

  font-size: 34px;
  font-weight: 800;

  box-shadow:
    0 12px 28px rgba(37,99,235,0.18);
`;

const UserText = styled.div`
  h1 {
    font-size: 34px;
    font-weight: 800;

    color: #0f172a;

    margin-bottom: 8px;
  }

  p {
    color: #64748b;
    font-size: 15px;

    line-height: 1.6;
  }
`;

const EditButton = styled.button`
  padding: 14px 24px;

  border: none;
  border-radius: 16px;

  cursor: pointer;

  color: white;

  font-size: 14px;
  font-weight: 700;

  background:
    linear-gradient(
      135deg,
      #22c55e,
      #06b6d4,
      #2563eb
    );

  transition: 0.35s;

  box-shadow:
    0 10px 24px rgba(37,99,235,0.16);

  &:hover {
    transform: translateY(-2px);

    box-shadow:
      0 14px 28px rgba(37,99,235,0.22);
  }
`;

const DetailsGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailCard = styled.div`
  padding: 24px;

  border-radius: 22px;

  background:
    linear-gradient(
      135deg,
      rgba(34,197,94,0.05),
      rgba(6,182,212,0.05),
      rgba(37,99,235,0.05)
    );

  border: 1px solid rgba(37,99,235,0.08);
`;

const Label = styled.p`
  font-size: 13px;
  font-weight: 700;

  color: #64748b;

  margin-bottom: 10px;

  text-transform: uppercase;

  letter-spacing: 1px;
`;

const Value = styled.h3`
  font-size: 20px;
  font-weight: 700;

  color: #0f172a;

  word-break: break-word;
`;

const RideStats = styled.div`
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;

  border-radius: 24px;

  padding: 30px 20px;

  text-align: center;

  border: 1px solid rgba(37,99,235,0.08);

  box-shadow:
    0 10px 30px rgba(15,23,42,0.05);
`;

const StatNumber = styled.h2`
  font-size: 42px;
  font-weight: 800;

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

  font-size: 15px;
  font-weight: 600;
`;

const User = () => {

  // Example user data
  const userData = {
    firstName: "Aswin",
    lastName: "Babu",
    email: "aswin@gmail.com",
    phone: "+91 9876543210",
    totalRides: 28,
    joinedRides: 14,
    offeredRides: 9
  };

  return (
    <PageContainer>

      <Navbar />

      <ContentWrapper>

        <ProfileCard>

          <TopSection>

            <UserInfo>

              <UserAvatar>
                {userData.firstName.charAt(0)}
              </UserAvatar>

              <UserText>

                <h1>
                  {userData.firstName}
                  {" "}
                  {userData.lastName}
                </h1>

                <p>
                  Smart Rider at WayMate
                </p>

              </UserText>

            </UserInfo>

            <EditButton>
              Edit Profile
            </EditButton>

          </TopSection>

          <DetailsGrid>

            <DetailCard>

              <Label>
                Email Address
              </Label>

              <Value>
                {userData.email}
              </Value>

            </DetailCard>

            <DetailCard>

              <Label>
                Phone Number
              </Label>

              <Value>
                {userData.phone}
              </Value>

            </DetailCard>

          </DetailsGrid>

          <RideStats>

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

          </RideStats>

        </ProfileCard>

      </ContentWrapper>

      <Footer />

    </PageContainer>
  );
};

export default User;