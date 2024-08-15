import React, { useState } from 'react';
import styled from 'styled-components';
import { Treebeard } from 'react-treebeard';
import { Header, Footer, JobCategorySelector } from '../Component';
import data from '../Data/data';

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

const Title = styled.h2`
  margin-top: 0;
`;

const Content = styled.p`
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
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'middle',
          marginLeft: '-5px',
          height: '24px',
          width: '24px',
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-7px 0 0 -7px',
          height: '14px',
        },
        height: 14,
        width: 14,
        arrow: {
          fill: '#000',
          strokeWidth: 0,
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
  const [cursor, setCursor] = useState(null);
  const [treeData, setTreeData] = useState(data);
  const [selectedNode, setSelectedNode] = useState(null);

  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    setTreeData({ ...treeData });
    setSelectedNode(node);
  };

  return (
    <>
      <Header />
      <JobCategorySelector
        selectedCategory={selectedCategory}
        onChange={(category) => setSelectedCategory(category)}
      />
      <Container>
        <TreeContainer>
          <Treebeard data={treeData} onToggle={onToggle} style={styles} />
        </TreeContainer>
        <InfoContainer>
          {selectedNode ? (
            <>
              <Title>{selectedNode.name}</Title>
              <Content>
                여기에 {selectedNode.name}와 관련된 정보를 표시합니다.
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
