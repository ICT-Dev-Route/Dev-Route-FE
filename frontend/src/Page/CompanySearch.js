import React, { useState } from 'react';
import {
  Header,
  Footer,
  CompanySearchModal,
  CompanyListContainer,
} from '../Component';
import styled from 'styled-components';

function CompanySearch() {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Kakao',
      logo: 'https://via.placeholder.com/50',
      jobPostings: 3,
      rating: 4.5,
      averageSalary: '4800',
      techStackData: [
        {
          company: 'Kakao',
          jobTitle: 'Frontend Developer',
          tech: 'HTML, CSS, JavaScript, React',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'Backend Developer',
          tech: 'Node.js, Express, MongoDB, Docker',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'Data Analyst',
          tech: 'Python, SQL, Tableau, Hadoop',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'AI Researcher',
          tech: 'Python, TensorFlow, PyTorch, Keras',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'Mobile Developer',
          tech: 'Swift, Kotlin, Firebase, Xcode',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'UI/UX Designer',
          tech: 'VueJS, TypeScript, Nuxt.js, Figma',
          date: '2024/02/16',
        },
      ],
    },
    {
      id: 2,
      name: 'Naver',
      logo: 'https://via.placeholder.com/50',
      jobPostings: 5,
      rating: 3.7,
      averageSalary: '5100',
      techStackData: [
        {
          company: 'Kakao',
          jobTitle: 'Frontend Developer',
          tech: 'HTML, CSS, JavaScript, React',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'Backend Developer',
          tech: 'Node.js, Express, MongoDB, Docker',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'Data Analyst',
          tech: 'Python, SQL, Tableau, Hadoop',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'AI Researcher',
          tech: 'Python, TensorFlow, PyTorch, Keras',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'Mobile Developer',
          tech: 'Swift, Kotlin, Firebase, Xcode',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'UI/UX Designer',
          tech: 'VueJS, TypeScript, Nuxt.js, Figma',
          date: '2024/02/16',
        },
      ],
    },
    {
      id: 3,
      name: 'Coupang',
      logo: 'https://via.placeholder.com/50',
      jobPostings: 2,
      rating: 2.2,
      averageSalary: '3600',
      techStackData: [
        {
          company: 'Kakao',
          jobTitle: 'Frontend Developer',
          tech: 'HTML, CSS, JavaScript, React',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'Backend Developer',
          tech: 'Node.js, Express, MongoDB, Docker',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'Data Analyst',
          tech: 'Python, SQL, Tableau, Hadoop',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'AI Researcher',
          tech: 'Python, TensorFlow, PyTorch, Keras',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'Mobile Developer',
          tech: 'Swift, Kotlin, Firebase, Xcode',
          date: '2024/02/16',
        },
        {
          company: 'Kakao',
          jobTitle: 'UI/UX Designer',
          tech: 'VueJS, TypeScript, Nuxt.js, Figma',
          date: '2024/02/16',
        },
      ],
    },
  ]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header page="companySearch" />
      <CompanyListContainer
        companies={companies}
        onCompanyClick={handleCompanyClick}
      />
      <CompanySearchModal
        show={showModal}
        company={selectedCompany}
        onClose={handleCloseModal}
      />
      <Footer />
    </>
  );
}

export default CompanySearch;
