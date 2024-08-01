import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PORT, IP_ADDRESS } from '../Secret/env';
import { Header, Footer } from '../Component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MainContainer = styled.div`
  padding: 20px 0;
  background-color: white;
`;

const Banner = styled.div`
  background-color: #f8f9fa;
  padding: 60px 20px;
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  img {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
  }
`;

const SponsorContainer = styled.div`
  text-align: center;
  padding: 20px 0;

  img {
    margin: 0 10px;
    max-height: 50px;
  }
`;

const VisitorStats = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  background-color: #f8f9fa;
`;

const StatItem = styled.div`
  text-align: center;
`;

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(`http://${IP_ADDRESS}:${PORT}/token`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const token = await response.text();
          localStorage.setItem('token', token);
          console.log('Token stored in localStorage:', token);
        } else {
          navigate('/mainpage');
        }
      } catch (error) {
        console.error('Failed to fetch token:', error);
        navigate('/mainpage');
      }
    };

    fetchToken();
  }, [navigate]);

  return (
    <>
      <Header />
      <MainContainer>
        <Banner>
          <h1>개발을 더 쉽게</h1>
          <p>로드맵을 이용해 학습하세요</p>
          <p>초보 개발자들을 위한 가이드 및 학습 플랫폼</p>
          <img src="your-banner-image.png" alt="Banner" />
        </Banner>

        <div className="container text-center">
          <SponsorContainer>
            <h3>Our Sponsor</h3>
            <div>
              <img src="sponsor1.png" alt="Sponsor 1" />
              <img src="sponsor2.png" alt="Sponsor 2" />
              <img src="sponsor3.png" alt="Sponsor 3" />
              <img src="sponsor4.png" alt="Sponsor 4" />
              <img src="sponsor5.png" alt="Sponsor 5" />
            </div>
          </SponsorContainer>

          <div className="row text-center">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">초보자 맞춤</h5>
                  <p className="card-text">초보자 맞춤 개발 로드맵</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">기업별</h5>
                  <p className="card-text">기업별 요구 기술스택 분석</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">개인 맞춤</h5>
                  <p className="card-text">개인 맞춤 개발 강의 영상 추천</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row text-center mt-4">
            <div className="col-md-4">
              <div className="card">
                <img
                  className="card-img-top"
                  src="video1.png"
                  alt="강의 영상 1"
                />
                <div className="card-body">
                  <p className="card-text">
                    한 달만에 합격한 비밀! 독점 노하우
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img
                  className="card-img-top"
                  src="video2.png"
                  alt="강의 영상 2"
                />
                <div className="card-body">
                  <p className="card-text">따라하면 합격하는 자소서의 구조</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img
                  className="card-img-top"
                  src="video3.png"
                  alt="강의 영상 3"
                />
                <div className="card-body">
                  <p className="card-text">앱 개발 온라인 강의 BEST 기획전</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <VisitorStats>
          <StatItem>
            <h4>Daily Visitor</h4>
            <p>100명의 사용자가 방문했습니다</p>
          </StatItem>
          <StatItem>
            <h4>Weekly Visitor</h4>
            <p>400명의 사용자가 방문했습니다</p>
          </StatItem>
          <StatItem>
            <h4>Total Visitor</h4>
            <p>11021명의 사용자가 방문했습니다</p>
          </StatItem>
        </VisitorStats>
      </MainContainer>
      <Footer />
    </>
  );
};

export default MainPage;
