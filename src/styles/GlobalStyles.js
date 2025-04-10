import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@700&family=Pacifico&family=Bebas+Neue&family=Cinzel:wght@600&family=Lobster&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Chelsea+Market&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #FDFAF6;
  }
  
  /* 叶子的浮动动画 */
  @keyframes float1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-15px, -25px) rotate(5deg); }
  }
  @keyframes float2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(18px, -22px) rotate(-6deg); }
  }
  @keyframes float3 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-20px, -28px) rotate(8deg); }
  }
  @keyframes float4 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(22px, -20px) rotate(-5deg); }
  }
  @keyframes float5 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(12px, -30px) rotate(7deg); }
  }
  @keyframes float6 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-18px, -24px) rotate(-9deg); }
  }
  @keyframes float7 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(20px, -35px) rotate(10deg); }
  }
  @keyframes float8 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-24px, -32px) rotate(-7deg); }
  }
  
  .floating {
    animation-duration: 6s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    animation-play-state: running;
  }
  
  .floating.floating1 { animation-name: float1; }
  .floating.floating2 { animation-name: float2; }
  .floating.floating3 { animation-name: float3; }
  .floating.floating4 { animation-name: float4; }
  .floating.floating5 { animation-name: float5; }
  .floating.floating6 { animation-name: float6; }
  .floating.floating7 { animation-name: float7; }
  .floating.floating8 { animation-name: float8; }
  
  /* 花朵的微小浮动动画 */
  @keyframes gentle-float1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(2px, 2px) rotate(0.5deg); }
    50% { transform: translate(-1px, 3px) rotate(-0.5deg); }
    75% { transform: translate(-2px, 1px) rotate(0deg); }
  }
  
  @keyframes gentle-float2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-2px, 1px) rotate(-0.5deg); }
    50% { transform: translate(1px, 2px) rotate(0.5deg); }
    75% { transform: translate(2px, -1px) rotate(0deg); }
  }
  
  @keyframes gentle-float3 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(1px, -2px) rotate(0.5deg); }
    50% { transform: translate(3px, 0px) rotate(0deg); }
    75% { transform: translate(1px, 2px) rotate(-0.5deg); }
  }
  
  @keyframes gentle-float4 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-1px, -1px) rotate(-0.5deg); }
    50% { transform: translate(-2px, 1px) rotate(0deg); }
    75% { transform: translate(0px, 2px) rotate(0.5deg); }
  }
  
  .gentle-float1 { animation: gentle-float1 4s ease-in-out infinite; }
  .gentle-float2 { animation: gentle-float2 5s ease-in-out infinite; }
  .gentle-float3 { animation: gentle-float3 6s ease-in-out infinite; }
  .gentle-float4 { animation: gentle-float4 7s ease-in-out infinite; }
  
  /* 卡片样式 */
  .card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

export default GlobalStyle;