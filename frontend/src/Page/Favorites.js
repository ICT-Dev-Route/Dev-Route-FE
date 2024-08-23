import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../Component';
import { IP_ADDRESS, PORT } from '../Secret/env';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const SectionTitle = styled.h3`
  margin-bottom: 20px;
  font-weight: bold;
`;

const TechStackButtonContainer = styled.div`
  display: inline-block;
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const TechStackButton = styled(Button)`
  background-color: ${({ theme }) => theme.favoritesTechStackBtnBackground};
  color: ${({ theme }) => theme.favoritesTechStackBtnText};
  border: 1px solid ${({ theme }) => theme.favoritesTechStackBtnBoarder};
  border-radius: 20px;
  padding-right: 30px;
  &:hover {
    background-color: ${({ theme }) =>
      theme.favoritesTechStackBtnBackgroundHover};
  }
`;

const CompanyCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.favoritesCompanyCardBackground};
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CourseCard = styled(Card)`
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  position: relative;
  &:hover {
    transform: scale(1.05);
  }
`;

const TopRightButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${({ theme }) => theme.favoritesDeleteBtnBackground};
  color: ${({ theme }) => theme.favoritesDeleteBtnText};
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const SmallTopRightButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.favoritesDeleteBtnBackground};
  color: ${({ theme }) => theme.favoritesDeleteBtnText};
  border: none;
  padding: 2px 5px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
`;

function Favorites() {
  const [techStacks, setTechStacks] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      const url = `https://${IP_ADDRESS}:${PORT}/mypage`;
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 400) {
            alert('로그인 후 이용가능합니다!');
            navigate('/login');
          } else {
            throw new Error('페이지 이동 실패');
          }
        }
        const data = await response.json();
        setTechStacks(data.roadmaps || []);
        setCompanies(data.companies || []);
        setVideos(data.videos || []);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleRoadmapClick = (roadmapId, developmentField) => {
    navigate(`/roadmap`, { state: { roadmapId, developmentField } });
  };

  const handleCompanyClick = (company) => {
    navigate('/companySearch', { state: { companyId: company.id } });
  };

  const handleRemoveItem = async (id, type) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://${IP_ADDRESS}:${PORT}/bookmark`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          id: id,
          type: type,
        }),
      });

      if (response.ok) {
        alert('삭제되었습니다.');
        if (type === 'roadmap') {
          setTechStacks((prev) => prev.filter((item) => item.id !== id));
        } else if (type === 'company') {
          setCompanies((prev) => prev.filter((item) => item.id !== id));
        } else if (type === 'video') {
          setVideos((prev) => prev.filter((item) => item.id !== id));
        }
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleCourseClick = (url) => {
    window.open(url, '_blank'); // URL을 새 창에서 엽니다.
  };

  return (
    <>
      <Header page="favorites" />
      <Container className="mt-5">
        {/* Saved Tech Stacks Section */}
        <SectionTitle>내가 스크랩한 기술 스택들</SectionTitle>
        <div>
          {techStacks.map((tech, index) => (
            <TechStackButtonContainer key={index}>
              <TechStackButton
                onClick={() =>
                  handleRoadmapClick(tech.id, tech.developmentField)
                }
              >
                {tech.developmentField} - {tech.name}
              </TechStackButton>
              <SmallTopRightButton
                onClick={() => handleRemoveItem(tech.id, 'roadmap')}
              >
                X
              </SmallTopRightButton>
            </TechStackButtonContainer>
          ))}
          <TechStackButton onClick={() => navigate('/roadmap')}>
            + 추가하기
          </TechStackButton>
        </div>

        {/* Saved Companies Section */}
        <SectionTitle className="mt-5">내가 스크랩한 회사</SectionTitle>
        <Row>
          {companies.map((company, index) => (
            <Col md={3} key={index} className="mb-4">
              <CompanyCard onClick={() => handleCompanyClick(company)}>
                <TopRightButton
                  onClick={() => handleRemoveItem(company.id, 'company')}
                >
                  X
                </TopRightButton>
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  style={{ width: '50px', height: '50px' }}
                />
                <p>{company.name}</p>
              </CompanyCard>
            </Col>
          ))}
          <Col md={3} className="mb-4">
            <CompanyCard onClick={() => navigate('/companySearch')}>
              <p>+ 추가하기</p>
            </CompanyCard>
          </Col>
        </Row>

        {/* Saved Courses Section */}
        <SectionTitle className="mt-5">내가 스크랩한 강의</SectionTitle>
        <Row>
          {videos.map((video, index) => (
            <Col md={4} key={index} className="mb-4">
              <CourseCard onClick={() => handleCourseClick(video.url)}>
                <TopRightButton
                  onClick={(e) => {
                    e.stopPropagation(); // 카드 클릭 이벤트와 구분하여 동작
                    handleRemoveItem(video.id, 'video');
                  }}
                >
                  X
                </TopRightButton>
                <Card.Img variant="top" src={video.thumnail_url} />
                <Card.Body>
                  <Card.Title>{video.title}</Card.Title>
                  <Card.Text>
                    <small className="text-muted">
                      {video.price ? `${video.price}원` : '무료'}
                    </small>
                  </Card.Text>
                </Card.Body>
              </CourseCard>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Favorites;
