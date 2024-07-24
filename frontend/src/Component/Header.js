// Header.js

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LOGO } from '../Assets';

// Styled components
const HeaderContainer = styled.header`
  background-color: #f8f9fa;
  padding: 1rem 0;
`;

const StyledContainer = styled.div`
  width: 70%;
  margin: 0 auto; /* Center the container */
`;

const Navbar = styled.nav`
  background-color: #f8f9fa;
  display: flex;
  justify-content: center; /* Center the navbar */
  align-items: center;
`;

const NavbarBrand = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-size: 21px;
  font-weight: 600;
  margin-right: auto; /* Align the brand to the left */

  img {
    width: 50px;
    height: 50px;
  }
`;

const CollapseButton = styled.button`
  background-color: transparent;
  border: none;
  margin-left: auto; /* Align the button to the right */
`;

const NavbarNav = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 1.5rem; /* Add gap between nav items */
`;

const NavItem = styled.li`
  list-style: none;
  font-size: 16px;
  font-weight: 600;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  padding: 0.5rem 1rem;
  color: ${({ theme, isActive }) =>
    isActive ? theme.hoverTextColor : theme.textColor};

  &:hover {
    color: ${({ theme }) => theme.hoverTextColor};
  }

  &.active {
    font-weight: bold;
  }
`;

const Header = ({ page }) => {
  return (
    <HeaderContainer>
      <StyledContainer>
        <Navbar className="navbar navbar-expand-lg">
          <NavbarBrand to="/">
            <img src={LOGO} alt="DevRoute Logo" />
            DevRoute
          </NavbarBrand>
          <CollapseButton
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </CollapseButton>
          <div className="collapse navbar-collapse" id="navbarNav">
            <NavbarNav className="navbar-nav">
              <NavItem className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/mainpage"
                  isActive={page === 'mainpage'}
                >
                  홈
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/developerDescription"
                  isActive={page === 'developerDescription'}
                >
                  개발자 설명
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/roadmap"
                  isActive={page === 'roadmap'}
                >
                  개발자별 로드맵
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/companySearch"
                  isActive={page === 'companySearch'}
                >
                  기업 검색
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/jobSearch"
                  isActive={page === 'jobSearch'}
                >
                  직무 검색
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/courseSearch"
                  isActive={page === 'courseSearch'}
                >
                  강의 추천
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/errorInquiry"
                  isActive={page === 'errorInquiry'}
                >
                  문의 사항
                </NavLink>
              </NavItem>
            </NavbarNav>
          </div>
        </Navbar>
      </StyledContainer>
    </HeaderContainer>
  );
};

export default Header;
