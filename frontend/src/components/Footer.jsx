import styled from "styled-components";

const FooterContainer = styled.footer`
  background: linear-gradient(90deg, #0f172a, #020617);
  color: white;

  padding: 50px 60px 20px;

  border-top: 1px solid rgba(255,255,255,0.06);

  box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 50px;

  flex-wrap: wrap;
`;

const BrandSection = styled.div`
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 100px;
    margin-bottom: 10px;
  }

  p {
    color: rgba(255,255,255,0.65);
    line-height: 1.6;
    font-size: 14px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 70px;

  flex-wrap: wrap;
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h3 {
    font-size: 16px;
    margin-bottom: 10px;
    color: #38bdf8;
  }

  a {
    text-decoration: none;
    color: rgba(255,255,255,0.7);
    font-size: 14px;
    transition: 0.3s;

    &:hover {
      color: #38bdf8;
      transform: translateX(3px);
    }
  }
`;

const FooterBottom = styled.div`
  margin-top: 40px;
  padding-top: 18px;

  border-top: 1px solid rgba(255,255,255,0.08);

  display: flex;
  justify-content: space-between;
  align-items: center;

  flex-wrap: wrap;
  gap: 10px;

  p {
    color: rgba(255,255,255,0.55);
    font-size: 13px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 14px;

  img {
    width: 18px;
    opacity: 0.7;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>

      <FooterTop>

        <BrandSection>
          <img src="/waymate_full_logo.png" alt="WayMate Logo"/>

          <p>
            Smart carpooling platform connecting riders
            travelling on the same route with comfort,
            safety and affordability.
          </p>
        </BrandSection>

        <FooterLinks>

          <LinkGroup>
            <h3>Platform</h3>

            <a href="/">Home</a>
            <a href="/find">Find Ride</a>
            <a href="/create">Offer Ride</a>
            <a href="/dashboard">Dashboard</a>
          </LinkGroup>

          <LinkGroup>
            <h3>Company</h3>

            <a href="/">About Us</a>
            <a href="/">Contact</a>
            <a href="/">Careers</a>
            <a href="/">Support</a>
          </LinkGroup>

          <LinkGroup>
            <h3>Legal</h3>

            <a href="/">Privacy Policy</a>
            <a href="/">Terms & Conditions</a>
            <a href="/">Community Guidelines</a>
          </LinkGroup>

        </FooterLinks>

      </FooterTop>

      <FooterBottom>

        <p>
          © 2026 waymate. All rights reserved.
        </p>

        <SocialIcons>
          <img src="/waymate_standalone_icon.png" alt="facebook" />
          <img src="/waymate_standalone_icon.png" alt="instagram" />
          <img src="/waymate_standalone_icon.png" alt="twitter" />
        </SocialIcons>

      </FooterBottom>

    </FooterContainer>
  );
};

export default Footer;