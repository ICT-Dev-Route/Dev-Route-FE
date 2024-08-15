import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Treebeard } from 'react-treebeard';
import { Header, Footer, RoadmapCategorySelector } from '../Component';
import { PORT, IP_ADDRESS } from '../Secret/env';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px auto;
  width: 80%;
`;

const TreeContainer = styled.div`
  width: 300px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const InfoContainer = styled.div`
  width: 70%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #000;
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
          display: 'none', // Hide the toggle base
        },
        wrapper: {
          display: 'none', // Hide the toggle wrapper
        },
        arrow: {
          display: 'none', // Hide the toggle arrow
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

const Roadmap = () => {
  const [selectedCategory, setSelectedCategory] = useState('frontend');
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
          setSelectedNode(initialData[0]);
          fetchNodeDetail(initialData[0].name);
        } else {
          console.error('RoadmapDTOs가 응답에 없습니다.');
        }
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다:', error);
      }
    }

    fetchData();
  }, [selectedCategory]);

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

  return (
    <>
      <Header />
      <RoadmapCategorySelector
        selectedCategory={selectedCategory}
        onChange={(category) => setSelectedCategory(category)}
      />
      <Container>
        <TreeContainer>
          {treeData.length > 0 && (
            <Treebeard
              data={treeData}
              onToggle={onToggle}
              style={styles}
              animations={false} // Disable animations to prevent VelocityComponent errors
            />
          )}
        </TreeContainer>
        <InfoContainer>
          {selectedNode && nodeDetail ? (
            <>
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
