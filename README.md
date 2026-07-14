# 王浩智 · 个人学术主页 / Personal Academic Website

> 王浩智 (Haozhi Wang) 的个人学术主页 —— 山东大学基础医学院。
> Personal academic homepage of Haozhi Wang — School of Basic Medical Sciences, Shandong University.

本仓库是一个**纯静态、零依赖**的个人学术网站，包含主页、学习演示/复习材料合集，以及山东大学信息日报归档。网站通过 [Cloudflare Workers](https://developers.cloudflare.com/workers/) 静态资源托管部署。

This repository hosts a **dependency-free, static** personal academic website — including a homepage, a collection of study presentations/review decks, and an archive of the Shandong University daily info feed. It is served as static assets via [Cloudflare Workers](https://developers.cloudflare.com/workers/).

🔗 在线访问 / Live site: **https://wanghaozhi.com** （见 `wrangler.jsonc` 中的 `wanghaozhi` Worker）

---

## ✨ 特性 / Features

- **🌐 中英双语 / Bilingual (CN / EN)** — 通过 `class="lang-cn"` / `class="lang-en"` 标注语言块，自动检测浏览器语言偏好，并可手动切换；选择会保存到 `localStorage`。
- **🌓 深色 / 浅色主题 / Dark & Light Theme** — 跟随系统偏好，可手动切换，偏好持久化。
- **🪟 玻璃拟态 UI / Glassmorphic UI** — 半透明卡片、柔和阴影，采用医疗/生命科学主题配色（海军蓝 + 薄荷绿）。
- **📱 响应式布局 / Responsive Layout** — 侧边栏 + 主内容区，移动端自适应。
- **✨ 滚动渐显 / Scroll Reveal** — 基于 `IntersectionObserver` 的入场动画，零外部库。
- **⚡ 零构建 / Zero Build** — 原生 HTML / CSS / JavaScript，无需 `npm install`，无需打包。
- **☁️ Cloudflare Workers 部署 / One-command Deploy** — 通过 `wrangler` 一键发布。

---

## 🗂 项目结构 / Project Structure

```
personal_website/
├── index.html              # 主页（关于 / 教育背景 / 研究经历 / 联系方式）
├── presentations.html      # 演示与复习材料合集入口
├── styles.css              # 全站样式、主题变量、响应式布局
├── script.js               # 主题切换、语言切换、滚动渐显逻辑
├── avatar.png              # 头像
├── wrangler.jsonc          # Cloudflare Workers 部署配置
├── .gitignore
├── CONTRIBUTING.md         # 贡献指南（面向作者本人与 AI 助手）
│
├── daily/                  # 山大信息日报归档
│   ├── index.html          #   历史归档索引页
│   ├── latest.html         #   最新一期
│   └── YYYY-MM-DD.html     #   每日单页（共 25+ 期）
│
└── presentations/          # 演示 / 复习材料
    ├── *.html              #   单篇演示页（医学专题复习）
    ├── assets/             #   共享脚本与样式
    ├── images/             #   图片资源
    ├── infectious-diseases-site/   # 传染病专题子站
    └── parasite-site/              # 寄生虫专题子站
```

---

## 🛠 技术栈 / Tech Stack

| 层级 / Layer     | 技术 / Technology                          |
| ---------------- | ------------------------------------------ |
| 标记 / Markup    | 原生 HTML5                                 |
| 样式 / Styling   | 原生 CSS3（CSS 变量、`@media` 响应式）     |
| 交互 / Scripting | 原生 JavaScript（ES6+，`IntersectionObserver`、`localStorage`） |
| 字体 / Fonts     | Google Fonts（`Inter` + `Outfit`）         |
| 部署 / Hosting   | Cloudflare Workers（静态资源模式）         |

---

## 🚀 本地预览 / Local Preview

无需任何构建步骤。任选其一 / No build step required — pick any of the following:

**方式一 / Option 1 — 直接打开 / Just open it**

双击 `index.html` 即可在浏览器中查看。

**方式二 / Option 2 — 本地静态服务器 / Local static server（推荐 / recommended）**

```bash
# Python
python -m http.server 8000

# 或 Node
npx serve .
```

然后访问 / Then visit: http://localhost:8000

---

## ☁️ 部署 / Deployment

本项目通过 [Cloudflare Workers 静态资源](https://developers.cloudflare.com/workers/static-assets/)托管，配置见 `wrangler.jsonc`：

```jsonc
{
  "name": "wanghaozhi",
  "compatibility_date": "2026-07-14",
  "assets": { "directory": "." },
  "compatibility_flags": ["nodejs_compat"]
}
```

发布步骤 / To deploy:

```bash
# 1. 安装 wrangler（如未安装）
npm install -g wrangler

# 2. 登录 Cloudflare
wrangler login

# 3. 在仓库根目录执行发布
wrangler deploy
```

---

## 🤝 贡献 / Contributing

欢迎通过 Pull Request 提交新的演示或复习材料。详细的提交流程（**同时面向人类作者与 AI 助手**）请阅读：

👉 **[CONTRIBUTING.md](./CONTRIBUTING.md)**

流程概览 / Workflow overview:

```
制作网页 → 提交 PR → 王浩智 review → 合并 → 网站上线
```

---

## 📮 联系 / Contact

- **邮箱 / Email:** wanghaozhi@mail.sdu.edu.cn
- **单位 / Affiliation:** 山东大学 基础医学院 / School of Basic Medical Sciences, Shandong University

---

## 📄 许可 / License

本仓库的源代码与设计仅用于个人学术展示。如需复用代码，请保留署名；演示与复习材料中的医学内容版权归原作者所有。

Source code and design in this repository are for personal academic presentation only. If you reuse the code, please retain attribution. Medical content within the presentations remains the copyright of its respective authors.
