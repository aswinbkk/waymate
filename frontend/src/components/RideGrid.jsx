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
  background: white;

  border-radius: 24px;

  padding: 24px;

  border: 1px solid #e2e8f0;

  box-shadow:
    0 10px 30px rgba(15,23,42,0.06);

  transition: 0.3s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const RideRoute = styled.h2`
  font-size: 22px;
  font-weight: 700;

  color: #0f172a;

  margin-bottom: 20px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;

  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;

  padding-bottom: 10px;

  border-bottom: 1px solid #e2e8f0;

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

  flex-wrap: wrap;
`;

const PreferenceTag = styled.div`
  padding: 7px 12px;

  border-radius: 999px;

  background: rgba(37,99,235,0.08);

  color: #2563eb;

  font-size: 12px;
  font-weight: 700;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 24px;
`;

const Price = styled.h3`
  font-size: 28px;
  font-weight: 800;

  color: #0f172a;

  span {
    font-size: 14px;
    color: #64748b;
  }
`;

const ViewButton = styled.button`
  padding: 12px 20px;

  border: none;

  border-radius: 12px;

  cursor: pointer;

  color: white;

  font-weight: 700;

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

const RideGrid = ({
  rides,
  onViewRide
}) => {

  return (

    <GridContainer>

      {
        rides.map((ride) => (

          <RideCard
            key={ride._id || ride.id}
          >

            <RideRoute>
              {ride.origin}
              {" → "}
              {ride.destination}
            </RideRoute>

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

              <InfoItem>
                <span>Status</span>

                <span>
                  {ride.status}
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
        ))
      }

    </GridContainer>
  );
};

export default RideGrid;