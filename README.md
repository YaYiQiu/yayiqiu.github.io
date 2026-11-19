# Academic Homepage

纯静态学术主页（HTML/CSS/JS，零依赖、无需构建）。

## 文件说明

| 文件 | 作用 |
|------|------|
| `data.js` | **所有内容都在这里**（个人信息、News、教育、经历、论文、奖项、学术服务） |
| `index.html` | 页面骨架 |
| `style.css` | 样式（夜空 + 毛玻璃风格、响应式） |
| `main.js` | 渲染与交互（导航高亮、时间线动画、论文筛选、星空背景） |
| `avatar.jpg` | 头像（自行放入；缺失时自动显示姓名首字母） |
| `.nojekyll` | 让 GitHub Pages 跳过 Jekyll 处理 |

## 本地预览

```bash
python3 -m http.server 4177
# 打开 http://localhost:4177/
```

## 部署到 GitHub Pages

1. 在 GitHub 新建公开仓库，名称必须为 `<你的用户名>.github.io`
2. 推送本目录内容到仓库：
   ```bash
   git init && git add . && git commit -m "init homepage"
   git branch -M main
   git remote add origin git@github.com:<你的用户名>/<你的用户名>.github.io.git
   git push -u origin main
   ```
3. 仓库 Settings → Pages → Source 选 `Deploy from a branch`，分支 `main`，目录 `/ (root)`
4. 1~2 分钟后访问 `https://<你的用户名>.github.io/`

之后只需修改 `data.js` 并 push，网站即自动更新。
