import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Header,
  Footer,
  TechStackList,
  JobCategorySelector,
} from '../Component';
import { IP_ADDRESS, PORT } from '../Secret/env';

const StyledH2 = styled.h2`
  width: 80%;
  text-align: left;
  margin: 15px auto;
  margin-bottom: 0px;
`;

const JobSearchPageContainer = styled.div`
  width: 80%;
  margin: 0px auto;
  padding: 10px;
  box-sizing: border-box;
  align-items: flex-start;
  min-height: 70vh;
  margin-bottom: 50px;
`;

function JobSearch() {
  const [selectedCategory, setSelectedCategory] = useState('frontend');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const url = `https://${IP_ADDRESS}:${PORT}/recruit?type=${selectedCategory}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // 필드 이름을 조정하여 기존 컴포넌트와 호환
        const modifiedData = data.map((job) => ({
          companyName: job.companyName,
          developField: job.developField,
          techStacks: job.techStack, // 'techStack'을 'techStacks'로 매핑
          dueDate: job.dueDate,
        }));
        setJobs(modifiedData);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };
    fetchJobs();
  }, [selectedCategory]); // selectedCategory 변화 시 데이터 재조회

  function getCategoryName(code) {
    const names = {
      frontend: '웹 프론트엔드',
      backend: '웹 백엔드',
      mobile: '모바일',
      ai: '인공지능',
      datascience: '데이터사이언스',
    };
    return names[code] || code;
  }

  return (
    <>
      <Header page="jobSearch" />
      <JobCategorySelector
        selectedCategory={selectedCategory}
        onChange={(category) => setSelectedCategory(category)}
      />
      {jobs.length > 0 && (
        <StyledH2>{getCategoryName(selectedCategory)} 분야 채용공고</StyledH2>
      )}
      <JobSearchPageContainer>
        {jobs.length > 0 ? (
          <TechStackList items={jobs} />
        ) : (
          <h2>해당 직무에 대한 채용 공고가 없습니다.</h2>
        )}
      </JobSearchPageContainer>
      <Footer />
    </>
  );
}

export default JobSearch;
