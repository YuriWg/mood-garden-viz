import React, { useState } from 'react';
import styled from 'styled-components';
import { colorThemes } from '../utils/themes';

const SelectorContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  height: 28px;
  width: 110px;
  margin-bottom: 0px;
  border-radius: 8px;
  z-index: 100;

`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 10px;
  background: ${props => props.isOpen ? props.theme.container.hoverBg : props.theme.container.cardBg};
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 16px;
  margin: 8px 8px 8px 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
  height: 28px;
  
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
`;

const ThemeText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme.text.primary};
`;

const ArrowIcon = styled.span`
  transition: transform 0.3s;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
`;

const DropdownContent = styled.div`
  max-height: ${props => props.isOpen ? '200px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-out;
`;

const ThemeOption = styled.div`
  padding: 5px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid ${props => props.theme.text.border};
  
  &:hover {
    background: ${props => props.theme.container.hoverBg};
  }
`;

const ColorPreview = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
  border: 1px solid ${props => props.theme.text.secondary};
`;

const ThemeName = styled.span`
  font-size: 12px;
  color: ${props => props.theme.text.primary};
`;

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const themeColors = colorThemes[currentTheme].colors;
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleThemeSelect = (theme) => {
    onThemeChange(theme);
    setIsOpen(false);
  };
  
  return (
    <SelectorContainer>
      <DropdownHeader 
        theme={themeColors} 
        isOpen={isOpen}
        onClick={toggleDropdown}
      >
        <IconContainer>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"></circle>
            <path d="M12 1v2"></path>
            <path d="M12 21v2"></path>
            <path d="M4.22 4.22l1.42 1.42"></path>
            <path d="M18.36 18.36l1.42 1.42"></path>
            <path d="M1 12h2"></path>
            <path d="M21 12h2"></path>
            <path d="M4.22 19.78l1.42-1.42"></path>
            <path d="M18.36 5.64l1.42-1.42"></path>
          </svg>
        </IconContainer>
        <ThemeText theme={themeColors}>
          {colorThemes[currentTheme].name}
        </ThemeText>
        <ArrowIcon isOpen={isOpen}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </ArrowIcon>
      </DropdownHeader>
      
      <DropdownContent isOpen={isOpen}>
        {Object.entries(colorThemes).map(([key, theme]) => (
          <ThemeOption 
            key={key} 
            theme={themeColors}
            onClick={() => handleThemeSelect(key)}
          >
            <ColorPreview 
              color={theme.colors.petals.positive[0]} 
              theme={themeColors} 
            />
            <ThemeName theme={themeColors}>
              {theme.name}
            </ThemeName>
          </ThemeOption>
        ))}
      </DropdownContent>
    </SelectorContainer>
  );
};

export default ThemeSelector;
