import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const Overlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(15, 23, 42, 0.45);

  backdrop-filter: blur(5px);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 3000;

  padding: 20px;
`;

const PopupBox = styled.div`
  width: 100%;
  max-width: 550px;

  background: white;

  border-radius: 28px;

  padding: 32px;

  border: 1px solid rgba(37, 99, 235, 0.08);

  box-shadow:
    0 20px 50px rgba(15, 23, 42, 0.12);

  animation: popup 0.25s ease;

  @keyframes popup {
    from {
      opacity: 0;
      transform: scale(0.96);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const TopBar = styled.div`
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
  width: 40px;
  height: 40px;

  border: none;
  border-radius: 12px;

  background: #f1f5f9;

  color: #64748b;

  font-size: 20px;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    background: #e2e8f0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  gap: 18px;
`;

const Row = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;

  color: #334155;
`;

const Input = styled.input`
  width: 100%;

  padding: 14px 16px;

  border-radius: 16px;

  border: 1px solid #dbe2ea;

  background: #f8fafc;

  font-size: 14px;

  outline: none;

  transition: 0.3s;

  &:focus {
    border-color: #38bdf8;

    background: white;

    box-shadow:
      0 0 0 4px rgba(56, 189, 248, 0.12);
  }
`;

const Select = styled.select`
  width: 100%;

  padding: 14px 16px;

  border-radius: 16px;

  border: 1px solid #dbe2ea;

  background: #f8fafc;

  font-size: 14px;

  outline: none;

  transition: 0.3s;

  &:focus {
    border-color: #38bdf8;

    background: white;

    box-shadow:
      0 0 0 4px rgba(56, 189, 248, 0.12);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  margin-top: 12px;

  label {
    font-size: 14px;
    color: #334155;
  }
`;

const SubmitButton = styled.button`
  margin-top: 10px;

  padding: 15px;

  border: none;
  border-radius: 18px;

  cursor: pointer;

  color: white;

  font-size: 15px;
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

    box-shadow:
      0 14px 28px rgba(37,99,235,0.22);
  }
`;

const CreateRidePopup = ({
  show,
  onClose,
  onCreateRide
}) => {

  const [rideData, setRideData] = useState({
    originName: "",
    destinationName: "",
    date: "",
    totalSeats: "",
    pricePerSeat: "",
    vehicleNumber: "",
    preferences: {
      gender: "Any",
      ac: false
    }
  });

  const handleChange = (e) => {
    setRideData({
      ...rideData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onCreateRide(rideData);
  };

  if (!show) return null;

  return (
    <Overlay>

      <PopupBox>

        <TopBar>

          <Title>
            Create Ride
          </Title>

          <CloseButton onClick={onClose}>
            ×
          </CloseButton>

        </TopBar>

        <Form onSubmit={handleSubmit}>

          <InputGroup>

            <Label>
              Origin
            </Label>

            <Input
              type="text"
              name="originName"
              placeholder="Enter origin"
              value={rideData.originName}
              onChange={handleChange}
              required
            />

          </InputGroup>

          <InputGroup>

            <Label>
              Destination
            </Label>

            <Input
              type="text"
              name="destinationName"
              placeholder="Enter destination"
              value={rideData.destinationName}
              onChange={handleChange}
              required
            />

          </InputGroup>

          <Row>

            <InputGroup>

              <Label>
                Date & Time
              </Label>

              <Input
                type="datetime-local"
                name="date"
                value={rideData.date}
                onChange={handleChange}
                required
              />

            </InputGroup>

            <InputGroup>

              <Label>
                Total Seats
              </Label>

              <Input
                type="number"
                name="totalSeats"
                placeholder="Seats"
                value={rideData.totalSeats}
                onChange={handleChange}
                required
              />

            </InputGroup>

          </Row>

          <Row>

            <InputGroup>

              <Label>
                Price Per Seat
              </Label>

              <Input
                type="number"
                name="pricePerSeat"
                placeholder="₹ Price"
                value={rideData.pricePerSeat}
                onChange={handleChange}
                required
              />

            </InputGroup>

            <InputGroup>

              <Label>
                Vehicle Number
              </Label>

              <Input
                type="text"
                name="vehicleNumber"
                placeholder="KL 01 AB 1234"
                value={rideData.vehicleNumber}
                onChange={handleChange}
                required
              />

            </InputGroup>

          </Row>

          <InputGroup>

            <Label>
              Gender Preference
            </Label>

            <Select
              value={rideData.preferences.gender}
              onChange={(e) =>
                setRideData({
                  ...rideData,
                  preferences: {
                    ...rideData.preferences,
                    gender: e.target.value
                  }
                })
              }
            >
              <option value="Any">
                Any
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

            </Select>

          </InputGroup>

          <CheckboxContainer>

            <input
              type="checkbox"
              checked={rideData.preferences.ac}
              onChange={(e) =>
                setRideData({
                  ...rideData,
                  preferences: {
                    ...rideData.preferences,
                    ac: e.target.checked
                  }
                })
              }
            />

            <label>
              AC Available
            </label>

          </CheckboxContainer>

          <SubmitButton type="submit">
            Create Ride
          </SubmitButton>

        </Form>

      </PopupBox>

    </Overlay>
  );
};

export default CreateRidePopup;