import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Header,
  Footer,
  TechStackList,
  JobCategorySelector,
} from '../Component';

const JobSearchPageContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  box-sizing: border-box;
`;

function JobSearch() {
  const [selectedCategory, setSelectedCategory] =
    useState('Frontend Developer');
  const [jobs, setJobs] = useState([
    {
      category: 'Frontend Developer',
      positions: [
        {
          company: 'Kakao',
          jobTitle: 'Frontend Developer',
          tech: 'HTML, CSS, JavaScript, React',
          date: '2024/02/16',
        },
        {
          company: 'Naver',
          jobTitle: 'Frontend Developer',
          tech: 'VueJS, TypeScript, Vuex',
          date: '2024/02/17',
        },
        {
          company: 'Samsung',
          jobTitle: 'Frontend Developer',
          tech: 'Angular, NgRx, RxJS',
          date: '2024/02/18',
        },
      ],
    },
    {
      category: 'Backend Developer',
      positions: [
        {
          company: 'Kakao',
          jobTitle: 'Backend Developer',
          tech: 'Node.js, Express, MongoDB, Docker',
          date: '2024/02/19',
        },
        {
          company: 'Naver',
          jobTitle: 'Backend Developer',
          tech: 'Python, Django, PostgreSQL, AWS',
          date: '2024/02/20',
        },
        {
          company: 'Samsung',
          jobTitle: 'Backend Developer',
          tech: 'Java, Spring Boot, MySQL, Kubernetes',
          date: '2024/02/21',
        },
      ],
    },
    {
      category: 'Mobile Developer',
      positions: [
        {
          company: 'Kakao',
          jobTitle: 'Mobile Developer',
          tech: 'Swift, iOS, Firebase',
          date: '2024/02/22',
        },
        {
          company: 'Naver',
          jobTitle: 'Mobile Developer',
          tech: 'Kotlin, Android, Realm',
          date: '2024/02/23',
        },
        {
          company: 'Samsung',
          jobTitle: 'Mobile Developer',
          tech: 'React Native, TypeScript, Expo',
          date: '2024/02/24',
        },
      ],
    },
    {
      category: 'AI Developer',
      positions: [
        {
          company: 'Kakao',
          jobTitle: 'AI Developer',
          tech: 'Python, TensorFlow, Keras, NLP',
          date: '2024/02/25',
        },
        {
          company: 'Naver',
          jobTitle: 'AI Developer',
          tech: 'Python, PyTorch, Computer Vision',
          date: '2024/02/26',
        },
        {
          company: 'Samsung',
          jobTitle: 'AI Developer',
          tech: 'R, TensorFlow, Deep Learning',
          date: '2024/02/27',
        },
      ],
    },
    {
      category: 'Data Analyst',
      positions: [
        {
          company: 'Kakao',
          jobTitle: 'Data Analyst',
          tech: 'SQL, Tableau, Excel, Python',
          date: '2024/02/28',
        },
        {
          company: 'Naver',
          jobTitle: 'Data Analyst',
          tech: 'R, Shiny, ggplot2',
          date: '2024/02/29',
        },
        {
          company: 'Samsung',
          jobTitle: 'Data Analyst',
          tech: 'Python, Pandas, Power BI',
          date: '2024/03/01',
        },
      ],
    },
  ]);

  console.log('Jobs data:', jobs);

  return (
    <>
      <Header page="jobSearch" />
      <JobCategorySelector
        selectedCategory={selectedCategory}
        onChange={(category) => setSelectedCategory(category)}
      />
      <JobSearchPageContainer>
        {jobs
          .filter((jobCategory) => jobCategory.category === selectedCategory)
          .map((jobCategory, index) => (
            <div key={index}>
              <h2>{jobCategory.category}</h2>
              <TechStackList items={jobCategory.positions} />
            </div>
          ))}
      </JobSearchPageContainer>
      <Footer />
    </>
  );
}

export default JobSearch;
