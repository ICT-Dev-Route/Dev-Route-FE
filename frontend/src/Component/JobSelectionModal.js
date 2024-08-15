import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { IP_ADDRESS, PORT } from '../Secret/env'; // IP 주소와 PORT 설정

const JobSelectionModal = ({ show, onClose, onSelectTech }) => {
  const [jobData, setJobData] = useState({});

  useEffect(() => {
    // 모달이 열릴 때마다 데이터를 가져옵니다.
    if (show) {
      fetchJobData();
    }
  }, [show]);

  const fetchJobData = async () => {
    try {
      const response = await fetch(
        `http://${IP_ADDRESS}:${PORT}/lecture/techstack`
      );
      if (!response.ok) {
        throw new Error('서버 응답에 문제가 있습니다.');
      }
      const data = await response.json();
      setJobData(data); // 받아온 데이터를 상태에 저장
    } catch (error) {
      console.error('데이터를 불러오는 데 실패했습니다:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>직무 선택하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.keys(jobData).map((job, index) => (
          <div key={index}>
            <JobTitle>{job}</JobTitle>
            <TechStackList>
              {jobData[job].map((tech, techIndex) => (
                <TechStackButton
                  key={techIndex}
                  onClick={() => onSelectTech(tech)}
                >
                  {tech}
                </TechStackButton>
              ))}
            </TechStackList>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

const JobTitle = styled.h5`
  margin-top: 20px;
  margin-bottom: 10px;
  color: #343a40;
`;

const TechStackList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const TechStackButton = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #dee2e6;
  }
`;

export default JobSelectionModal;
