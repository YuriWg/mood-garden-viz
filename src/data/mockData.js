// 模拟数据生成器
export const generateMockData = () => {
  const flowers = [];
  const currentYear = new Date().getFullYear();
  
  // 斯多葛名言
  const stoicQuotes = [
    "不要追求一切顺利，而要追求内心强大，能够承受一切。",
    "我们无法控制外部事件，但我们可以控制我们对它们的反应。",
    "真正的自由来自于对自己欲望的控制。",
    "生活不在于拥有什么，而在于经历什么。",
    "痛苦不是来自事件本身，而是来自你对事件的判断。",
    "如果你被外物所困扰，问题不在于事物本身，而在于你对它们的判断。",
    "我们的生活就是我们思想的产物。",
    "不要解释你的哲学，实践它。",
    "真正的财富是对少的满足。",
    "我们不能选择外部环境，但我们可以选择如何应对。",
    "幸福不在于拥有很多，而在于需要很少。",
    "最好的复仇是不要变得和伤害你的人一样。",
    "如果一个人不知道他要驶向哪个港口，那么任何风都不是顺风。",
    "生命的长短不在于时间的长短，而在于我们如何使用它。",
    "不要追求快乐，追求内心的平静。"
  ];
  
  // 心情日记标题
  const moodTitles = [
    "今日感悟", "心情记录", "日常思考", "生活点滴", "心灵小憩",
    "一天所得", "情绪笔记", "内心独白", "日记一则", "心情速写",
    "今日所思", "片刻记录", "心境随笔", "日常观察", "心情小记",
    "思绪整理", "今日心情", "生活感触", "内心对话", "情绪流动"
  ];
  
  // 心情引用
  const moodQuotes = [
    "今天阳光明媚，心情也跟着好起来了。",
    "工作中遇到了一些挑战，但我相信自己能够克服。",
    "和朋友聊天，感到被理解的温暖。",
    "读了一本好书，获得了新的视角。",
    "今天有点疲惫，但依然感恩生活中的美好。",
    "遇到了一些挫折，需要调整心态。",
    "雨天的宁静给了我思考的空间。",
    "完成了一项任务，感到满足。",
    "今天情绪有些低落，需要给自己一些时间。",
    "和家人共度美好时光，心里充满幸福感。",
    "工作上取得了小小的进步，很开心。",
    "今天天气不好，心情也受到了影响。",
    "遇到了意料之外的惊喜，心情大好。",
    "思考了一些人生问题，感到有些迷茫。",
    "尝试了新事物，感到兴奋和充实。",
    "今天有点焦虑，需要放松一下。",
    "和老朋友重聚，回忆涌上心头。",
    "解决了一个困扰已久的问题，如释重负。",
    "今天的日落特别美，让我感到平静。",
    "经历了一些挑战，但也学到了宝贵的经验。"
  ];
  
  // 生成随机日期（当年的随机日期）
  const getRandomDate = () => {
    const month = Math.floor(Math.random() * 12) + 1;
    let maxDay = 31;
    if ([4, 6, 9, 11].includes(month)) maxDay = 30;
    else if (month === 2) {
      // 检查是否为闰年
      maxDay = ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0) ? 29 : 28;
    }
    
    const day = Math.floor(Math.random() * maxDay) + 1;
    return { month, day };
  };
  
  // 生成随机心情分数 (-5 到 5)
  const getRandomScore = () => {
    return Math.floor(Math.random() * 11) - 5;
  };
  
  // 生成随机花朵数据
  const generateRandomFlowers = (count) => {
    const usedDates = new Set(); // 用于跟踪已使用的日期
    
    for (let i = 0; i < count; i++) {
      let date;
      let dateKey;
      
      // 确保日期不重复
      do {
        date = getRandomDate();
        dateKey = `${date.month}-${date.day}`;
      } while (usedDates.has(dateKey));
      
      usedDates.add(dateKey);
      
      const score = getRandomScore();
      const flower = {
        id: `flower-${i}`,
        month: date.month,
        day: date.day,
        score: score,
        title: moodTitles[Math.floor(Math.random() * moodTitles.length)],
        quote: moodQuotes[Math.floor(Math.random() * moodQuotes.length)],
        stoic: Math.random() > 0.3 ? stoicQuotes[Math.floor(Math.random() * stoicQuotes.length)] : null
      };
      
      flowers.push(flower);
    }
    
    return flowers;
  };
  
  // 生成50-100朵随机花
  const flowerCount = Math.floor(Math.random() * 51) + 50;
  return generateRandomFlowers(flowerCount);
};

// 生成特定日期的花朵数据
export const generateFlowerForDate = (month, day, options = {}) => {
  const {
    score = Math.floor(Math.random() * 11) - 5,
    title = "今日心情",
    quote = "",
    stoic = null
  } = options;
  
  return {
    id: `flower-${Date.now()}`,
    month,
    day,
    score,
    title,
    quote,
    stoic
  };
};