import styled from "styled-components";

const FooterContainer = styled.footer`
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 60px 50px 25px;

  @media (max-width: 768px) {
    padding: 45px 24px 20px;
  }
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 60px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const BrandSection = styled.div`
  max-width: 340px;
  img {
    width: 150px;
    margin-bottom: 18px;
  }
  p {
    color: #64748b;
    line-height: 1.7;
    font-size: 14px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 70px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 40px;
  }
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  h3 {
    color: #0f172a;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  a {
    text-decoration: none;
    color: #64748b;
    font-size: 14px;
    transition: 0.3s;
    &:hover {
      color: #0284c7;
      transform: translateX(3px);
    }
  }
`;

const FooterBottom = styled.div`
  margin-top: 45px;
  padding-top: 22px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  p {
    color: #94a3b8;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 14px;
  img {
    width: 34px;
    height: 34px;
    padding: 7px;
    border-radius: 10px;
    background: #f8fafc;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: #e0f2fe;
      transform: translateY(-2px);
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <BrandSection>
          <img src="/waymate_wordmark_logo.png" alt="waymate"/>
          <p>A better way of traveling that makes every journey easier, greener, and more connected.</p>
        </BrandSection>

        <FooterLinks>
          <LinkGroup>
            <h3>Platform</h3>
            <a href="/">Home</a>
            <a href="/find">User Ride</a>
            <a href="/create">Agency Ride</a>
            <a href="/about">About</a>
          </LinkGroup>

          <LinkGroup>
            <h3>Company</h3>
            <a href="/">Careers</a>
            <a href="/">Support</a>
            <a href="/">Contact</a>
          </LinkGroup>

          <LinkGroup>
            <h3>Legal</h3>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms</a>
            <a href="/">Guidelines</a>
          </LinkGroup>
        </FooterLinks>
      </FooterTop>

      <FooterBottom>
        <p>© 2026 waymate. All rights reserved.</p>
        <SocialIcons>
          <img src="/waymate_standalone_icon.png" alt="Facebook"/>
          <img src="/waymate_standalone_icon.png" alt="Instagram"/>
          <img src="/waymate_standalone_icon.png" alt="Twitter"/>
        </SocialIcons>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;