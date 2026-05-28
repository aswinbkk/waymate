import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 24px;

  margin-top: 24px;

  @media (max-width: 1200px) {
    grid-template-columns:
      repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns:
      repeat(2, 1fr);

    gap: 18px;
  }

  @media (max-width: 500px) {
    grid-template-columns:
      repeat(1, 1fr);

    gap: 16px;
  }
`;

const RideCard = styled.div`
  position: relative;

  background: white;

  border-radius: 24px;

  padding: 20px;

  border: 1px solid #e2e8f0;

  overflow: hidden;

  transition: all 0.3s ease;

  box-shadow:
    0 4px 20px
    rgba(15, 23, 42, 0.05);

  &:hover {
    transform: translateY(-6px);

    box-shadow:
      0 18px 40px
      rgba(15, 23, 42, 0.12);
  }

  &::before {
    content: "";

    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 4px;

    background:
      linear-gradient(
        135deg,
        #22c55e,
        #06b6d4,
        #2563eb
      );
  }

  @media (max-width: 768px) {
    border-radius: 20px;
    padding: 18px;
  }
`;

const TopSection = styled.div`
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 10px;

  margin-bottom: 18px;
`;

const RideRoute = styled.h2`
  font-size: 17px;

  font-weight: 700;

  color: #0f172a;

  line-height: 1.5;

  letter-spacing: -0.3px;

  flex: 1;

  display: -webkit-box;

  -webkit-line-clamp: 2;

  -webkit-box-orient: vertical;

  overflow: hidden;

  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 500px) {
    font-size: 15px;
  }
`;

const StatusBadge = styled.div`
  padding: 7px 12px;

  border-radius: 999px;

  background:
    ${({ status }) =>
      status === "completed"
        ? "rgba(239,68,68,0.12)"
        : "rgba(34,197,94,0.12)"};

  color:
    ${({ status }) =>
      status === "completed"
        ? "#ef4444"
        : "#16a34a"};

  font-size: 11px;

  font-weight: 700;

  text-transform: capitalize;

  white-space: nowrap;
`;

const InfoSection = styled.div`
  display: flex;

  flex-direction: column;

  gap: 12px;

  margin-top: 16px;
`;

const InfoItem = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;

  padding-bottom: 10px;

  border-bottom: 1px solid #f1f5f9;

  span:first-child {
    color: #64748b;

    font-size: 13px;

    font-weight: 500;
  }

  span:last-child {
    color: #0f172a;

    font-size: 13px;

    font-weight: 700;

    text-align: right;
  }
`;

const PreferenceContainer = styled.div`
  display: flex;

  gap: 8px;

  flex-wrap: wrap;

  margin-top: 18px;
`;

const PreferenceTag = styled.div`
  padding: 7px 12px;

  border-radius: 999px;

  background: #eff6ff;

  color: #2563eb;

  font-size: 11px;

  font-weight: 700;
`;

const BottomSection = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 14px;

  margin-top: 22px;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Price = styled.h3`
  display: flex;

  align-items: flex-end;

  gap: 4px;

  font-size: 22px;

  font-weight: 700;

  color: #0f172a;

  line-height: 1;

  letter-spacing: -0.5px;

  span {
    font-size: 12px;

    color: #64748b;

    font-weight: 500;

    margin-bottom: 2px;
  }

  @media (max-width: 768px) {
    font-size: 20px;

    span {
      font-size: 11px;
    }
  }
`;

const ViewButton = styled.button`
  border: none;

  outline: none;

  padding: 12px 18px;

  border-radius: 14px;

  cursor: pointer;

  color: white;

  font-size: 13px;

  font-weight: 700;

  background:
    linear-gradient(
      135deg,
      #22c55e,
      #06b6d4,
      #2563eb
    );

  transition: all 0.3s ease;

  box-shadow:
    0 10px 20px
    rgba(37, 99, 235, 0.22);

  &:hover {
    transform: translateY(-3px);

    box-shadow:
      0 16px 30px
      rgba(37, 99, 235, 0.3);
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const EmptyState = styled.div`
  width: 100%;

  padding: 60px 20px;

  text-align: center;

  border-radius: 24px;

  background: white;

  border: 1px dashed #cbd5e1;

  color: #64748b;

  font-size: 15px;

  font-weight: 600;
`;

const RideGrid = ({
  rides = [],
  onViewRide = () => {},
}) => {

  if (!rides.length) {
    return (
      <EmptyState>
        No rides available
      </EmptyState>
    );
  }

  return (
    <GridContainer>

      {rides.map((ride) => (

        <RideCard key={ride.id}>

          <TopSection>

            <RideRoute>
              {ride.origin}
              {" → "}
              {ride.destination}
            </RideRoute>

            <StatusBadge
              status={ride.status}
            >
              {ride.status}
            </StatusBadge>

          </TopSection>

          <InfoSection>

            <InfoItem>
              <span>Date</span>

              <span>
                {
                  new Date(
                    ride.date
                  ).toLocaleDateString()
                }
              </span>
            </InfoItem>

            <InfoItem>
              <span>Seats</span>

              <span>
                {ride.availableSeats}
                {" / "}
                {ride.totalSeats}
              </span>
            </InfoItem>

            <InfoItem>
              <span>Vehicle</span>

              <span>
                {ride.vehicleNumber}
              </span>
            </InfoItem>

          </InfoSection>

          <PreferenceContainer>

            <PreferenceTag>
              {ride.preferences.gender}
            </PreferenceTag>

            <PreferenceTag>
              {
                ride.preferences.ac
                  ? "AC"
                  : "Non AC"
              }
            </PreferenceTag>

          </PreferenceContainer>

          <BottomSection>

            <Price>
              ₹{ride.pricePerSeat}

              <span>
                {" / seat"}
              </span>
            </Price>

            <ViewButton
              onClick={() =>
                onViewRide(ride)
              }
            >
              View Ride
            </ViewButton>

          </BottomSection>

        </RideCard>

      ))}

    </GridContainer>
  );
};

export default RideGrid;