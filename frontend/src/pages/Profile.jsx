import React, {
  useEffect,
  useState
} from "react";

import styled from "styled-components";

import Layout from "../layouts/Layout";

import {
  getProfile,
  updateProfile
} from "../api/apiUser";

import {
  viewUserCreatedRides,
  viewUserJoinedRides
} from "../api/apiUserRide";

import { toast } from "react-toastify";

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

const LoadingText = styled.p`
  text-align: center;

  font-size: 18px;

  color: #64748b;
`;

/* Popup */

const Overlay = styled.div`
  position: fixed;

  inset: 0;

  background: rgba(15,23,42,0.45);

  backdrop-filter: blur(4px);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 2000;
`;

const Popup = styled.div`
  width: 95%;
  max-width: 500px;

  background: white;

  border-radius: 24px;

  padding: 30px;

  box-shadow:
    0 20px 50px rgba(15,23,42,0.15);
`;

const PopupTitle = styled.h2`
  font-size: 26px;

  color: #0f172a;

  margin-bottom: 25px;
`;

const Form = styled.form`
  display: flex;

  flex-direction: column;

  gap: 18px;
`;

const InputGroup = styled.div`
  display: flex;

  flex-direction: column;

  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 600;

    color: #0f172a;
  }
`;

const Input = styled.input`
  padding: 14px;

  border-radius: 12px;

  border: 1px solid #cbd5e1;

  font-size: 14px;

  outline: none;

  transition: 0.3s;

  &:focus {
    border-color: #2563eb;

    box-shadow:
      0 0 0 4px rgba(37,99,235,0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;

  gap: 15px;

  margin-top: 10px;
`;

const CancelButton = styled.button`
  flex: 1;

  border: none;

  padding: 14px;

  border-radius: 12px;

  cursor: pointer;

  font-size: 15px;
  font-weight: 700;

  background: #e2e8f0;

  color: #0f172a;

  transition: 0.3s;

  &:hover {
    background: #cbd5e1;
  }
`;

const UpdateButton = styled.button`
  flex: 1;

  border: none;

  padding: 14px;

  border-radius: 12px;

  cursor: pointer;

  font-size: 15px;
  font-weight: 700;

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

const Profile = () => {

  const [userData, setUserData] =
    useState(null);

  const [userRideData, setUserRideData] =
    useState({
      joinedRides: 0,
      offeredRides: 0
    });

  const [loading, setLoading] =
    useState(true);

  const [showEditPopup, setShowEditPopup] =
    useState(false);

  const [editData, setEditData] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    });

  // Fetch Profile
  const fetchProfile = async () => {

    try {

      setLoading(true);

      const [
        profileResponse,
        createdRidesResponse,
        joinedRidesResponse
      ] = await Promise.all([
        getProfile(),
        viewUserCreatedRides(),
        viewUserJoinedRides()
      ]);

      if (profileResponse?.success) {

        setUserData({
          firstName:
            profileResponse.user.name.firstName || "",

          lastName:
            profileResponse.user.name.lastName || "",

          email:
            profileResponse.user.email || "",

          phone:
            profileResponse.user.phone || ""
        });
      }

      const offeredRidesCount =
        createdRidesResponse?.data?.length || 0;

      const joinedRidesCount =
        joinedRidesResponse?.data?.length || 0;

      setUserRideData({
        offeredRides: offeredRidesCount,
        joinedRides: joinedRidesCount
      });

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchProfile();

  }, []);

  // Open Popup
  const handleOpenEdit = () => {

    setEditData({
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      phone: userData?.phone || ""
    });

    setShowEditPopup(true);
  };

  // Handle Input
  const handleChange = (e) => {

    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  // Update Profile
const handleUpdateProfile = async (e) => {

  e.preventDefault();

  try {

    const response =
      await updateProfile({
        fullName: {
          firstName: editData.firstName,
          lastName: editData.lastName
        },
        email: editData.email,
        phone: editData.phone
      });

    if (response?.success) {

      setUserData(editData);

      toast.success(
        "Profile updated successfully"
      );

      setShowEditPopup(false);

    } else {

      toast.error(
        Array.isArray(response?.msg)
          ? response.msg[0]
          : response?.msg || "Update failed"
      );
    }

  } catch (error) {

    console.error(error);

    toast.error(
      "Something went wrong"
    );
  }
};

  if (loading) {

    return (
      <Layout>

        <Page>

          <LoadingText>
            Loading Profile...
          </LoadingText>

        </Page>

      </Layout>
    );
  }

  return (
    <Layout>

      <Page>

        <Container>

          <ProfileCard>

            <TopSection>

              <ProfileInfo>

                <Avatar>

                  {userData?.firstName
                    ?.charAt(0)
                    ?.toUpperCase()}

                </Avatar>

                <UserDetails>

                  <h1>

                    {userData?.firstName}
                    {" "}
                    {userData?.lastName}

                  </h1>

                  <p>
                    Smart Rider at WayMate
                  </p>

                </UserDetails>

              </ProfileInfo>

              <Button
                onClick={handleOpenEdit}
              >
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
                  {userData?.email}
                </Value>

              </Card>

              <Card>

                <Label>
                  Phone Number
                </Label>

                <Value>
                  {userData?.phone}
                </Value>

              </Card>

            </Grid>

            <SectionTitle>
              Ride Statistics
            </SectionTitle>

            <StatsGrid>

              <StatCard>

                <StatNumber>
                  {
                    userRideData.joinedRides +
                    userRideData.offeredRides
                  }
                </StatNumber>

                <StatLabel>
                  Total Rides
                </StatLabel>

              </StatCard>

              <StatCard>

                <StatNumber>
                  {userRideData.joinedRides}
                </StatNumber>

                <StatLabel>
                  Joined Rides
                </StatLabel>

              </StatCard>

              <StatCard>

                <StatNumber>
                  {userRideData.offeredRides}
                </StatNumber>

                <StatLabel>
                  Offered Rides
                </StatLabel>

              </StatCard>

            </StatsGrid>

          </ProfileCard>

        </Container>

      </Page>

      {
        showEditPopup && (

          <Overlay>

            <Popup>

              <PopupTitle>
                Edit Profile
              </PopupTitle>

              <Form
                onSubmit={
                  handleUpdateProfile
                }
              >

                <InputGroup>

                  <label>
                    First Name
                  </label>

                  <Input
                    type="text"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleChange}
                    required
                  />

                </InputGroup>

                <InputGroup>

                  <label>
                    Last Name
                  </label>

                  <Input
                    type="text"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleChange}
                    required
                  />

                </InputGroup>

                <InputGroup>

                  <label>
                    Email
                  </label>

                  <Input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    required
                  />

                </InputGroup>

                <InputGroup>

                  <label>
                    Phone
                  </label>

                  <Input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                    required
                  />

                </InputGroup>

                <ButtonGroup>

                  <CancelButton
                    type="button"
                    onClick={() =>
                      setShowEditPopup(false)
                    }
                  >
                    Cancel
                  </CancelButton>

                  <UpdateButton
                    type="submit"
                  >
                    Update
                  </UpdateButton>

                </ButtonGroup>

              </Form>

            </Popup>

          </Overlay>
        )
      }

    </Layout>
  );
};

export default Profile;