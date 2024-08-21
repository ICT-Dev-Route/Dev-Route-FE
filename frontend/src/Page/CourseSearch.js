import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header, Footer, JobSelectionModal } from '../Component';
import { IP_ADDRESS, PORT } from '../Secret/env';
import { FaRegBookmark } from 'react-icons/fa';

const Container = styled.div`
  margin: 50px auto; /* 위아래 50px의 마진 설정 */
`;

const ScrapButton = styled.button`
  background-color: ${({ theme }) => theme.courseSearchScrapButton};
  color: ${({ theme }) => theme.courseSearchScrapButtonText};
  width: 35px;
  height: 35px;
  border: none;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 1;
`;

function CourseSearch() {
  const [platform, setPlatform] = useState('youtube');
  const [techName, setTechName] = useState('htmlcss');
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCourses(platform, techName);
  }, [platform, techName]);

  const fetchCourses = async (platformName, techName) => {
    try {
      const platformMap = {
        youtube: 'Youtube',
        inflearn: 'Inflearn',
        udemy: 'Udemy',
      };

      const response = await fetch(
        `http://${IP_ADDRESS}:${PORT}/lecture?platform_name=${platformMap[platformName]}&tech_name=${techName}`
      );

      if (!response.ok) {
        throw new Error('서버 응답에 문제가 있습니다.');
      }

      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('강의를 불러오는 데 실패했습니다:', error);
    }
  };

  const openCourse = (url) => {
    window.open(url, '_blank');
  };

  const handleTechInputClick = () => {
    setShowModal(true); // 모달 열기
  };

  const handleModalClose = () => {
    setShowModal(false); // 모달 닫기
  };

  const handleTechSelection = (tech) => {
    setTechName(tech); // 선택한 기술 스택 설정
    setShowModal(false); // 모달 닫기
  };

  const handleScrapClick = async (courseId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('로그인 후 이용가능합니다!');
      return;
    }

    try {
      const response = await fetch(
        `http://${IP_ADDRESS}:${PORT}/bookmark/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            id: courseId,
            type: 'video',
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          alert('로그인 후 이용가능합니다!');
        } else {
          throw new Error('북마크 추가에 실패했습니다.');
        }
      } else {
        alert('성공적으로 북마크에 추가되었습니다.');
      }
    } catch (error) {
      console.error('북마크 요청 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <>
      <Header page="CourseSearch" />
      <Container className="container">
        <div className="search-bar d-flex justify-content-start align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="기술스택 선택하기"
            value={techName}
            style={{ width: '300px' }}
            readOnly // 사용자가 직접 입력할 수 없도록 설정
          />
          <button
            className="btn btn-success"
            onClick={handleTechInputClick} // 클릭 시 모달 열기
          >
            선택
          </button>

          <div className="btn-group ms-3" role="group">
            <input
              type="radio"
              className="btn-check"
              name="platform"
              id="youtube"
              value="youtube"
              checked={platform === 'youtube'}
              onChange={() => setPlatform('youtube')}
            />
            <label className="btn btn-outline-danger" htmlFor="youtube">
              유튜브
            </label>
            <input
              type="radio"
              className="btn-check"
              name="platform"
              id="inflearn"
              value="inflearn"
              checked={platform === 'inflearn'}
              onChange={() => setPlatform('inflearn')}
            />
            <label className="btn btn-outline-success" htmlFor="inflearn">
              인프런
            </label>

            <input
              type="radio"
              className="btn-check"
              name="platform"
              id="udemy"
              value="udemy"
              checked={platform === 'udemy'}
              onChange={() => setPlatform('udemy')}
            />
            <label className="btn btn-outline-primary" htmlFor="udemy">
              유데미
            </label>
          </div>
        </div>

        <div className="row mt-4">
          {courses.map((course, index) => (
            <div
              className="col-md-3 mb-4"
              key={index}
              style={{ position: 'relative' }}
            >
              <ScrapButton onClick={() => handleScrapClick(course.id)}>
                <FaRegBookmark />
              </ScrapButton>
              <div
                className="card"
                style={{ width: '100%', cursor: 'pointer' }}
                onClick={() => openCourse(course.url)} // 카드 클릭 시 URL 새 창에서 열기
              >
                <img
                  src={course.thumnail_url || 'https://via.placeholder.com/150'}
                  className="card-img-top"
                  alt="Thumbnail"
                />
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      {course.views} views · {course.uploaded_time} ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <JobSelectionModal
        show={showModal}
        onClose={handleModalClose}
        onSelectTech={handleTechSelection}
      />

      <Footer />
    </>
  );
}

export default CourseSearch;
