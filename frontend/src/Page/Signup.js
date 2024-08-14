import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Footer } from '../Component';
import { IP_ADDRESS, PORT } from '../Secret/env';

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const SignupForm = styled.div`
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
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: #333;
`;

const Subtitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  color: #777;
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

const StyledSelect = styled.select`
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
  background-color: #28a745;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const Divider = styled.hr`
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid #ccc;
`;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [developmentField, setDevelopmentField] = useState('');
  const navigate = useNavigate();

  const SignupAPI = async (e) => {
    e.preventDefault();
    const url = `http://${IP_ADDRESS}:${PORT}/signup`;

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
        console.log(data);
        navigate('/login');
      } else {
        console.error('Signup failed:', response.status);
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

            <StyledButton type="submit">회원가입 완료</StyledButton>
          </form>
        </SignupForm>
      </StyledContainer>
      <Footer />
    </>
  );
};

export default Signup;
