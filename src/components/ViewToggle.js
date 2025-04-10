import React from 'react';
import styled from 'styled-components';
import { colorThemes } from '../utils/themes';

const ToggleContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 10px;
  background: ${props => props.theme.container.cardBg};
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 16px;
  margin: 8px 8px 16px 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 28px;
  width: 100px;
  backdrop-filter: blur(20px);
  z-index: 100;
  
  &:hover {
    background: ${props => props.theme.container.hoverBg};
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const ToggleText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme.text.primary};
`;

const ViewToggle = ({ isRandomView, toggleView, currentTheme }) => {
  const themeColors = colorThemes[currentTheme].colors;
  
  return (
    <ToggleContainer 
      theme={themeColors}
      onClick={toggleView}
    >
      <IconContainer>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16v16H4z"></path>
          <circle cx="9" cy="9" r="2"></circle>
          <circle cx="15" cy="15" r="2"></circle>
        </svg>
      </IconContainer>
      <ToggleText theme={themeColors}>
        {isRandomView ? "日历视图" : "随机分布"}
      </ToggleText>
    </ToggleContainer>
  );
};

export default ViewToggle;