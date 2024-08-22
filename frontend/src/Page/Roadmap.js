import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Treebeard } from 'react-treebeard';
import { Header, Footer, RoadmapCategorySelector } from '../Component';
import { PORT, IP_ADDRESS } from '../Secret/env';

const StyledH2 = styled.h2`
  width: 80%;
  margin: 0 auto 20px;
  text-align: left;

  margin: 30px auto;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px auto;
  width: 80%;
  min-height: 70vh;
`;

const TreeContainer = styled.div`
  width: 300px;
  background-color: ${({ theme }) => theme.roadmapBackground};
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const InfoContainer = styled.div`
  width: 70%;
  background-color: ${({ theme }) => theme.roadmapBackground};
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: ${({ theme }) => theme.roadmapInfoText};
  position: relative; /* 우측 상단 버튼 위치를 위해 position 추가 */
`;

const Title = styled.h3`
  margin-top: 0;
`;

const Content = styled.div`
  margin: 0;
`;

const styles = {
  tree: {
    base: {
      listStyle: 'none',
      backgroundColor: '#fff',
      margin: 0,
      padding: 0,
      color: '#000',
      fontFamily: 'Lato, sans-serif',
      fontSize: '14px',
    },
    node: {
      base: {
        position: 'relative',
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 5px',
        display: 'block',
      },
      activeLink: {
        background: '#f0f0f0',
      },
      toggle: {
        base: {
          display: 'none',
        },
        wrapper: {
          display: 'none',
        },
        arrow: {
          display: 'none',
        },
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'middle',
          color: '#000',
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px',
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle',
        },
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px',
      },
      loading: {
        color: '#E2C089',
      },
    },
  },
};

const RedButton = styled.button`
  background-color: ${({ theme }) => theme.roadmaScrapBtnBackground};
  color: ${({ theme }) => theme.roadmaScrapBtnText};
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Roadmap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialRoadmapId = location.state?.roadmapId;
  const initialDevelopmentField = location.state?.developmentField;

  const [selectedCategory, setSelectedCategory] = useState(
    initialDevelopmentField || 'frontend'
  );
  const [treeData, setTreeData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeDetail, setNodeDetail] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://${IP_ADDRESS}:${PORT}/roadmap/${selectedCategory}`
        );
        if (!response.ok) {
          throw new Error('서버 응답에 문제가 있습니다.');
        }
        const jsonData = await response.json();

        if (jsonData.RoadmapDTOs && jsonData.RoadmapDTOs.length > 0) {
          const initialData = jsonData.RoadmapDTOs.map((item) => ({
            name: item.name,
            id: item.id,
            children: [],
          }));
          setTreeData(initialData);

          // ID에 해당하는 로드맵을 선택
          const initialSelectedNode = initialData.find(
            (node) => node.id === initialRoadmapId
          );
          if (initialSelectedNode) {
            setSelectedNode(initialSelectedNode);
            fetchNodeDetail(initialSelectedNode.name);
          }
        } else {
          console.error('RoadmapDTOs가 응답에 없습니다.');
        }
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다:', error);
      }
    }

    fetchData();
  }, [selectedCategory, initialRoadmapId]);

  const fetchNodeDetail = async (nodeName) => {
    try {
      const response = await fetch(
        `http://${IP_ADDRESS}:${PORT}/roadmap/${selectedCategory}/${nodeName}`
      );
      if (!response.ok) {
        throw new Error('서버 응답에 문제가 있습니다.');
      }
      const detailData = await response.json();
      setNodeDetail(detailData);
    } catch (error) {
      console.error('노드 정보를 불러오는 데 실패했습니다:', error);
    }
  };

  const onToggle = (node, toggled) => {
    if (node) {
      node.toggled = toggled;
      setTreeData((prevData) =>
        prevData.map((td) => (td.id === node.id ? { ...td, toggled } : td))
      );
      setSelectedNode(node);
      fetchNodeDetail(node.name);
    }
  };

  const handleScrapButtonClick = async () => {
    const token = localStorage.getItem('token');
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
            id: selectedNode.id,
            type: 'roadmap',
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          alert('로그인 후 이용가능합니다!');
          navigate('/login');
        } else {
          throw new Error('스크랩에 실패했습니다.');
        }
      } else {
        alert('성공적으로 스크랩되었습니다.');
      }
    } catch (error) {
      console.error('북마크 요청 중 오류가 발생했습니다:', error);
    }
  };

  const getCategoryName = (code) => {
    const names = {
      FRONTEND: '웹 프론트엔드',
      BACKEND: '웹 백엔드',
      MOBILE_ANDROID: '모바일 안드로이드',
      MOBILE_IOS: '모바일 IOS',
      AIANDDATA: 'AI & DATA',
    };
    return names[code] || '';
  };

  return (
    <>
      <Header />
      <RoadmapCategorySelector
        selectedCategory={selectedCategory}
        onChange={(category) => setSelectedCategory(category)}
      />
      <StyledH2>{getCategoryName(selectedCategory)}</StyledH2>
      <Container>
        <TreeContainer>
          {treeData.length > 0 && (
            <Treebeard
              data={treeData}
              onToggle={onToggle}
              style={styles}
              animations={false}
            />
          )}
        </TreeContainer>
        <InfoContainer>
          {selectedNode && nodeDetail ? (
            <>
              <RedButton onClick={handleScrapButtonClick}>스크랩</RedButton>
              <Title>
                {selectedNode.name} - {nodeDetail.brief_info}
              </Title>
              <Content>
                <div>{nodeDetail.description}</div>
                <div>
                  <strong>관련 기술스택:</strong>{' '}
                  {nodeDetail.related_tecks.join(', ')}
                </div>
              </Content>
            </>
          ) : (
            <Title>정보를 보려면 항목을 선택하세요</Title>
          )}
        </InfoContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Roadmap;
