import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const SliderWrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
  .swiper {
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.1);
  }

  .swiper-pagination {
    bottom: 18px !important;
  }

  .swiper-pagination-bullet {
    background: white;
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    width: 26px;
    border-radius: 20px;
    opacity: 1;
  }

  @media (max-width: 768px) {
    margin-bottom: 35px;
    .swiper {
      border-radius: 24px;
    }
  }
`;

const Slide = styled.div`
  position: relative;
  height: 520px;
  display: flex;
  align-items: center;
  padding: 70px;
  background:
    linear-gradient(
      90deg,
      rgba(2, 6, 23, 0.92) 0%,
      rgba(2, 6, 23, 0.7) 45%,
      rgba(2, 6, 23, 0.25) 100%
    ),
    url(${(props) => props.bg}) center/cover no-repeat;

  @media (max-width: 1024px) {
    height: 460px;
    padding: 50px;
  }

  @media (max-width: 768px) {
    height: 380px;
    padding: 30px 24px;
    align-items: flex-end;
  }

  @media (max-width: 480px) {
    height: 340px;
    padding: 24px 20px;
  }
`;

const OverlayGlow = styled.div`
  position: absolute;
  top: -120px;
  right: -120px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.28);
  filter: blur(110px);

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 650px;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 22px;

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 8px 14px;
    margin-bottom: 16px;
  }
`;

const Title = styled.h1`
  font-size: 64px;
  line-height: 1.05;
  font-weight: 800;
  color: white;
  margin-bottom: 22px;
  max-width: 700px;

  @media (max-width: 1024px) {
    font-size: 52px;
  }

  @media (max-width: 768px) {
    font-size: 34px;
    line-height: 1.15;
    margin-bottom: 14px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const Highlight = styled.span`
  color: #60a5fa;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.82);
  max-width: 560px;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.7;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const slides = [
  {
    id: 1,
    badge: "SMART CARPOOLING",
    title: "Find Your Perfect Ride Partner",
    highlight: "Perfect Ride Partner",
    description:
      "Connect with nearby commuters, reduce travel costs, and enjoy smarter eco-friendly journeys with WayMate carpooling.",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
  },

  {
    id: 2,
    badge: "SAFE & VERIFIED",
    title: "Travel With Trusted Riders",
    highlight: "Trusted Riders",
    description:
      "Join verified ride partners, explore secure ride bookings, and enjoy stress-free travel experiences every day.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
  },

  {
    id: 3,
    badge: "PREMIUM EXPERIENCE",
    title: "Comfortable Agency Travel Experience",
    highlight: "Agency Travel Experience",
    description:
      "Book premium agency rides with professional drivers, spacious seating, and reliable long-distance travel comfort.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop",
  },
];

const HomeSlider = () => {
  return (
    <SliderWrapper>
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Slide bg={slide.image}>
              <OverlayGlow />

              <Content>
                <Badge>{slide.badge}</Badge>

                <Title>
                  {slide.title.replace(
                    slide.highlight,
                    ""
                  )}

                  <Highlight>
                    {slide.highlight}
                  </Highlight>
                </Title>

                <Description>
                  {slide.description}
                </Description>
              </Content>
            </Slide>
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderWrapper>
  );
};

export default HomeSlider;