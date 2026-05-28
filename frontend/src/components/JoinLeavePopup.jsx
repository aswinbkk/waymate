import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 3000;
`;

const PopupContainer = styled.div`
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: 30px;
  padding: 35px;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.18);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
`;

const CloseButton = styled.button`
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  background: #f1f5f9;
  color: #64748b;
  font-size: 22px;
  font-weight: 700;

  &:hover {
    background: #e2e8f0;
  }
`;

const Route = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 28px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-bottom: 30px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  padding: 18px;
  border-radius: 18px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
`;

const Label = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const Value = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
`;

const PreferenceContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 35px;
`;

const PreferenceTag = styled.div`
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb;
  font-size: 13px;
  font-weight: 700;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 14px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  color: white;
  font-size: 14px;
  font-weight: 700;

  background: ${({ $variant }) =>
    $variant === "leave" ? "#f59e0b" : "#2563eb"};
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const JoinLeavePopup = ({
  show,
  ride,
  isLoggedIn,
  isJoined,
  isOwner,
  onClose,
  onJoin,
  onLeave
}) => {
  if (!show || !ride) return null;
  const preferences = ride.preferences || {};

  return (
    <Overlay>
      <PopupContainer>
        <Header>
          <Title>Ride Details</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <Route>
          {ride.origin} → {ride.destination}
        </Route>

        <InfoGrid>
          <InfoCard>
            <Label>Date</Label>
            <Value>
              {new Date(ride.date).toLocaleDateString()}
            </Value>
          </InfoCard>

          <InfoCard>
            <Label>Seats</Label>
            <Value>
              {ride.availableSeats} / {ride.totalSeats}
            </Value>
          </InfoCard>

          <InfoCard>
            <Label>Vehicle</Label>
            <Value>{ride.vehicleNumber || "N/A"}</Value>
          </InfoCard>

          <InfoCard>
            <Label>Price</Label>
            <Value>₹{ride.pricePerSeat} / seat</Value>
          </InfoCard>

          <InfoCard>
            <Label>Status</Label>
            <Value>{ride.status}</Value>
          </InfoCard>
        </InfoGrid>

        <PreferenceContainer>
          {preferences.gender && (
            <PreferenceTag>{preferences.gender}</PreferenceTag>
          )}
          <PreferenceTag>
            {preferences.ac ? "AC" : "Non AC"}
          </PreferenceTag>
        </PreferenceContainer>

        <ButtonContainer>
          {isOwner ? (
            <p style={{ color: "#64748b", fontWeight: 600 }}>
              You created this ride
            </p>
          ) : isLoggedIn ? (
            isJoined ? (
              <ActionButton $variant="leave" onClick={onLeave}>
                Leave Ride
              </ActionButton>
            ) : (
              <ActionButton onClick={onJoin}>
                Join Ride
              </ActionButton>
            )
          ) : (
            <ActionButton onClick={onJoin}>
              Join Ride
            </ActionButton>
          )}
        </ButtonContainer>
      </PopupContainer>
    </Overlay>
  );
};

export default JoinLeavePopup;