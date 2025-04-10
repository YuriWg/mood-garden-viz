import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MoodGarden from './components/MoodGarden';
import { GlobalStyle } from './styles/GlobalStyles';
import { generateMockData } from './data/mockData';
import { colorThemes } from './utils/themes';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 30px 20px;
  background-color: ${props => props.theme.container.mainBg};
  transition: background-color 0.3s ease;
`;

const Title = styled.h1`
  font-family: 'Chelsea Market', cursive;
  font-size: 2.8rem;
  color: ${props => props.theme.text.title};
  margin-bottom: 20px;
  margin-top: 50px;
  text-align: center;
  letter-spacing: 0.02em;
`;

const GardenContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: auto;
  position: relative;
  margin: 0 auto;
  border-radius: 12px;
  overflow: visible;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.08);
`;

function App() {
  const [flowerData, setFlowerData] = useState([]);
  const [currentTheme, setCurrentTheme] = useState('warm');
  const themeColors = colorThemes[currentTheme].colors;
  
  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    // 现在我们使用模拟数据
    const data = generateMockData();
    setFlowerData(data);
  }, []);

  return (
    <>
      <GlobalStyle />
      <AppContainer theme={themeColors}>
        <Title theme={themeColors}>2025 Mood Garden</Title>
        <GardenContainer>
          <MoodGarden 
            flowerData={flowerData} 
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
          />
        </GardenContainer>
      </AppContainer>
    </>
  );
}

export default App;