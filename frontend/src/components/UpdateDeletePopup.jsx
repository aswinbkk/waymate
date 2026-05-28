import React, { useState, useEffect } from "react";
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
  max-width: 650px;
  background: white;
  border-radius: 30px;
  padding: 35px;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.18);

  animation: popupShow 0.25s ease;

  @keyframes popupShow {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-bottom: 30px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #2563eb;
  }
`;

const Select = styled.select`
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #2563eb;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  flex: 1;
  min-width: 140px;
  padding: 15px 20px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  color: white;
  font-size: 14px;
  font-weight: 700;

  background: ${({ $variant }) =>
    $variant === "delete"
      ? "#ef4444"
      : $variant === "save"
      ? "#16a34a"
      : "linear-gradient(135deg,#22c55e,#06b6d4,#2563eb)"};

  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const UpdateDeletePopup = ({
  show,
  ride,
  onClose,
  onUpdate,
  onDelete
}) => {
  const [isEditing, setIsEditing] =
    useState(false);

  const [formData, setFormData] =
    useState({
      origin: "",
      destination: "",
      date: "",
      totalSeats: "",
      availableSeats: "",
      vehicleNumber: "",
      pricePerSeat: "",
      gender: "any",
      ac: false
    });

  useEffect(() => {
    if (ride) {
      setFormData({
        origin: ride.origin || "",
        destination:
          ride.destination || "",
        date: ride.date
          ? new Date(ride.date)
              .toISOString()
              .slice(0, 16)
          : "",
        totalSeats:
          ride.totalSeats || "",
        availableSeats:
          ride.availableSeats || "",
        vehicleNumber:
          ride.vehicleNumber || "",
        pricePerSeat:
          ride.pricePerSeat || "",
        gender:
          ride.preferences?.gender ||
          "any",
        ac:
          ride.preferences?.ac || false
      });

      setIsEditing(false);
    }
  }, [ride]);

  if (!show || !ride) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value
    }));
  };

  const handleSave = async () => {
    const updatedRide = {
      ...formData,
      preferences: {
        gender: formData.gender,
        ac: formData.ac
      }
    };

    await onUpdate(
      ride._id || ride.id,
      updatedRide
    );

    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this ride?"
      );

    if (!confirmDelete) return;

    await onDelete(
      ride._id || ride.id
    );

    onClose();
  };

  return (
    <Overlay>
      <PopupContainer>

        <Header>
          <Title>
            {isEditing
              ? "Update Ride"
              : "Manage Ride"}
          </Title>

          <CloseButton onClick={onClose}>
            ×
          </CloseButton>
        </Header>

        <Route>
          {ride.origin} →{" "}
          {ride.destination}
        </Route>

        <FormGrid>

          <InputGroup>
            <Label>Origin</Label>

            <Input
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </InputGroup>

          <InputGroup>
            <Label>Destination</Label>

            <Input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </InputGroup>

          <InputGroup>
            <Label>Date</Label>

            <Input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </InputGroup>

          <InputGroup>
            <Label>Total Seats</Label>

            <Input
              type="number"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </InputGroup>

          <InputGroup>
            <Label>Available Seats</Label>

            <Input
              type="number"
              name="availableSeats"
              value={
                formData.availableSeats
              }
              onChange={handleChange}
              disabled={!isEditing}
            />
          </InputGroup>

          <InputGroup>
            <Label>Vehicle Number</Label>

            <Input
              name="vehicleNumber"
              value={
                formData.vehicleNumber
              }
              onChange={handleChange}
              disabled={!isEditing}
            />
          </InputGroup>

          <InputGroup>
            <Label>Price Per Seat</Label>

            <Input
              type="number"
              name="pricePerSeat"
              value={
                formData.pricePerSeat
              }
              onChange={handleChange}
              disabled={!isEditing}
            />
          </InputGroup>

          <InputGroup>
            <Label>Gender</Label>

            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="any">
                Any
              </option>

              <option value="male">
                Male
              </option>

              <option value="female">
                Female
              </option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Label>AC Ride</Label>

            <Input
              type="checkbox"
              name="ac"
              checked={formData.ac}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </InputGroup>

        </FormGrid>

        <ButtonContainer>

          {!isEditing ? (
            <>
              <ActionButton
                onClick={() =>
                  setIsEditing(true)
                }
              >
                Update Ride
              </ActionButton>

              <ActionButton
                $variant="delete"
                onClick={handleDelete}
              >
                Delete Ride
              </ActionButton>
            </>
          ) : (
            <ActionButton
              $variant="save"
              onClick={handleSave}
            >
              Save Changes
            </ActionButton>
          )}

        </ButtonContainer>

      </PopupContainer>
    </Overlay>
  );
};

export default UpdateDeletePopup;