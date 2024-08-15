import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Header,
  Footer,
  TechStackList,
  JobCategorySelector,
} from '../Component';
import { IP_ADDRESS, PORT } from '../Secret/env';

const JobSearchPageContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  box-sizing: border-box;
`;

function JobSearch() {
  const [selectedCategory, setSelectedCategory] = useState('frontend');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const url = `http://${IP_ADDRESS}:${PORT}/recruit?type=${selectedCategory}`;

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
        console.log('recruit', modifiedData);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };
    fetchJobs();
  }, [selectedCategory]); // selectedCategory 변화 시 데이터 재조회

  return (
    <>
      <Header page="jobSearch" />
      <JobCategorySelector
        selectedCategory={selectedCategory}
        onChange={(category) => setSelectedCategory(category)}
      />
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
