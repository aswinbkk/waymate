import React, { useEffect, useState } from 'react';
import { getData } from '../api/apiSearch';
import styled from "styled-components";

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 50px 20px;
  background:
    linear-gradient(
      135deg,
      #f8fafc,
      #eff6ff,
      #ffffff
    );
`;

const SearchWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 42px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 14px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const SubText = styled.p`
  text-align: center;
  color: #64748b;
  font-size: 15px;
  margin-bottom: 40px;
  line-height: 1.7;
`;

const SearchCard = styled.div`
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(37,99,235,0.08);
  border-radius: 24px;
  padding: 30px;
  backdrop-filter: blur(18px);
  box-shadow: 0 10px 40px rgba(15,23,42,0.06);
  margin-bottom: 40px;
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
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
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: rgba(248,250,252,0.9);
  font-size: 14px;
  outline: none;
  transition: 0.3s;
  &:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 0 4px rgba(56,189,248,0.12);
  }
  &::placeholder {
    color: #94a3b8;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: rgba(248,250,252,0.9);
  font-size: 14px;
  outline: none;
  transition: 0.3s;
  &:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 0 4px rgba(56,189,248,0.12);
  }
`;

const SearchButton = styled.button`
  margin-top: 30px;
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 16px;
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
  transition: 0.35s;
  box-shadow: 0 10px 24px rgba(37,99,235,0.16);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(37,99,235,0.22);
  }
`;

const RideGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const RideCard = styled.div`
  background: white;
  border-radius: 22px;
  padding: 24px;
  border: 1px solid rgba(37,99,235,0.08);
  box-shadow: 0 10px 30px rgba(15,23,42,0.05);
  transition: 0.35s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 34px rgba(15,23,42,0.08);
  }
`;

const Route = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 16px;
`;

const RideInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  p {
    font-size: 14px;
    color: #64748b;
    span {
      color: #0f172a;
      font-weight: 600;
    }
  }
`;

const JoinButton = styled.button`
  width: 100%;
  padding: 13px;
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
  transition: 0.3s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const Search = () => {
  const [rides, setRides] = useState([]);
  const [formData, setFormData] = useState({
    originName: "",
    destinationName: "",
    range: 1,
    status: "open"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await getData(formData);
      console.log(response);

      if (response) {
        setRides(response.data);
      }

    } catch (error) {
      console.log("Error:", error);

    }
  };

  return (
    <PageContainer>
      <SearchWrapper>
        <Heading>Find Your Perfect Ride</Heading>
        <SubText>
          Search rides based on your route,
          preferences and travel distance.
        </SubText>

        <SearchCard>
          <SearchForm onSubmit={handleSubmit}>
            <InputGroup>
              <label>Origin</label>
              <Input type="text" placeholder="Enter pickup location" name="originName"
                value={formData.originName} onChange={handleChange}/>
            </InputGroup>

            <InputGroup>
              <label>Destination</label>
              <Input type="text" placeholder="Enter destination" name="destinationName"
                value={formData.destinationName} onChange={handleChange}/>
            </InputGroup>

            <InputGroup>
              <label>Range (KM)</label>
              <Input type="number" placeholder="Enter range" name="range"
                value={formData.range} onChange={handleChange}/>
            </InputGroup>

            <InputGroup>
              <label>Status</label>
              <Select name="status" value={formData.status} onChange={handleChange}>
                <option value="open">Open</option>
                <option value="full">Full</option>
              </Select>
            </InputGroup>

            <div style={{ gridColumn: "1 / -1" }}>
              <SearchButton type="submit">Search Rides</SearchButton>
            </div>
          </SearchForm>
        </SearchCard>

        <RideGrid>
          {rides.map((ride) => (
            <RideCard key={ride._id}>
              <Route>
                {ride.origin?.name} → {ride.destination?.name}
              </Route>

              <RideInfo>
                <p><span>Status:</span> {ride.status}</p>
                <p><span>Seats:</span> {ride.seatsAvailable}</p>
                <p><span>Price:</span> ₹{ride.price}</p>
              </RideInfo>
              <JoinButton>Join Ride</JoinButton>
            </RideCard>
          ))}
        </RideGrid>
      </SearchWrapper>
    </PageContainer>
  );
};

export default Search;