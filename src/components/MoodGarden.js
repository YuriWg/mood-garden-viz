import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { colorThemes } from '../utils/themes';
import { SizeConfig } from '../utils/sizeConfig';
import FlowerView from './FlowerView';
import Legend from './Legend';
import ThemeSelector from './ThemeSelector';
import ViewToggle from './ViewToggle';

const GardenContainer = styled.div`
  position: relative; // 保持相对定位
  width: 100%;
  max-width: 1000px;
  height: auto;
  min-height: 400px;
  background: ${props => props.theme.container.mainBg};
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  overflow: visible;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
`;

// {{ 修改控件容器样式 }}
const ControlsContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 330px;
  display: flex;
  gap: 5px; // 按钮之间的间距
  z-index: 100; // 确保控件始终在顶层
`;

// {{ 主内容容器添加上边距，为固定定位的控件留出空间 }}
const MainContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  margin-top: 30px; // 为顶部固定的控件留出空间
`;

// {{ 新增：FlowerView 的包装容器，使其占据主要空间 }}
const FlowerViewWrapper = styled.div`
  flex: 1; // {{ 占据大部分可用空间 }}
  min-width: 0; // {{ 对于 flex 子项是必要的，防止内容溢出 }}
  position: relative; // {{ FlowerView 内部可能依赖相对定位 }}
`;


const MoodGarden = ({ flowerData, currentTheme, setCurrentTheme }) => {
  const [isRandomView, setIsRandomView] = useState(true);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedFlower, setSelectedFlower] = useState(null); 

  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  
  // 在这里添加一个日志，检查传入的数据
  useEffect(() => {
    console.log("Received flowerData:", flowerData);
  }, [flowerData]);

  const toggleView = () => {
    setIsRandomView(!isRandomView);
  };
  
  const toggleLegend = () => {
    setIsLegendCollapsed(!isLegendCollapsed);
  };
  
  const themeColors = colorThemes[currentTheme].colors;
  return (
    <GardenContainer theme={themeColors}>
      <ControlsContainer>
        <ThemeSelector 
          currentTheme={currentTheme} 
          onThemeChange={setCurrentTheme} 
        />
        <ViewToggle 
          isRandomView={isRandomView} 
          toggleView={toggleView} 
          currentTheme={currentTheme}
        />
      </ControlsContainer>

      <MainContentContainer>
        <FlowerViewWrapper>
          {flowerData && flowerData.length > 0 ? (
            <FlowerView 
              flowerData={flowerData}
              isRandomView={isRandomView}
              currentTheme={currentTheme}
              dimensions={dimensions}
              setDimensions={setDimensions}
              selectedFlower={selectedFlower}
              setSelectedFlower={setSelectedFlower}
            />
          ) : (
            <div style={{ padding: '50px', textAlign: 'center', color: themeColors.text.primary }}>
              没有可显示的心情数据。
            </div>
          )}
        </FlowerViewWrapper>
        
        <LegendWrapper>
          <Legend 
            flowerData={flowerData} 
            currentTheme={currentTheme}
            isCollapsed={isLegendCollapsed}
            toggleLegend={toggleLegend}
          />
        </LegendWrapper>
      </MainContentContainer>
    </GardenContainer>
  );
};

export default MoodGarden;

// Note: You might need to adjust the import alias if Legend is already aliased.
// e.g., import { default as OriginalLegend } from './Legend'; 
// You might need to adjust the name 'OriginalLegend' based on your actual import.

// {{ 新增：Legend 的包装容器，用于添加间距 }}
const LegendWrapper = styled.div`
  margin-left: 25px; // {{ 添加左外边距，例如 25px，可调整 }}
  // {{ 你可能还需要为 Legend 设置一个基础宽度或 flex-basis }}
  // flex-basis: 280px; // 例如，给图例一个固定的基础宽度
  // flex-shrink: 0; // 防止图例在空间不足时被压缩
`;