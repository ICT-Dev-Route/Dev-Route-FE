import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Form, Button, Dropdown } from 'react-bootstrap';
import { Header, Footer } from '../Component';
import { PORT, IP_ADDRESS } from '../Secret/env';

const PageContainer = styled.div`
  margin-top: 70px; /* Header와의 간격 확보 */
  margin-bottom: 60px; /* Footer와의 간격 확보 */
  display: flex;
  justify-content: center;
`;

const InquiryContainer = styled(Container)`
  width: 70%; /* InquiryContainer의 너비를 80%로 설정 */
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
`;

const FormTitleSmall = styled.h5`
  margin-bottom: 10px;
  font-weight: normal;
  color: #6c757d; /* 회색 톤의 작은 텍스트 */
`;

const FormTitleBold = styled.h4`
  margin-bottom: 20px;
  font-weight: bold;
  color: #343a40; /* 진한 색상의 큰 텍스트 */
`;

const CustomFormGroup = styled(Form.Group)`
  margin-bottom: 30px;
`;

const CustomDropdown = styled(Dropdown)`
  margin-bottom: 20px;
`;

const CustomTextarea = styled(Form.Control)`
  height: 200px;
  resize: none;
  border: 2px solid #007bff;
  width: 100%; /* 너비를 100%로 설정하여 컨테이너를 꽉 채움 */
  &:focus {
    box-shadow: none;
    border-color: #0056b3;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #28a745;
  border: none;
  &:hover {
    background-color: #218838;
  }
  display: block;
  margin-left: auto; /* 오른쪽 정렬을 위해 margin-left: auto 설정 */
  margin-top: 20px; /* 텍스트 입력 영역과 간격 확보 */
`;

function ErrorInquiry() {
  const [selectedOption, setSelectedOption] = useState('오류관련 문의입니다');
  const [textInput, setTextInput] = useState('');
  const navigate = useNavigate();

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };

  const handleSubmit = async () => {
    const suggestionCategory =
      selectedOption === '오류관련 문의입니다'
        ? 'REPORT_ERROR'
        : 'REPORT_SUGGEST';

    const token = localStorage.getItem('token');

    const requestBody = {
      suggestionCategory,
      content: textInput,
    };

    try {
      const response = await fetch(`http://${IP_ADDRESS}:${PORT}/error-page`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        if (response.status === 400) {
          alert('로그인 후 이용가능합니다!');
          navigate('/login');
        } else {
          throw new Error('페이지 이동 실패');
        }
      }
      alert('저장이 완료되었습니다.');
      setTextInput('');
      navigate('/mainpage');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Header page="errorInquiry" />
      <PageContainer>
        <InquiryContainer>
          <CustomFormGroup controlId="errorInquiryForm">
            <CustomDropdown onSelect={handleSelect}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {selectedOption}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="오류관련 문의입니다">
                  오류관련 문의입니다
                </Dropdown.Item>
                <Dropdown.Item eventKey="제안사항입니다">
                  제안사항입니다
                </Dropdown.Item>
              </Dropdown.Menu>
            </CustomDropdown>

            <FormTitleSmall>* 로그인 후 작성 가능합니다</FormTitleSmall>
            <FormTitleBold>
              문제에 관하여 글을 작성해 주세요 개발자들에게 큰 도움이 됩니다!
            </FormTitleBold>
            <CustomTextarea
              as="textarea"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </CustomFormGroup>
          <SubmitButton onClick={handleSubmit}>저장하기</SubmitButton>
        </InquiryContainer>
      </PageContainer>
      <Footer />
    </>
  );
}

export default ErrorInquiry;
