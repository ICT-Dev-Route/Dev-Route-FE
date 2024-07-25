import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { LOGO } from '../Assets';

// Styled components
const HeaderContainer = styled.header`
  background-color: #f8f9fa;
  padding: 1rem 0;
`;

const StyledContainer = styled.div`
  width: 80%;
  margin: 0 auto; /* Center the container */
  display: flex;
  justify-content: space-between; /* Space between brand and nav */
  align-items: center;
`;

const Navbar = styled.nav`
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
`;

const NavbarBrand = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-size: 21px;
  font-weight: 600;
  margin-right: 3rem;

  img {
    width: 50px;
    height: 50px;
  }
`;

const CollapseButton = styled.button`
  background-color: transparent;
  border: none;
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

// StyledNavLink는 isActive prop을 전달하지 않습니다.
const StyledNavLink = styled(Link).attrs(({ isActive, ...props }) => ({
  ...props,
}))`
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

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledButton = styled(Link)`
  padding: 0.5rem 1rem;
  border: 1px solid #28a745;
  border-radius: 5px;
  text-decoration: none;
  color: #fff;
  background-color: #28a745;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    background-color: #218838;
    color: #fff;
  }

  &.outline {
    background-color: transparent;
    color: #28a745;

    &:hover {
      background-color: #28a745;
      color: #fff;
    }
  }
`;

const Header = ({ page }) => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <StyledContainer>
        <Navbar className="navbar navbar-expand-lg">
          <NavbarBrand to="/mainpage">
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
                <StyledNavLink
                  className="nav-link"
                  to="/mainpage"
                  isActive={location.pathname === '/mainpage'}
                >
                  홈
                </StyledNavLink>
              </NavItem>
              <NavItem className="nav-item">
                <StyledNavLink
                  className="nav-link"
                  to="/developerDescription"
                  isActive={location.pathname === '/developerDescription'}
                >
                  개발자 설명
                </StyledNavLink>
              </NavItem>
              <NavItem className="nav-item">
                <StyledNavLink
                  className="nav-link"
                  to="/roadmap"
                  isActive={location.pathname === '/roadmap'}
                >
                  개발자별 로드맵
                </StyledNavLink>
              </NavItem>
              <NavItem className="nav-item">
                <StyledNavLink
                  className="nav-link"
                  to="/companySearch"
                  isActive={location.pathname === '/companySearch'}
                >
                  기업 검색
                </StyledNavLink>
              </NavItem>
              <NavItem className="nav-item">
                <StyledNavLink
                  className="nav-link"
                  to="/jobSearch"
                  isActive={location.pathname === '/jobSearch'}
                >
                  직무 검색
                </StyledNavLink>
              </NavItem>
              <NavItem className="nav-item">
                <StyledNavLink
                  className="nav-link"
                  to="/courseSearch"
                  isActive={location.pathname === '/courseSearch'}
                >
                  강의 추천
                </StyledNavLink>
              </NavItem>
              <NavItem className="nav-item">
                <StyledNavLink
                  className="nav-link"
                  to="/errorInquiry"
                  isActive={location.pathname === '/errorInquiry'}
                >
                  문의 사항
                </StyledNavLink>
              </NavItem>
            </NavbarNav>
          </div>
        </Navbar>
        <NavButtons>
          <StyledButton to="/login" className="outline">
            로그인
          </StyledButton>
          <StyledButton to="/signup">회원가입</StyledButton>
        </NavButtons>
      </StyledContainer>
    </HeaderContainer>
  );
};

export default Header;
