import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// 添加回样式组件定义
const TooltipContainer = styled.div`
  position: fixed;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  background: ${props => props.theme.container.cardBg};
  padding: 12px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 15px ${props => props.theme.text.border};
  font-size: 14px;
  line-height: 1.5;
  pointer-events: none;
  z-index: 99999;
  max-width: 320px;
  transition: opacity 0.2s, transform 0.2s;
  border-left: 4px solid ${props => props.theme.text.title};
  transform: translateY(${props => props.visible ? '0' : '5px'});
  opacity: ${props => props.visible ? '1' : '0'};
  left: ${props => props.left}px;
  top: ${props => props.top}px;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  color: ${props => props.theme.text.title};
  font-size: 12px;
`;

const MoodScore = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ScoreLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${props => props.theme.text.secondary};
  margin-right: 10px;
`;

const ScoreValue = styled.span`
  font-weight: bold;
  color: ${props => props.color};
  font-size: 11px;
  background: rgba(${props => props.score > 0 ? '255,235,205' : '230,240,250'}, 0.3);
  padding: 2px 8px;
  border-radius: 12px;
`;

const Quote = styled.div`
  font-style: italic;
  font-size: 11px;
  color: ${props => props.theme.text.secondary};
  margin: 12px 0 5px;
  padding-left: 10px;
  border-left: 2px solid ${props => props.theme.text.border};
  line-height: 1.6;
`;

const StoicSection = styled.div`
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid ${props => props.theme.text.border};
`;

const StoicTitle = styled.div`
  font-size: 11px;
  color: ${props => props.theme.text.secondary};
  font-weight: 500;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
`;

const StoicContent = styled.div`
  font-size: 11px;
  color: ${props => props.theme.text.secondary};
  line-height: 1.5;
  padding-left: 10px;
  border-left: 2px solid ${props => props.theme.text.border};
`;

const Tooltip = ({ data, position, themeColors, getColor }) => {
  const [tooltipPos, setTooltipPos] = useState({ left: 0, top: 0 });
  const tooltipRef = useRef(null);
  
  useEffect(() => {
    // 计算工具提示的位置
    if (tooltipRef.current && position) {
      const tooltipWidth = tooltipRef.current.offsetWidth;
      const tooltipHeight = tooltipRef.current.offsetHeight;
      
      // 计算最佳位置，避免超出视窗
      let left = position.x - tooltipWidth / 2;
      let top = position.y - tooltipHeight - 10;
      
      // 检查右边界
      if (left + tooltipWidth > window.innerWidth - 20) {
        left = window.innerWidth - tooltipWidth - 20;
      }
      
      // 检查左边界
      if (left < 20) {
        left = 20;
      }
      
      // 检查上边界 - 如果太高，就显示在鼠标下方
      if (top < 20) {
        top = position.y + 20;
      }
      
      // 检查下边界
      if (top + tooltipHeight > window.innerHeight - 20) {
        top = Math.max(20, position.y - tooltipHeight - 10);
      }
      
      setTooltipPos({ left, top });
    }
  }, [position]);
  
  // 处理引用中的 Markdown 链接
  const processText = (text) => {
    // 如果文本为空、null或undefined，返回空字符串
    if (!text) return '';
    
    try {
      // 确保文本是字符串
      const textStr = String(text);
      
      // 1. 处理 [[文件地址|显示文本]] 格式
      let processed = textStr.replace(/\[\[(.*?)\|(.*?)\]\]/g, (_, __, displayText) => {
        return displayText.trim();
      });
      
      // 2. 处理 [[文件地址]] 格式
      processed = processed.replace(/\[\[(.*?)\]\]/g, (_, path) => {
        // 安全地提取文件名
        const parts = path.includes('/') ? path.split('/') : [path];
        return parts[parts.length - 1].trim();
      });
      
      return processed;
    } catch (error) {
      console.error("处理文本时出错:", error, "原文本:", text);
      // 出错时返回原始文本或空字符串
      return String(text || '');
    }
  };
  
  // 如果没有数据，不渲染工具提示
  if (!data) return null;
  
  // 处理内容数据
  const processedQuote = processText(data.quote);
  
  return (
    <TooltipContainer 
      ref={tooltipRef}
      theme={themeColors}
      visible={!!data}
      left={tooltipPos.left}
      top={tooltipPos.top}
    >
      <Title theme={themeColors}>{data.title}</Title>
      <MoodScore>
        <ScoreLabel theme={themeColors}>心情指数:</ScoreLabel>
        <ScoreValue 
          color={getColor(data.score)} 
          score={data.score}
        >
          {data.score}
        </ScoreValue>
      </MoodScore>
      
      {processedQuote && (
        <Quote theme={themeColors}>
          {processedQuote}
        </Quote>
      )}
      
      {data.stoic && (
        <StoicSection theme={themeColors}>
          <StoicTitle theme={themeColors}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '5px' }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            每日斯多葛
          </StoicTitle>
          <StoicContent theme={themeColors}>
            {data.stoic}
          </StoicContent>
        </StoicSection>
      )}
    </TooltipContainer>
  );
};

export default Tooltip;