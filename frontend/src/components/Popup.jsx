import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 4000;
  animation: fadeIn 0.3s ease;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    left: 20px;
    right: 20px;
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 360px;
  background: white;
  border-radius: 18px;
  padding: 18px;
  border: 1px solid
    ${({ $type }) =>
    $type === "success"
      ? "#bbf7d0"
      : "#fecaca"};
  box-shadow: 0 10px 30px rgba(15,23,42,0.08);
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

const Icon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  background:
    ${({ $type }) =>
    $type === "success"
      ? "#dcfce7"
      : "#fee2e2"};
  color:
    ${({ $type }) =>
    $type === "success"
      ? "#16a34a"
      : "#dc2626"};
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
`;

const Message = styled.p`
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  color: #94a3b8;
  transition: 0.3s;
  &:hover {
    color: #0f172a;
  }
`;

const Popup = ({ show, type = "success", title, message, onClose }) => {
  if (!show) return null;
  return (
    <Overlay>
      <Card $type={type}>
        <Icon $type={type}> {type === "success" ? "✓" : "✕"} </Icon>
        <Content>
          <Title>{title}</Title>
          <Message>{message} </Message>
        </Content>
        <CloseButton onClick={onClose}> × </CloseButton>
      </Card>
    </Overlay>
  );
};

export default Popup;