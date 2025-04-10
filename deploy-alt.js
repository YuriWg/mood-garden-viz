const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

// 配置
const username = 'yuriwg'; // 替换为你的 GitHub 用户名
const repoName = 'mood-garden-viz';
const buildDir = path.join(process.cwd(), 'build');

// 创建临时目录
const tempDir = path.join(os.tmpdir(), `gh-pages-${Math.random().toString(36).substr(2, 8)}`);
console.log(`使用临时目录: ${tempDir}`);

try {
  // 确保构建目录存在
  if (!fs.existsSync(buildDir)) {
    console.error('构建目录不存在，请先运行 npm run build');
    process.exit(1);
  }

  // 确保 .nojekyll 文件存在
  const noJekyllPath = path.join(buildDir, '.nojekyll');
  if (!fs.existsSync(noJekyllPath)) {
    fs.writeFileSync(noJekyllPath, '');
    console.log('创建了 .nojekyll 文件');
  }

  // 创建临时目录
  fs.mkdirSync(tempDir, { recursive: true });
  
  // 初始化 git 仓库
  console.log('初始化临时 git 仓库...');
  execSync('git init', { cwd: tempDir });
  execSync(`git config user.name "${username}"`, { cwd: tempDir });
  execSync(`git config user.email "${username}@users.noreply.github.com"`, { cwd: tempDir });
  
  // 复制构建文件到临时目录
  console.log('复制构建文件...');
  execSync(`cp -r "${buildDir}"/* "${tempDir}"`);
  
  // 添加并提交文件
  console.log('提交文件...');
  execSync('git add .', { cwd: tempDir });
  execSync('git commit -m "Deploy to GitHub Pages [ci skip]"', { cwd: tempDir });
  
  // 添加远程仓库并推送
  console.log('推送到 GitHub Pages...');
  execSync(`git remote add origin https://github.com/${username}/${repoName}.git`, { cwd: tempDir });
  try {
    execSync('git push -f origin HEAD:gh-pages', { cwd: tempDir });
    console.log('✅ 成功部署到 GitHub Pages!');
  } catch (error) {
    console.log('⚠️ 推送失败，尝试使用 SSH...');
    // 尝试使用 SSH URL
    execSync(`git remote set-url origin git@github.com:${username}/${repoName}.git`, { cwd: tempDir });
    execSync('git push -f origin HEAD:gh-pages', { cwd: tempDir });
    console.log('✅ 成功使用 SSH 部署到 GitHub Pages!');
  }
} catch (error) {
  console.error('❌ 部署失败:', error.message);
  process.exit(1);
} finally {
  // 清理临时目录
  console.log('清理临时目录...');
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch (error) {
    console.warn('无法清理临时目录:', error.message);
  }
}