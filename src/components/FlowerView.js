import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { colorThemes } from '../utils/themes';
import { SizeConfig } from '../utils/sizeConfig';
import { Utils } from '../utils/flowerUtils';
import Tooltip from './Tooltip';

const SVGContainer = styled.div`
  // {{移除 position, left, top, height, display}}
  // position: absolute; 
  // left: 0;
  // top: 0;
  // height: 100%; 
  // display: flex;
  // flex-direction: column;
  width: 100%; // {{保留 width}}
`;

const FlowerView = ({ 
  flowerData, 
  isRandomView, 
  currentTheme, 
  dimensions = { width: 0, height: 0 }, // 添加默认值
  setDimensions, // 添加 setDimensions 到 props
  selectedFlower,
  setSelectedFlower
}) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null); // Ref is attached to SVGContainer
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // 添加尺寸计算逻辑
  useEffect(() => {
    if (!containerRef.current) return; // Checks the ref for the inner container
    
    const updateDimensions = () => {
      if (containerRef.current) { // Uses the ref for the inner container
        const { width, height } = containerRef.current.getBoundingClientRect();
        if (width !== dimensions.width || height !== dimensions.height) {
          if (typeof setDimensions === 'function') {
            setDimensions({ width, height });
          }
        }
      }
    };
    
    updateDimensions();
    
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current); // Observes the inner container
    
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // 获取当前主题颜色
  const themeColors = colorThemes[currentTheme].colors;
  
  // 获取颜色比例尺
  const getColorScale = () => {
    const theme = colorThemes[currentTheme];
    return d3.scaleLinear()
      .domain([-5, -2.5, 0, 2.5, 5])
      .range([
        theme.colors.petals.negative[0],
        theme.colors.petals.negative[2],
        theme.colors.petals.neutral,
        theme.colors.petals.positive[2],
        theme.colors.petals.positive[0]
      ])
      .interpolate(d3.interpolateHcl);
  };
  
  // 获取花朵颜色
  const getColor = (score) => {
    return getColorScale()(score);
  };
  
  // 获取花芯颜色
  const getFlowerCenterColor = (score) => {
    const centers = themeColors.centers;
    
    if (score >= 4) return centers.positive;
    if (score >= 2) return centers.highPositive;
    if (score > 0) return centers.lowPositive;
    if (score === 0) return centers.neutral;
    if (score > -2) return centers.lowNegative;
    if (score > -4) return centers.highNegative;
    return centers.negative;
  };

  // 处理鼠标悬停事件
  const handleMouseOver = (event, flower) => {
    setTooltipData(flower);
    const { clientX, clientY } = event;
    setTooltipPosition({ x: clientX, y: clientY });
  };

  // 处理鼠标移动事件
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setTooltipPosition({ x: clientX, y: clientY });
  };

  // 处理鼠标离开事件
  const handleMouseOut = () => {
    setTooltipData(null);
  };

  // 绘制花朵
  useEffect(() => {
    if (!svgRef.current || !dimensions || !dimensions.width || !flowerData.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const viewboxWidth = dimensions.width; 
    
    // {{根据宽度和 3:4 宽高比计算 viewBox 高度}}
    const viewboxHeight = viewboxWidth * (4 / 3); 

    svg.attr("viewBox", `0 0 ${viewboxWidth} ${viewboxHeight}`) 
       .attr("width", "100%") 
       // {{移除 height="100%"，让 viewBox 和 width 控制高度}}
       // .attr("height", "100%") 
       .style("display", "block"); 
        
    const currentThemeColors = colorThemes[currentTheme].colors; 

    // {{将基于 3:4 比例计算的尺寸传递给绘图函数}}
    const drawDimensions = { width: viewboxWidth, height: viewboxHeight };

    if (isRandomView) {
      drawRandomFlowers(svg, flowerData, drawDimensions, currentThemeColors); 
    } else {
      // {{调用修正后的 drawCalendarFlowers}}
      drawCalendarFlowers(svg, flowerData, drawDimensions, currentThemeColors); 
    }

  // 依赖项保持不变
  }, [flowerData, dimensions.width, isRandomView, currentTheme]); 

  // {{修改函数签名以接收 themeColors}}
  const drawRandomFlowers = (svg, flowers, { width, height }, themeColors) => { 
      
      // 创建花朵和绿叶容器
      const flowerContainer = svg.append("g")
        .attr("class", "flower-container");
        
      // 添加背景绿叶 - 逐步恢复
      const leafCount = Math.min(flowers.length * 1.2, 250);
      for (let i = 0; i < leafCount; i++) {
        // {{恢复原始 x, y 计算 (带边距)}}
        const x = Math.random() * width * 0.95 + width * 0.05; 
        const y = Math.random() * height * 0.95 + height * 0.05; 
        const size = Math.random() * 15 + 10; 
        const opacity = Math.random() * 0.3 + 0.5; 
        // {{恢复 rotation 计算}}
        const rotation = Math.random() * 360; 
        
        const leafG = flowerContainer.append("g")
          .attr("transform", `translate(${x}, ${y})`); // 保持G元素只有 translate
          
        leafG.append("path")
          .attr("d", Utils.generateLeaf(size)) 
          .attr("fill", themeColors.leaf?.color || "#C1D9B3") 
          .attr("opacity", opacity)
          // {{恢复 path 元素的 rotate transform}}
          .attr("transform", `rotate(${rotation})`); 
      }
      
      // 随机分布花朵 - 使用传入的 width 和 height
      flowers.forEach((flower, i) => {
        // 使用传入的 dimensions 计算 x, y
        const x = Math.random() * width * 0.8 + width * 0.1;
        const y = Math.random() * height * 0.8 + height * 0.1;
        
        const flowerG = flowerContainer.append("g")
          .attr("class", "flower-base")
          .attr("transform", `translate(${x}, ${y})`); // 使用新的 x, y
        
        // -------- Start: 添加缺失的花朵绘制代码 --------
        // 添加动画层 - 使用更细微的动画
        const animationLayer = flowerG.append("g")
          .attr("class", `gentle-float${Math.floor(Math.random() * 5 + 1)}`)
          .style("animation-delay", `${Math.random() * 3}s`);

        // 绘制花瓣 - 调整大小
        const size = SizeConfig.calculateFlowerSize(flower.score, true) * 0.9; // 稍微缩小花朵
        const petals = Array.from({length: 8}, (_, j) => { // 假设8个花瓣
          const angle = j * 45;
          return `
            <path d="${Utils.generatePetal(size)}" 
                  fill="${getColor(flower.score)}"
                  transform="rotate(${angle})"
                  opacity="${flower.score === 0 ? '0.85' : '0.95'}"/>
          `;
        }).join('');
        
        animationLayer.html(petals);
        
        // 添加花芯
        animationLayer.append("circle")
          .attr("r", size * SizeConfig.flower.centerRatio)
          .attr("fill", getFlowerCenterColor(flower.score))
          .attr("stroke", "#FFCDB2") // 或使用 themeColors 相关颜色
          .attr("stroke-width", flower.score === 0 ? 1.5 : 1.2);
        // -------- End: 添加缺失的花朵绘制代码 --------

        // 添加事件处理
        flowerG
          .on("mouseover", (event) => handleMouseOver(event, flower))
          .on("mousemove", handleMouseMove)
          .on("mouseout", handleMouseOut)
          .style("cursor", "pointer")
          .style("transition", "transform 0.2s ease")
          .on("mouseenter", function() { // 事件处理保持不变
            d3.select(this).transition()
              .attr("transform", `translate(${x},${y}) scale(1.15)`); // 确保使用更新后的 x, y
          })
          .on("mouseleave", function() { // 事件处理保持不变
            d3.select(this).transition()
              .attr("transform", `translate(${x},${y}) scale(1)`); // 确保使用更新后的 x, y
          });
      });
    };

  // 绘制背景绿叶
  const drawBackgroundLeaves = (container, centerX, centerY) => {
    const leafCount = Math.floor(flowerData.length * 1.8);
    const width = SizeConfig.base.width;
    const height = SizeConfig.calculateContainerHeight();
    const titlePadding = SizeConfig.base.titlePadding;
    
    // 利用整个容器空间
    const usableWidth = width * 0.8;
    const usableHeight = height - titlePadding * 1.5;
    const marginX = (width - usableWidth) / 2;
    const marginY = titlePadding + 20;
  
    const leaves = Array.from({length: leafCount}, (_, i) => {
      return {
        x: marginX + Math.random() * usableWidth,
        y: marginY + Math.random() * usableHeight,
        size: 12 + Math.random() * 20,
        angle: Math.random() * 360,
        id: i
      };
    });
      
    const leafGroup = container.append("g")
      .attr("class", "leaf-group");
      
    leaves.forEach(leaf => {
      const leafColors = [
        "rgba(76, 175, 80, 0.6)",
        "rgba(67, 160, 71, 0.5)",
        "rgba(56, 142, 60, 0.4)",
        "rgba(46, 125, 50, 0.3)"
      ];
      
      const leafG = leafGroup.append("g")
        .attr("class", "leaf-base")
        .attr("transform", `translate(${leaf.x}, ${leaf.y})`);
        
      const leafAnimLayer = leafG.append("g")
        .attr("class", `floating floating${Math.floor(Math.random() * 8 + 1)}`)
        .style("animation-delay", `${Math.random() * 3}s`)
        .style("animation-duration", `${7 + Math.random() * 4}s`);
        
      leafAnimLayer.append("path")
        .attr("d", Utils.generateLeaf(leaf.size))
        .attr("fill", leafColors[Math.floor(Math.random() * leafColors.length)])
        .attr("transform", `rotate(${leaf.angle})`)
        .attr("opacity", 0.5 + Math.random() * 0.3);
    });
  };

  // 绘制花瓣
  const drawFlowerPetals = (container, flower) => {
    const size = SizeConfig.calculateFlowerSize(flower.score, true);
    const petals = Array.from({length: SizeConfig.flower.petalCount}, (_, j) => {
      const angle = j * (360 / SizeConfig.flower.petalCount);
      return `
        <path d="${Utils.generatePetal(size)}" 
              fill="${getColor(flower.score)}"
              transform="rotate(${angle})"
              opacity="${flower.score === 0 ? '0.95' : '1'}"
            ${flower.score === 0 ? 'stroke="#AAA" stroke-width="0.5"' : ''}/>
      `;
    }).join('');
    
    // 添加花瓣到动画层
    container.html(petals);
    
    // 添加花芯
    container.append("circle")
      .attr("r", size * SizeConfig.flower.centerRatio)
      .attr("fill", getFlowerCenterColor(flower.score))
      .attr("stroke", "#FFCDB2")
      .attr("stroke-width", 1.5);
  };

  // 绘制日历视图的花朵
  // {{修正函数签名，接收 dimensions 和 themeColors}}
  const drawCalendarFlowers = (svg, flowers, { width, height }, themeColors) => {
    // {{移除内部获取 width/height 的代码}}
    // const width = SizeConfig.base.width; 
    // const height = SizeConfig.calculateContainerHeight(); 
    const titlePadding = SizeConfig.base.titlePadding; // 可以保留用于相对定位，或用固定值
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    
    // {{使用传入的 width 和 height 计算布局}}
    const leftMargin = width * 0.1;
    const topMargin = 80; // 固定顶部边距用于月份标签等
    const bottomMargin = height * 0.05;
    const rightMargin = width * 0.05; 
    
    const usableWidth = width - leftMargin - rightMargin;
    const usableHeight = height - topMargin - bottomMargin; // 可用绘图高度
    
    const monthWidth = usableWidth / 12;
    const startY = topMargin;
    // {{根据可用高度计算日期间距，或者使用一个固定的较小值}}
    const daySpacing = usableHeight / 31; 
    // 或者 const daySpacing = 20; // 使用一个较小固定值尝试适应 3:4 比例
    
    // 添加背景网格辅助线
    const gridGroup = svg.append("g").attr("class", "grid-lines");
    
    // 月份分隔线 (使用新的尺寸和边距)
    for (let i = 0; i <= 12; i++) {
        gridGroup.append("line")
          .attr("class", "grid-line")
          .attr("x1", leftMargin + i * monthWidth )
          .attr("y1", topMargin - 20) // 相对 topMargin 定位
          .attr("x2", leftMargin + i * monthWidth )
          .attr("y2", topMargin + 31 * daySpacing) // 使用计算出的总高度
          .style("stroke", "rgba(0,0,0,0.05)")
          .style("stroke-width", i % 3 === 0 ? 1 : 0.5)
          .style("stroke-dasharray", i % 3 === 0 ? "none" : "3,3");
    }
    
    // 每5天的水平分隔线
    for (let i = 0; i <= 31; i += 5) {
      gridGroup.append("line")
        .attr("class", "grid-line")
        .attr("x1", leftMargin - 10)
        .attr("y1", topMargin + i * daySpacing)
        .attr("x2", leftMargin + 12 * monthWidth + 10) // 稍微延伸出区域
        .attr("y2", topMargin + i * daySpacing) // 使用新的 topMargin 和 daySpacing
           // ... 样式 ...
    }
    
    // 添加月份标签 (使用新的尺寸和边距)
    months.forEach((month, i) => {
      const x = leftMargin + i * monthWidth + (monthWidth / 2);
      svg.append("text")
        .attr("x", x)
        .attr("y", startY - 30) // 调整Y坐标
        .attr("class", "month-text")
        .attr("text-anchor", "middle")
        .style("font-family", "'Montserrat', sans-serif")
        .style("font-size", "15px")
        .style("font-weight", "800")
        .style("opacity", "0.9")
        .style("fill", themeColors.text.secondary) // {{使用传入的 themeColors}}
        .text(month);
    });
    
    // 添加日期标签 (使用新的尺寸和边距)
    for (let day = 1; day <= 31; day++) {
      const formattedDay = day < 10 ? `0${day}` : `${day}`;
      svg.append("text")
        .attr("x", leftMargin - 30)
        .attr("y", startY + (day - 1) * daySpacing) // 使用新的 startY 和 daySpacing
           // ... 其他属性 ...
        .style("fill", themeColors.text.secondary) // {{使用传入的 themeColors}}
        .style("font-size", "14px")
        .style("font-weight", "500")
        .text(formattedDay);
    }

    // 创建花朵 (使用新的尺寸和边距)
    flowers.forEach(flower => {
      const x = leftMargin + (flower.month - 1) * monthWidth + (monthWidth / 2); 
      const y = startY + (flower.day - 1) * daySpacing; // 使用新的 startY 和 daySpacing
      
      const flowerG = svg.append("g")
        .attr("class", "flower")
        .attr("transform", `translate(${x},${y})`);
      
      // {{ 使用全局的 getColor 和 getFlowerCenterColor，以及 SizeConfig 计算大小 }}
      // {{ 注意：这里的花朵大小计算仍然是固定的，可根据需要调整 }}
      const size = SizeConfig.calculateFlowerSize(flower.score, false) * 0.8; 
      const petals = Array.from({length: 8}, (_, i) => {
        const angle = i * 45;
        return `
          <path d="${Utils.generatePetal(size)}" 
                fill="${getColor(flower.score)}" 
                transform="rotate(${angle})"
                opacity="${flower.score === 0 ? '0.85' : '0.95'}"/>
        `;
      }).join('');
      
      flowerG.html(petals);
      
      flowerG.append("circle")
        .attr("r", size * SizeConfig.flower.centerRatio)
        .attr("fill", getFlowerCenterColor(flower.score)) // {{使用全局函数}}
        .attr("stroke", "#FFCDB2") 
        .attr("stroke-width", flower.score === 0 ? 1.5 : 1.2);
      
      // 添加事件处理 (不变, 但坐标 x, y 已更新)
      flowerG
        .on("mouseover", (event) => handleMouseOver(event, flower))
        .on("mousemove", handleMouseMove)
        .on("mouseout", handleMouseOut)
        .style("cursor", "pointer")
        .style("transition", "transform 0.2s ease")
        .on("mouseenter", function() {
          d3.select(this).transition().attr("transform", `translate(${x},${y}) scale(1.15)`);
        })
        .on("mouseleave", function() {
          d3.select(this).transition().attr("transform", `translate(${x},${y}) scale(1)`);
        });
    });
  };

  return (
    <SVGContainer theme={themeColors} ref={containerRef}> 
      {/* {{ 移除 SVG 上的 height="100%" }} */}
      <svg ref={svgRef} width="100%" /> 
      {tooltipData && (
        <Tooltip 
          data={tooltipData} 
          position={tooltipPosition}
          themeColors={themeColors}
          getColor={getColor}
        />
      )}
    </SVGContainer>
  );
};

export default FlowerView;