# Academic Homepage

纯静态学术主页（HTML/CSS/JS，零依赖、无需构建）。

## 文件说明

| 文件 | 作用 |
|------|------|
| `data.js` | **所有内容都在这里**（个人信息、教育、研究、出版物、学术服务） |
| `index.html` | 页面骨架 |
| `style.css` | 霓虹蓝 + 深蓝黑主题、霓虹标题、灯牌闪烁、响应式 |
| `liquid.js` | WebGL 流动液体背景 + 鼠标拨水涟漪（不支持 WebGL 时退回 CSS 渐变） |
| `main.js` | 内容渲染、名字灯牌闪烁、导航高亮、滚动动画、论文筛选 |
| `.nojekyll` | 让 GitHub Pages 跳过 Jekyll 处理 |

## 本地预览

```bash
python3 -m http.server 4177
# 打开 http://localhost:4177/
```

## 部署到 GitHub Pages

- 仓库：https://github.com/YaYiQiu/yayiqiu.github.io（`main` 分支根目录发布）
- 线上地址：https://yayiqiu.github.io/

更新内容：修改 `data.js` 后提交并推送，1~2 分钟后网站自动更新：

```bash
git add -A && git commit -m "update content" && git push
```
