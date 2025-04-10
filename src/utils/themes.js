export const colorThemes = {
  warm: {
    name: "暖色调",
    colors: {
      petals: {  // 花瓣颜色
        positive: ["#FF9966", "#FFB77D", "#FFD4A5", "#FFEFD5"],
        neutral: "#E8D0B0", // 更改为更深的米色
        negative: ["#5B8FB9", "#91C8E4", "#B4D5E5", "#D6E8F3"]
      },
      centers: {  // 花芯颜色
        positive: "#E05A00",
        highPositive: "#E86E3C",
        lowPositive: "#E88A5C",
        neutral: "#B89B8C",
        lowNegative: "#4682B4",
        highNegative: "#1E5A8C",
        negative: "#004080"
      },
      container: {  // 容器颜色
        mainBg: "#FDFAF6",              
        cardBg: "rgba(255, 252, 249, 0.95)",
        hoverBg: "#FFF8F3",             
        legendBg: "rgba(255, 252, 249, 0.92)"
      },
      text: {  // 文本颜色
        primary: "#543A29",           // 更深的棕色
        secondary: "#896B54",         // 中等棕色
        title: "#432818",             // 深棕色
        border: "rgba(162, 139, 122, 0.15)" 
      }
    }
  },
  cool: {
    name: "冷色调",
    colors: {
      petals: {
        positive: ["#89CFF0", "#ADD8E6", "#B0E0E6", "#E0FFFF"],
        neutral: "#BED8E0", // 更改为淡蓝灰色
        negative: ["#9370DB", "#B19CD9", "#D8BFD8", "#E6E6FA"]
      },
      centers: {
        positive: "#4682B4",
        highPositive: "#5B8FB9",
        lowPositive: "#7BA7C7",
        neutral: "#B8B8B8",
        lowNegative: "#9370DB",
        highNegative: "#7B68EE",
        negative: "#6A5ACD"
      },
      container: {
        mainBg: "#F5F8FA",
        cardBg: "rgba(245, 248, 250, 0.95)",
        hoverBg: "#EDF2F7",
        legendBg: "rgba(245, 248, 250, 0.92)"
      },
      text: {
        primary: "#1A365D",            // 深蓝色
        secondary: "#2C5282",          // 中蓝色
        title: "#0E2A52",              // 深海蓝
        border: "rgba(74, 85, 104, 0.15)"
      }
    }
  },
  forest: {
    name: "森林",
    colors: {
      petals: {
        positive: ["#228B22", "#32CD32", "#90EE90", "#98FB98"],
        neutral:  "#CCDDCC", // 更改为淡绿灰色
        negative: ["#8B4513", "#A0522D", "#B8860B", "#CD853F"]
      },
      centers: {
        positive: "#006400",
        highPositive: "#228B22",
        lowPositive: "#32CD32",
        neutral: "#A0785A",
        lowNegative: "#8B4513",
        highNegative: "#A0522D",
        negative: "#654321"
      },
      container: {
        mainBg: "#F4F8F4",
        cardBg: "rgba(244, 248, 244, 0.95)",
        hoverBg: "#E8F0E8",
        legendBg: "rgba(244, 248, 244, 0.92)"
      },
      text: {
        primary: "#1E3A1E",            // 深绿色
        secondary: "#3A5F3A",          // 中绿色
        title: "#0F280F",              // 森林绿
        border: "rgba(44, 74, 44, 0.15)"
      }
    }
  },
  sunset: {
    name: "日落",
    colors: {
      petals: {
        positive: ["#FF6B6B", "#FF8E8E", "#FFA4A4", "#FFC4C4"],
        neutral:  "#E0C0C0", // 更改为淡红灰色
        negative: ["#4B0082", "#6A287E", "#843799", "#9F5F9F"]
      },
      centers: {
        positive: "#FF4D4D",
        highPositive: "#FF6B6B",
        lowPositive: "#FF8C94",
        neutral: "#DCD0C0",
        lowNegative: "#843799",
        highNegative: "#6A287E",
        negative: "#4B0082"
      },
      container: {
        mainBg: "#FFF5F5",
        cardBg: "rgba(255, 245, 245, 0.95)",
        hoverBg: "#FFE8E8",
        legendBg: "rgba(255, 245, 245, 0.92)"
      },
      text: {
        primary: "#4A1C1C",            // 深红褐色
        secondary: "#7D3C3C",          // 中红褐色
        title: "#380F0F",              // 暗红色
        border: "rgba(74, 44, 44, 0.15)"
      }
    }
  }
};