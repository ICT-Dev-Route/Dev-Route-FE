import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Footer } from '../Component';
import { validateEmail, removeWhitespace } from '../utils';
import { IP_ADDRESS, PORT } from '../Secret/env';

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.signupBackground};
`;

const SignupForm = styled.div`
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.signupFormBoarder};
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  background-color: ${({ theme }) => theme.signupBackground};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.signupTitle};
`;

const Subtitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.signupSubtitle};
`;

const IconLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.signupIconLabel};

  i {
    margin-right: 0.5rem;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.signupStyledInputBoarder};
  border-radius: 5px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.signupStyledSelectBoarder};
  border-radius: 5px;
`;

const StyledError = styled.p`
  color: red;
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const StyledButton = styled.button`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  color: ${({ theme, disabled }) =>
    disabled
      ? '#ccc'
      : theme.signupStyledButtonText}; // 조건에 따라 텍스트 색상 변경
  background-color: ${({ theme, disabled }) =>
    disabled
      ? '#e0e0e0'
      : theme.signupStyledButtonBackground}; // 조건에 따라 배경색 변경
  cursor: ${({ disabled }) =>
    disabled ? 'not-allowed' : 'pointer'}; // 조건에 따라 커서 스타일 변경
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme, disabled }) =>
      disabled
        ? '#e0e0e0'
        : theme.signupStyledButtonBackgroundHover}; // 조건에 따라 호버 배경색 변경
  }
`;
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [developmentField, setDevelopmentField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setDisabled(
      !(email && name && password && confirmPassword && developmentField)
    );
  }, [email, name, password, confirmPassword, developmentField]);

  useEffect(() => {
    let error = '';
    if (!email) {
      error = '이메일을 입력해주세요';
    } else if (!validateEmail(email)) {
      error = '유효한 이메일이 아닙니다';
    } else if (password.length < 6) {
      error = '비밀번호는 6자리 이상이여야 합니다';
    } else if (password !== confirmPassword) {
      error = '비밀번호가 일치하지 않습니다';
    } else if (!name) {
      error = '이름을 입력해주세요';
    } else if (!developmentField) {
      error = '분야를 선택해주세요';
    } else {
      error = '';
    }
    setErrorMessage(error);
  }, [email, name, password, confirmPassword, developmentField]);

  const SignupAPI = async (e) => {
    e.preventDefault();
    const url = `https://${IP_ADDRESS}:${PORT}/signup`;

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
          development_field: developmentField,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/login');
      } else {
        alert('중복되는 이메일입니다 다른 이메일을 입력해주세요');
      }
    } catch (error) {
      console.error('Network or other error:', error);
    }
  };

  return (
    <>
      <Header />
      <StyledContainer>
        <SignupForm>
          <Title>
            <i className="bi bi-code"></i> DevRoute
          </Title>
          <Subtitle>회원정보를 입력해주세요</Subtitle>
          <form onSubmit={SignupAPI}>
            <div className="mb-3">
              <IconLabel htmlFor="email">
                <i className="bi bi-envelope"></i> 이메일
              </IconLabel>
              <StyledInput
                type="email"
                id="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <IconLabel htmlFor="password">
                <i className="bi bi-key"></i> 비밀번호
              </IconLabel>
              <StyledInput
                type="password"
                id="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <IconLabel htmlFor="confirmPassword">
                <i className="bi bi-check"></i> 비밀번호 확인
              </IconLabel>
              <StyledInput
                type="password"
                id="confirmPassword"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <IconLabel htmlFor="name">
                <i className="bi bi-person"></i> 이름
              </IconLabel>
              <StyledInput
                type="text"
                id="name"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <IconLabel htmlFor="job">
                <i className="bi bi-briefcase"></i> 관심 직무
              </IconLabel>
              <StyledSelect
                id="job"
                value={developmentField}
                onChange={(e) => setDevelopmentField(e.target.value)}
              >
                <option value="">선택하세요</option>
                <option value="FRONTEND">웹 프론트엔드 개발자</option>
                <option value="BACKEND">웹 백엔드 개발자</option>
                <option value="MOBILE">모바일 개발자</option>
                <option value="AI">인공지능 개발자</option>
                <option value="DATA_SCIENCE">데이터 분석가</option>
                <option value="NONE">선택 안함</option>
              </StyledSelect>
            </div>

            <StyledError>{errorMessage}</StyledError>

            <StyledButton type="submit" disabled={disabled}>
              회원가입 완료
            </StyledButton>
          </form>
        </SignupForm>
      </StyledContainer>
      <Footer />
    </>
  );
};

export default Signup;
