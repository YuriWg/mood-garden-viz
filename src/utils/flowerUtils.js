export const Utils = {
  generatePetal(size) {
    const tip = size * 0.8;
    const width = size * 0.3;
    return `M 0,0 
            Q ${width/2},${tip*0.3} ${width*0.8},${tip*0.7}
            Q 0,${tip*1.1} ${-width*0.8},${tip*0.7}
            Q ${-width/2},${tip*0.3} 0,0`;
  },
  
  generateLeaf(size) {
    const length = size * 1.5;
    const width = size * 0.6;
    return `M 0,0
            C ${width*0.6},${length*0.3} ${width},${length*0.6} ${width*0.3},${length}
            C ${-width*0.3},${length*0.8} ${-width*0.9},${length*0.5} ${-width*0.4},${length*0.2}
            C ${-width*0.15},${length*0.1} ${-width*0.05},${length*0.05} 0,0`;
  },
  
  getFlowerPosition(d, isRandom = false, width, height, titlePadding, padding, cellSize) {
    if (isRandom) {
      return {
        x: d.x,
        y: d.y
      };
    }
    return {
      x: d.month * (width / 12) + (width / 24),
      y: titlePadding + padding + (d.day - 1) * cellSize - 10
    };
  },
  
  // 处理引用中的 Markdown 链接
  processText(text) {
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
  },
  
  // 计算两点之间的距离
  calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  },
  
  // 生成随机ID
  generateId(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length);
  },
  
  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  
  // 获取月份名称
  getMonthName(monthIndex) {
    const months = ["一月", "二月", "三月", "四月", "五月", "六月", 
                    "七月", "八月", "九月", "十月", "十一月", "十二月"];
    return months[monthIndex - 1] || "";
  },
  
  // 获取月份英文简称
  getMonthShortName(monthIndex) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[monthIndex - 1] || "";
  },
  
  // 截断文本
  truncateText(text, maxLength = 100) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },
  
  // 防抖函数
  debounce(func, wait = 300) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  },
  
  // 节流函数
  throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // 计算平均心情值
  calculateAverageMood(flowers) {
    if (!flowers || flowers.length === 0) return 0;
    const sum = flowers.reduce((acc, flower) => acc + flower.score, 0);
    return sum / flowers.length;
  },
  
  // 获取心情分布统计
  getMoodDistribution(flowers) {
    if (!flowers || flowers.length === 0) return {};
    
    const distribution = {};
    for (let i = -5; i <= 5; i++) {
      distribution[i] = 0;
    }
    
    flowers.forEach(flower => {
      if (distribution[flower.score] !== undefined) {
        distribution[flower.score]++;
      }
    });
    
    return distribution;
  }
};