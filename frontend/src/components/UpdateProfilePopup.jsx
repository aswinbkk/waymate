import React, { useState } from "react";

import styled from "styled-components";

import {
  updateProfile
} from "../api/apiUser";

import {
  updateAgencyProfile
} from "../api/apiAgency";

import { toast } from "react-toastify";

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
  max-width: 550px;

  background: white;

  border-radius: 24px;

  padding: 30px;

  box-shadow:
    0 20px 50px rgba(15,23,42,0.15);

  max-height: 90vh;

  overflow-y: auto;
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
`;

const UpdateProfilePopup = ({
  userData,
  setUserData,
  closePopup,
  role
}) => {
  const [editData, setEditData] = useState(userData);
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
      let response;
      // USER UPDATE
      if (role === "user") {
        response =await updateProfile({
            fullName: {
              firstName: editData.firstName,
              lastName: editData.lastName
            },
            email: editData.email,
            phone: editData.phone
          });
      }

      // AGENCY UPDATE
      else {
        response = await updateAgencyProfile({
            agencyName: editData.agencyName,
            email: editData.email,
            phone: editData.phone,
            address: {
              street: editData.street,
              city: editData.city,
              state: editData.state,
              pincode: editData.pincode
            },
            gst: {
              gstin: editData.gstin,
              legalName: editData.legalName,
              tradeName: editData.tradeName
            }
          });
      }

      if (response?.success) {
        setUserData(editData);

        toast.success(
          "Profile updated successfully"
        );

        closePopup();

      } else {

        toast.error(
          Array.isArray(response?.msg)
            ? response.msg[0]
            : response?.msg ||
              "Update failed"
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Something went wrong"
      );
    }
  };

  return (
    <Overlay>

      <Popup>

        <PopupTitle>
          Edit Profile
        </PopupTitle>

        <Form
          onSubmit={handleUpdateProfile}
        >

          {
            role === "user" ? (
              <>
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
              </>
            ) : (
              <>
                <InputGroup>

                  <label>
                    Agency Name
                  </label>

                  <Input
                    type="text"
                    name="agencyName"
                    value={editData.agencyName}
                    onChange={handleChange}
                    required
                  />

                </InputGroup>

                <InputGroup>

                  <label>
                    Street
                  </label>

                  <Input
                    type="text"
                    name="street"
                    value={editData.street}
                    onChange={handleChange}
                    required
                  />

                </InputGroup>

                <InputGroup>

                  <label>
                    City
                  </label>

                  <Input
                    type="text"
                    name="city"
                    value={editData.city}
                    onChange={handleChange}
                    required
                  />

                </InputGroup>

                <InputGroup>

                  <label>
                    State
                  </label>

                  <Input
                    type="text"
                    name="state"
                    value={editData.state}
                    onChange={handleChange}
                    required
                  />

                </InputGroup>

                <InputGroup>

                  <label>
                    Pincode
                  </label>

                  <Input
                    type="text"
                    name="pincode"
                    value={editData.pincode}
                    onChange={handleChange}
                    required
                  />

                </InputGroup>

                <InputGroup>

                  <label>
                    GSTIN
                  </label>

                  <Input
                    type="text"
                    name="gstin"
                    value={editData.gstin}
                    onChange={handleChange}
                    required
                  />

                </InputGroup>
              </>
            )
          }

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
              onClick={closePopup}
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
  );
};

export default UpdateProfilePopup;