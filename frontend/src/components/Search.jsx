import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(15, 23, 42, 0.45);

  backdrop-filter: blur(5px);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 2000;
`;

const PopupWrapper = styled.div`
  position: relative;

  width: 95%;
  max-width: 850px;
`;

const SearchPopup = styled.div`
  background: white;

  border-radius: 28px;

  padding: 35px;

  box-shadow:
    0 20px 60px rgba(15,23,42,0.18);

  animation: popup 0.3s ease;

  @keyframes popup {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.96);
    }

    to {
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
  }

  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;

  top: 20px;
  right: 20px;

  width: 38px;
  height: 38px;

  border: none;
  border-radius: 12px;

  background: #f1f5f9;

  cursor: pointer;

  font-size: 18px;
  font-weight: 700;

  color: #0f172a;

  transition: 0.3s;

  &:hover {
    background: #e2e8f0;
  }
`;

const PopupTitle = styled.h2`
  font-size: 30px;
  font-weight: 700;

  color: #0f172a;

  margin-bottom: 10px;
`;

const PopupSubtext = styled.p`
  color: #64748b;

  font-size: 14px;

  margin-bottom: 28px;
`;

const SearchForm = styled.form`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 18px;

  @media (max-width: 768px) {
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

  padding: 15px 16px;

  border-radius: 14px;

  border: 1px solid #e2e8f0;

  background: rgba(248,250,252,0.9);

  outline: none;

  font-size: 14px;

  transition: 0.3s;

  &:focus {
    border-color: #38bdf8;

    box-shadow:
      0 0 0 4px rgba(56,189,248,0.12);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const Select = styled.select`
  width: 100%;

  padding: 15px 16px;

  border-radius: 14px;

  border: 1px solid #e2e8f0;

  background: rgba(248,250,252,0.9);

  outline: none;

  font-size: 14px;

  transition: 0.3s;

  &:focus {
    border-color: #38bdf8;

    box-shadow:
      0 0 0 4px rgba(56,189,248,0.12);
  }
`;

const SearchButton = styled.button`
  grid-column: 1 / -1;

  margin-top: 10px;

  padding: 16px;

  border: none;
  border-radius: 16px;

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

  transition: 0.35s;

  box-shadow:
    0 10px 24px rgba(37,99,235,0.16);

  &:hover {
    transform: translateY(-2px);

    box-shadow:
      0 14px 28px rgba(37,99,235,0.22);
  }
`;

const Search = ({ setShowSearch }) => {

  const navigate = useNavigate();

  const [searchData, setSearchData] = useState({
    originName: "",
    destinationName: "",
    range: "",
    status: "open"
  });

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const query = new URLSearchParams({
      originName: searchData.originName,
      destinationName: searchData.destinationName,
      range: searchData.range,
      status: searchData.status
    }).toString();

    setShowSearch(false);

    navigate(`/search-results?${query}`);
  };

  return (
    <Overlay>
      <PopupWrapper>

        <SearchPopup>

          <CloseButton
            onClick={() => setShowSearch(false)}
          >
            ×
          </CloseButton>

          <PopupTitle>
            Search Rides
          </PopupTitle>

          <PopupSubtext>
            Find rides based on your
            destination, route and preferences.
          </PopupSubtext>

          <SearchForm onSubmit={handleSearch}>

            <InputGroup>
              <label>
                Origin Location
              </label>

              <Input
                type="text"
                name="originName"
                placeholder="Enter pickup location"
                value={searchData.originName}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <label>
                Destination Location
              </label>

              <Input
                type="text"
                name="destinationName"
                placeholder="Enter destination"
                value={searchData.destinationName}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <label>
                Search Range (KM)
              </label>

              <Input
                type="number"
                name="range"
                placeholder="Enter range"
                value={searchData.range}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <label>
                Ride Status
              </label>

              <Select
                name="status"
                value={searchData.status}
                onChange={handleChange}
              >
                <option value="open">
                  Open
                </option>

                <option value="completed">
                  Completed
                </option>

              </Select>
            </InputGroup>

            <SearchButton type="submit">
              Search Available Rides
            </SearchButton>

          </SearchForm>

        </SearchPopup>

      </PopupWrapper>

    </Overlay>
  );
};

export default Search;