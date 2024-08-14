import React, { useEffect, useState } from 'react';
import { Header, Footer } from '../Component';
import { IP_ADDRESS, PORT } from '../Secret/env';

function Favorites() {
  const [techStack, setTechStack] = useState([]);

  useEffect(() => {
    const fetchTechStack = async () => {
      const url = `http://${IP_ADDRESS}:${PORT}/tech_stack/FRONTEND`;
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
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTechStack(data);
        console.log('graph', data);
      } catch (error) {
        console.error('Failed to fetch tech stack:', error);
      }
    };

    const favoritesData = async () => {
      const url = `http://${IP_ADDRESS}:${PORT}/mypage`;
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
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTechStack(data);
        console.log('mypage', data);
      } catch (error) {
        console.error('Failed to fetch tech stack:', error);
      }
    };

    favoritesData();
    fetchTechStack();
  }, []);

  return (
    <>
      <Header page="favorites"></Header>
      <div>This is Favorites</div>
      <Footer></Footer>
    </>
  );
}

export default Favorites;
