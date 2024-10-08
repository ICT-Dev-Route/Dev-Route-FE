import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { LOGO_WHITE } from '../Assets';
import { AuthContext } from '../Context';

// Styled components
const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.headerBackground};
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
  background-color: ${({ theme }) => theme.headerBackground};
  display: flex;
  align-items: center;
`;

const NavbarBrand = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.headerLogoText};
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

const StyledNavLink = styled(Link)`
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
  border: 1px solid ${({ theme }) => theme.headerButtonBackground};
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.headerButtonText};
  background-color: ${({ theme }) => theme.headerButtonBackground};
  font-size: 16px;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.headerButtonHoverBackground};
    color: ${({ theme }) => theme.headerButtonText};
  }

  &.outline {
    color: ${({ theme }) => theme.headerButtonBackground};
    background-color: ${({ theme }) => theme.headerButtonBackground2};

    &:hover {
      background-color: ${({ theme }) => theme.headerButtonBackground};
      color: ${({ theme }) => theme.headerButtonText};
    }
  }
`;

const Header = () => {
  const location = useLocation();
  const { token, logout } = useContext(AuthContext);

  return (
    <HeaderContainer>
      <StyledContainer>
        <Navbar className="navbar navbar-expand-lg">
          <NavbarBrand to="/mainpage">
            <img src={LOGO_WHITE} alt="DevRoute Logo" />
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
          {token ? (
            <>
              <StyledButton to="/Favorites" className="outline">
                스크랩 확인하기
              </StyledButton>
              <StyledButton as="button" onClick={logout}>
                로그아웃
              </StyledButton>
            </>
          ) : (
            <>
              <StyledButton to="/login" className="outline">
                로그인
              </StyledButton>
              <StyledButton to="/signup">회원가입</StyledButton>
            </>
          )}
        </NavButtons>
      </StyledContainer>
    </HeaderContainer>
  );
};

export default Header;
