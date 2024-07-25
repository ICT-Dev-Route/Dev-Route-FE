import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Footer } from '../Component';
import { PORT, IP_ADDRESS } from '../Secret/env';

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const LoginForm = styled.div`
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
`;

const IconLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;

  i {
    margin-right: 0.5rem;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  color: #fff;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#28a745')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#218838')};
  }
`;

const Divider = styled.hr`
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid #ccc;
`;

const Login = () => {
  const navigate = useNavigate();

  const navigateSignUp = () => {
    navigate('/signup');
  };

  const KakaoLogin = async (e) => {
    e.preventDefault(); // 기본 동작 방지
    const url = `http://${IP_ADDRESS}:${PORT}/auth/kakao`;

    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      const statusRes = response.status;

      if (response.ok) {
        console.log(response);
      } else {
        console.error('KakaoLogin failed:', statusRes);
      }
    } catch (error) {
      console.error('Network or other error:', error);
    }
  };

  return (
    <>
      <Header />
      <StyledContainer>
        <LoginForm>
          <Title>DevRoute</Title>
          <form>
            <div className="mb-3">
              <IconLabel htmlFor="formBasicEmail">
                <i className="bi bi-envelope"></i> 이메일
              </IconLabel>
              <StyledInput
                type="email"
                className="form-control"
                id="formBasicEmail"
                placeholder="이메일"
              />
            </div>

            <div className="mb-3">
              <IconLabel htmlFor="formBasicPassword">
                <i className="bi bi-key"></i> 비밀번호
              </IconLabel>
              <StyledInput
                type="password"
                className="form-control"
                id="formBasicPassword"
                placeholder="비밀번호"
              />
            </div>

            <div className="row mb-3">
              <div className="col">
                <StyledButton className="btn btn-light" onClick={KakaoLogin}>
                  카카오로 로그인
                </StyledButton>
              </div>
              <div className="col">
                <StyledButton className="btn btn-light" disabled>
                  네이버로 로그인
                </StyledButton>
              </div>
              <div className="col">
                <StyledButton className="btn btn-light" disabled>
                  구글로 로그인
                </StyledButton>
              </div>
            </div>

            <StyledButton className="btn btn-success" type="submit">
              로그인
            </StyledButton>

            <Divider />

            <StyledButton className="btn btn-success" onClick={navigateSignUp}>
              회원가입
            </StyledButton>
          </form>
        </LoginForm>
      </StyledContainer>
      <Footer />
    </>
  );
};

export default Login;
