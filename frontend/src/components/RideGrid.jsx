import styled from "styled-components";

const GridContainer = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 24px;

  margin-top: 40px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RideCard = styled.div`
  background: rgba(255,255,255,0.95);

  border-radius: 24px;

  padding: 24px;

  border: 1px solid rgba(37,99,235,0.08);

  box-shadow:
    0 10px 30px rgba(15,23,42,0.06);

  transition: 0.35s;

  &:hover {
    transform: translateY(-4px);

    box-shadow:
      0 18px 40px rgba(15,23,42,0.1);
  }
`;

const RideRoute = styled.h2`
  font-size: 22px;
  font-weight: 700;

  color: #0f172a;

  margin-bottom: 20px;

  line-height: 1.4;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;

  margin-bottom: 22px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 10px;

  padding-bottom: 10px;

  border-bottom: 1px solid rgba(226,232,240,0.7);

  span:first-child {
    color: #64748b;

    font-size: 14px;
    font-weight: 500;
  }

  span:last-child {
    color: #0f172a;

    font-size: 14px;
    font-weight: 700;
  }
`;

const PreferenceContainer = styled.div`
  display: flex;

  gap: 10px;

  margin-top: 6px;
`;

const PreferenceTag = styled.div`
  padding: 7px 12px;

  border-radius: 999px;

  background:
    linear-gradient(
      135deg,
      rgba(34,197,94,0.12),
      rgba(6,182,212,0.12),
      rgba(37,99,235,0.12)
    );

  color: #0284c7;

  font-size: 12px;
  font-weight: 700;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 22px;
`;

const Price = styled.h3`
  font-size: 28px;
  font-weight: 800;

  color: #0f172a;

  span {
    font-size: 14px;
    font-weight: 500;

    color: #64748b;
  }
`;

const JoinButton = styled.button`
  padding: 13px 22px;

  border: none;
  border-radius: 14px;

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
    0 10px 20px rgba(37,99,235,0.16);

  &:hover {
    transform: translateY(-2px);

    box-shadow:
      0 14px 28px rgba(37,99,235,0.22);
  }
`;

const RideGrid = ({ rides }) => {

  return (
    <GridContainer>

      {
        rides?.map((ride) => (

          <RideCard key={ride._id}>

            <RideRoute>
              {ride.origin.name}
              {" → "}
              {ride.destination.name}
            </RideRoute>

            <InfoSection>

              <InfoItem>
                <span>Date</span>

                <span>
                  {
                    new Date(ride.date)
                      .toLocaleDateString()
                  }
                </span>
              </InfoItem>

              <InfoItem>
                <span>Available Seats</span>

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

              <InfoItem>
                <span>Status</span>

                <span>
                  {ride.status}
                </span>
              </InfoItem>

            </InfoSection>

            <PreferenceContainer>

              <PreferenceTag>
                {
                  ride.preferences.gender
                }
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

              <JoinButton>
                Join Ride
              </JoinButton>

            </BottomSection>

          </RideCard>
        ))
      }

    </GridContainer>
  );
};

export default RideGrid;