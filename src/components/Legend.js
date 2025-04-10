import React from 'react';
import styled from 'styled-components';
import { colorThemes } from '../utils/themes';

const LegendContainer = styled.div`
  position: absolute;
  right: ${props => props.isCollapsed ? '-300px' : '10px'}; // 增加移动距离
  top: 30%;
  transform: translateY(-50%);
  width: 200px;
  background: ${props => props.theme.container.legendBg || 'rgba(255, 255, 255, 0.95)'};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 20px;
  transition: right 0.3s ease, opacity 0.3s ease; // 添加 opacity 过渡
  z-index: 100;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  opacity: ${props => props.isCollapsed ? 0 : 1}; // 控制透明度
  visibility: ${props => props.isCollapsed ? 'hidden' : 'visible'}; // 控制可见性
  pointer-events: ${props => props.isCollapsed ? 'none' : 'auto'}; // 控制交互
`;

const LegendTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
  color: ${props => props.theme.text.primary};
  text-align: center;
  font-weight: 600;
`;

const LegendDescription = styled.p`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 12px;
  color: ${props => props.theme.text.secondary};
  line-height: 1.4;
`;

const InteractionHint = styled.p`
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 12px;
  color: ${props => props.theme.text.secondary};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LegendItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 8px;
  margin-bottom: 12px;
`;

const LegendItem = styled.div`
  margin-bottom: 0px;
  padding-bottom: 1px;
  border-bottom: ${props => props.count > 0 ? '1px dashed rgba(0,0,0,0.05)' : 'none'};
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
`;

const ScoreLabel = styled.span`
  font-size: 10px;
  color: #555;
  min-width: 12px;
`;

const DotsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
  margin-left: 3px;
`;

const Dot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${props => props.color};
  opacity: ${props => props.opacity};
`;

const StatsCard = styled.div`
  border-radius: 8px;
  padding: 0px;
  margin-top: 0px;
`;

const StatsRow = styled.div`
  font-size: 12px;
  margin-bottom: ${props => props.marginBottom || '6px'};
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${props => props.theme.text.primary};
`;

const StatsValue = styled.span`
  font-weight: bold;
`;

const AuthorInfo = styled.div`
  font-size: 12px;
  margin-top: 8px;
  padding-top: 6px;
  border-top: 1px solid rgba(0,0,0,0.1);
  text-align: right;
  color: ${props => props.theme.text.secondary};
`;

const ToggleButton = styled.div`
  position: absolute;
  right: ${props => props.isCollapsed ? '0px' : '210px'};
  top: 30%;
  transform: translateY(-50%);
  width: 20px;
  height: 40px;
  background: ${props => props.theme.container.cardBg};
  border-radius: 6px 0 0 6px;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  color: ${props => props.theme.text.secondary};
  border: 1px solid ${props => props.theme.text.border};
  border-right: none;
  transition: right 0.3s ease;
`;

const Legend = ({ flowerData, currentTheme, isCollapsed, toggleLegend }) => {
  const themeColors = colorThemes[currentTheme].colors;
  const legendScores = Array.from({length: 11}, (_, i) => i - 5);
  
  // 计算每种心情的天数统计
  const moodCounts = {};
  legendScores.forEach(score => {
    moodCounts[score] = flowerData.filter(f => f.score === score).length;
  });
  
  // 计算平均心情
  const avgMood = flowerData.length > 0 
    ? flowerData.reduce((sum, f) => sum + f.score, 0) / flowerData.length 
    : 0;
  
  // 获取颜色比例尺
  const getColorScale = () => {
    const theme = colorThemes[currentTheme];
    return score => {
      if (score <= -5) return theme.colors.petals.negative[0];
      if (score <= -2.5) return theme.colors.petals.negative[2];
      if (score === 0) return theme.colors.petals.neutral;
      if (score <= 2.5) return theme.colors.petals.positive[2];
      return theme.colors.petals.positive[0];
    };
  };
  
  const getColor = getColorScale();

  // 删除这些重复定义的样式组件
  // const LegendContainer = styled.div`...`;
  // const LegendTitle = styled.h3`...`;
  // const LegendDescription = styled.p`...`;
  // const InteractionHint = styled.p`...`;
  
  return (
    <>
      <LegendContainer theme={themeColors} isCollapsed={isCollapsed}>
        <LegendTitle theme={themeColors}>心情指数图例</LegendTitle>
        <LegendDescription theme={themeColors}>花朵颜色和大小代表心情值</LegendDescription>
        <InteractionHint theme={themeColors}>
          <span role="img" aria-label="sparkles">✨</span> 
          悬停可查看详细信息
        </InteractionHint>
        
        <LegendItemsGrid>
          {legendScores.map(score => {
            const count = moodCounts[score] || 0;
            return (
              <LegendItem key={score} count={count}>
                <ItemRow>
                  <svg width="24" height="24" viewBox="-12 -12 24 24">
                    <g>
                      {Array.from({length: 8}, (_, i) => {
                        const angle = i * 45;
                        const size = 6 * (1 + (score + 5)/10);
                        return (
                          <path 
                            key={i}
                            d={`M 0,0 Q ${size*0.15},${size*0.24} ${size*0.24},${size*0.56} Q 0,${size*0.88} ${-size*0.24},${size*0.56} Q ${-size*0.15},${size*0.24} 0,0`}
                            fill={getColor(score)}
                            transform={`rotate(${angle})`}
                            opacity={score === 0 ? 0.95 : 1}
                            stroke={score === 0 ? "#AAA" : "none"}
                            strokeWidth={score === 0 ? 0.3 : 0}
                          />
                        );
                      })}
                      <circle 
                        r={6 * (1 + (score + 5)/10) / 2.5}
                        fill={themeColors.centers[score >= 4 ? 'positive' : 
                                          score >= 2 ? 'highPositive' : 
                                          score > 0 ? 'lowPositive' : 
                                          score === 0 ? 'neutral' : 
                                          score > -2 ? 'lowNegative' : 
                                          score > -4 ? 'highNegative' : 'negative']}
                        stroke="#FFCDB2"
                        strokeWidth={0.8}
                      />
                    </g>
                  </svg>
                  <ScoreLabel>{score}</ScoreLabel>
                  
                  {count > 0 && (
                    <DotsContainer>
                      {Array.from({length: Math.min(10, Math.ceil(count / 3))}, (_, j) => (
                        <Dot 
                          key={j}
                          color={getColor(score)}
                          opacity={j < Math.ceil(count / 3) ? 0.7 : 0.2}
                        />
                      ))}
                      <span style={{ fontSize: 0, width: 0, height: 0, overflow: 'hidden' }} aria-label={`${count} 天`}>
                        {count}
                      </span>
                    </DotsContainer>
                  )}
                </ItemRow>
              </LegendItem>
            );
          })}
        </LegendItemsGrid>
        
        <StatsCard>
          <StatsRow theme={themeColors}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>累计记录:</span> <StatsValue>{flowerData.length}天</StatsValue>
          </StatsRow>
          
          {flowerData.length > 0 && (
            <StatsRow theme={themeColors} marginBottom="0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
              <span>平均心情:</span> <StatsValue>{avgMood.toFixed(1)}</StatsValue>
            </StatsRow>
          )}
          
          <AuthorInfo theme={themeColors}>@游梨</AuthorInfo>
        </StatsCard>
      </LegendContainer>
      
      <ToggleButton 
        theme={themeColors} 
        isCollapsed={isCollapsed}
        onClick={toggleLegend}
      >
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </ToggleButton>
    </>
  );
};

export default Legend;