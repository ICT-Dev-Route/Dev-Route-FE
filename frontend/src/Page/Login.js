import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Footer } from '../Component';
import {
  PORT,
  IP_ADDRESS,
  KAKAO_CLIENT_ID,
  NAVER_CLIENT_ID,
  GOOGLE_CLIENT_ID,
} from '../Secret/env';
import { KAKAO, NAVER, GOOGLE } from '../Assets';

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.loginBackground};
`;

const LoginForm = styled.div`
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.loginLoginFormBoarder};
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  background-color: ${({ theme }) => theme.loginBackground};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.loginTitle};
`;

const IconLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.loginIconLabel};

  i {
    margin-right: 0.5rem;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.loginStyledInputBoarder};
  border-radius: 5px;
`;

const StyledButton = styled.button`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  color: ${({ theme }) => theme.loginStyledButtonText};
  background-color: ${(props) => (props.disabled ? '#ccc' : '#28a745')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#218838')};
  }
`;
const SocialButton = styled(StyledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor || '#28a745'};
  font-weight: 600;
  color: black;
  &:hover {
    background-color: ${(props) => props.hoverColor || '#218838'};
  }
  img {
    height: 20px; // 이미지 높이 조정
    width: auto; // 이미지 너비 자동 조정
    margin-right: 10px; // 아이콘과 텍스트 사이의 간격
  }
`;
const Divider = styled.hr`
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.loginDivider};
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigateSignUp = () => {
    navigate('/signup');
  };

  const generateState = () => {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const url = `https://${IP_ADDRESS}:${PORT}/login`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const token = response.headers.get('Authorization');
        localStorage.setItem('token', token);
        navigate('/mainpage');
      } else {
        alert('일치하는 이메일 혹은 비밀번호가 없습니다.');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const KakaoLogin = () => {
    const redirectUri = `https://${IP_ADDRESS}/auth/kakao/callback`;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  const NaverLogin = () => {
    const state = generateState();
    localStorage.setItem('naverState', state);
    const redirectUri = `https://${IP_ADDRESS}/auth/naver/callback`;
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&state=${state}`;

    window.location.href = naverAuthUrl;
  };

  const GoogleLogin = () => {
    const redirectUri = `https://${IP_ADDRESS}/auth/google/callback`;
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile%20openid&access_type=offline`;

    window.location.href = googleAuthUrl;
  };
  return (
    <>
      <Header />
      <StyledContainer>
        <LoginForm>
          <Title>
            <i className="bi bi-code"></i> DevRoute
          </Title>
          <div className="mb-3">
            <IconLabel htmlFor="formBasicEmail">
              <i className="bi bi-envelope"></i> 이메일
            </IconLabel>
            <StyledInput
              type="email"
              id="formBasicEmail"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <IconLabel htmlFor="formBasicPassword">
              <i className="bi bi-key"></i> 비밀번호
            </IconLabel>
            <StyledInput
              type="password"
              id="formBasicPassword"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <div className="col">
              <SocialButton
                type="button"
                bgColor="#FEE500"
                hoverColor="#F2C62B"
                onClick={KakaoLogin}
              >
                <img src={KAKAO} alt="Kakao" />
                카카오로 로그인
              </SocialButton>
            </div>
            <div className="col">
              <SocialButton
                type="button"
                bgColor="#00C65B"
                hoverColor="#27a138"
                onClick={NaverLogin}
              >
                <img src={NAVER} alt="Naver" /> 네이버로 로그인
              </SocialButton>
            </div>
            <div className="col">
              <SocialButton
                type="button"
                bgColor="#F7F7F7"
                hoverColor="#9C9C9C"
                onClick={GoogleLogin}
              >
                <img src={GOOGLE} alt="Google" />
                구글로 로그인
              </SocialButton>
            </div>
          </div>

          <StyledButton className="btn btn-success" onClick={handleLogin}>
            로그인
          </StyledButton>

          <Divider />

          <StyledButton
            type="button"
            className="btn btn-success"
            onClick={navigateSignUp}
          >
            회원가입
          </StyledButton>
        </LoginForm>
      </StyledContainer>
      <Footer />
    </>
  );
};

export default Login;
