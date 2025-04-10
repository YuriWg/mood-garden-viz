# 心情花园集成指南

## 作为 React 组件使用

```jsx
import { MoodGarden } from 'mood-garden-viz';

function App() {
  return (
    <MoodGarden 
      data={moodData}
      theme="warm"
      width={800}
      height={600}
    />
  );
}