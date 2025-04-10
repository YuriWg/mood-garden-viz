export const SizeConfig = {
  // 基础布局尺寸
  base: {
    width: 1000,
    minWidth: 600,
    padding: 20,
    titlePadding: 200,
    aspectRatio: 4/3, // 高宽比 4:3
  },
  
  // 网格相关尺寸
  grid: {
    cellSize: 30,
    monthWidth: 100,
    dayHeight: 30
  },
  
  // 花朵相关尺寸
  flower: {
    baseSize: 18,          // 基础大小
    sizeVariation: 0.9,    // 大小变化系数 (score的影响)
    centerRatio: 0.4,      // 花芯与花瓣的比例
    petalCount: 8,         // 花瓣数量
  },
  
  // 图例相关尺寸
  legend: {
    width: 180,
    padding: 15,
    itemSize: 30
  },
  
  // 响应式断点
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200
  },
  
  // 计算实际尺寸的方法
  calculateFlowerSize(score, isRandomView = false) {
    const normalizedScore = (score + 5) / 10; // 将-5到5归一化到0-1
    const baseSize = isRandomView 
      ? this.flower.baseSize * 0.9  // 随机视图放大花朵
      : this.flower.baseSize * 0.6; // 日历视图稍微缩小花朵
    return baseSize * (1 + normalizedScore * this.flower.sizeVariation);
  },
  
  calculateContainerHeight() {
    // 根据宽度和高宽比计算高度
    return this.base.width * this.base.aspectRatio;
  }, 
  
  // 计算实际渲染高度
  calculateScaledHeight(containerWidth) {
    const rawHeight = this.calculateContainerHeight();
    const scaleFactor = this.getScaleFactor(containerWidth);
    return rawHeight * scaleFactor;
  },

  // 获取缩放比例的方法
  getScaleFactor(containerWidth) {
    const minScale = 0.5; // 最小缩放比例
    const maxScale = 1.0; // 最大缩放比例
    const scale = containerWidth / this.base.width;
    
    // 确保缩放比例在合理范围内
    return Math.max(minScale, Math.min(maxScale, scale));
  }
};