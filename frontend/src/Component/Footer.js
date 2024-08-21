// Footer.js

import React from 'react';
import styled from 'styled-components';

// Styled components
const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.footerBackground};
  padding: 2rem 0; /* Increase padding for a more spacious look */
  border-top: 1px solid ${({ theme }) => theme.footerBoarder}; /* Add a top border for separation */
`;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  color: ${({ theme }) =>
    theme.footerText}; /* Softer text color for a more elegant look */
`;

const FooterLinks = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.footerText};
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.footerHover};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <p>© 2024 ICT Hanium Project - H.K, S.Y, H.M, J.H</p>
        <p>All rights reserved.</p>
        <FooterLinks>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterLinks>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
