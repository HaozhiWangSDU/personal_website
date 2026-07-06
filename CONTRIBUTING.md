# 贡献指南 — 怎么往这个仓库提一份新的演示 / 复习材料

> 这份文件写给两类人:
> - **上半部分(👤 给人看的)**:网页作者本人。你做了一份新的演示/复习页,想把它放进这个网站。
> - **下半部分(🤖 给 AI 看的)**:你正在用的 AI 助手 / 编程 Agent。让它严格按下面的步骤把网页准备好并发起 PR。
>
> 维护者(王浩智)只做 review 和 merge,你提 PR → 我审核 → 通过后网页就上线了。

---

## 👤 上半部分 — 给网页作者本人

### 流程概览

```
你做网页 → 把 HTML 发给你的 AI → AI 在 GitHub 上 fork 仓库 → AI 提 PR
→ 王浩智 review → 通过 → 合并 → 网站上线
```

### 你需要做的 3 步

**1. 把你做的 HTML 整页内容,直接发给 AI 助手**(原文件 / 完整 HTML 字符串 / 截图都 OK)。

**2. 把本仓库的 GitHub 链接发给 AI**:
```
https://github.com/HaozhiWangSDU/personal_website
```

**3. 让 AI 按下面"给 AI 的指令"那一节执行**。你只需要最后检查一下:
- [ ] AI 是否真的在 GitHub 上开了 PR(给你一个 PR 链接)
- [ ] PR 标题、描述是否清楚说明了这份网页是什么
- [ ] 预览链接(如果 AI 给的话)打开能看到内容

剩下的 PR review 走我的 GitHub 通知。

### 重要提醒(给你的,不是给 AI 的)

- **网页必须是自包含的**:不依赖外部 CDN/字体库,或者只依赖 Google Fonts。`presentations/` 下的现有文件基本都引 `../styles.css` 和 `../script.js`,这是 OK 的(自动相对路径)。
- **中文文件名 OK,英文文件名也行**,但**提交到仓库里时建议用英文**(避免部分 Windows / Git 配置下的乱码)。AI 会处理。
- **不需要 license 信息** — 默认继承仓库。
- **PR 会被我 review**。如果有问题,我在 PR 里评论,你让 AI 看评论并改,然后 push 新的 commit 到同一个分支即可(不要开新 PR)。

---

## 🤖 下半部分 — 给 AI 助手的精确指令

> 你是一个负责把用户做好的演示 / 复习 HTML 部署到 GitHub 仓库 `https://github.com/HaozhiWangSDU/personal_website` 的 Agent。仓库所有者是 **Haozhi Wang (王浩智)**,你**不要**直接 push 到 main 分支,你需要走 **Pull Request 流程**。

### Step 0: 拿到信息

从用户(网页作者)那里得到:
- **HTML 内容**:可以是文件路径,也可以是 HTML 字符串。
- **网页的标题、分类、日期、简介**:用于在导航页加卡片。
- **网页的中英文名**(给两套标题,网站是中英双语的)。

如果用户没给分类/日期,根据内容推断,例如:"2026年7月" / "人体结构与功能学"。

### Step 1: Fork 仓库

```bash
# 仓库所有者: HaozhiWangSDU
# 你的 fork: 你的用户名/personal_website
gh repo fork HaozhiWangSDU/personal_website --clone
# 或者用 git 手动 fork + clone
```

### Step 2: 理解仓库布局

```
personal_website/
├── index.html                  ← 主页(本次不修改)
├── presentations.html          ← 演示报告**导航页**(本次**必须**修改,加卡片)
├── styles.css                  ← 全站样式(本次不修改)
├── script.js                   ← 全站脚本(本次不修改)
├── avatar.png
├── daily/                      ← 每日随笔,本次不修改
└── presentations/              ← **所有演示/复习文件放在这里**
    ├── 2026-seminar.html
    ├── sectional-anatomy-review.html
    ├── template.html           ← 创建新文件时**参考这个模板**
    ├── pe-dic-analysis.html
    ├── ureterovaginal-fistula-drainage.html
    ├── inspection-news.html
    ├── dorm-star-news.html
    ├── human-body4-review.html
    ├── assets/                 ← 图片等资源
    ├── images/                 ← 图片等资源
    ├── parasite-site/          ← 子站点(可以放多文件项目)
    └── infectious-diseases-site/
```

**关键事实**:
- 导航页 `presentations.html` 是一个 `<article class="card pres-card reveal">` 卡片的列表
- 每个卡片包含:`pres-meta`(日期 + 分类)、`pres-title`(中英双语标题)、`pres-desc`(中英双语简介)、`pres-action-bar`(带链接的按钮)
- 新网页文件**必须**放进 `presentations/` 目录
- 现有文件的共同模式:`<link rel="stylesheet" href="../styles.css">` + `<script src="../script.js"></script>`(模板在 `presentations/template.html`)

### Step 3: 处理 HTML 内容

把用户给的 HTML 改造成可以在该网站正常显示的版本:

1. **文件名**:`presentations/<english-kebab-case-name>.html`。中文文件名会触发 Git/Windows 编码问题,**必须**用英文。
2. **自包含**:确认 HTML 不依赖外部相对资源(同级目录或更下层 OK,但**不要**引用 `../../` 之外)。
3. **可保留原样**:如果用户给的 HTML 自带完整 `<style>` / 自带主题(如内嵌 CSS),**直接保留** — 现有 `sectional-anatomy-review.html` 和 `human-body4-review.html` 都是这种自包含风格,这是允许的。
4. **如果用户希望统一网站风格**:再按 `template.html` 的结构包一层(加上 `pres-container` / `pres-header` / `pres-body` 等)。但**默认保留用户原 HTML 风格**,这更尊重原作者。
5. **HTML 必须 UTF-8 编码**(`<meta charset="UTF-8">`)。如果用户给的 HTML 没声明,在 `<head>` 里加上。

### Step 4: 修改 `presentations.html` 导航页

在 `<main class="presentation-grid">` 内部,在合适位置插入一个新卡片。位置选择:
- 按时间倒序(最新的在最前),或
- 按主题分组(同类复习材料放一起),或
- **最简单**:紧跟同类最近的一份文件后(参考 `git log` 看看最新加的是什么)。

**卡片模板**(精确复制这个结构,**只**改文字):

```html
      <!-- Card X: <English Short Title> -->
      <article class="card pres-card reveal">
        <div>
          <div class="pres-meta">
            <span>
              <span class="lang-cn">2026年7月</span>
              <span class="lang-en">July 2026</span>
            </span>
            <span>
              <span class="lang-cn">学科分类</span>
              <span class="lang-en">Subject Category</span>
            </span>
          </div>
          <h2 class="pres-title">
            <span class="lang-cn">中文标题</span>
            <span class="lang-en">English Title</span>
          </h2>
          <p class="pres-desc">
            <span class="lang-cn">中文简介 1-2 句话,说清楚网页涵盖什么内容、面向什么场景。</span>
            <span class="lang-en">English description, 1-2 sentences summarizing the content and use case.</span>
          </p>
        </div>
        <div class="pres-action-bar">
          <a href="presentations/your-file-name.html" class="view-pres-link" target="_blank">
            <span class="lang-cn">开始</span>
            <span class="lang-en">Start</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12,5 19,12 12,19"></polyline></svg>
          </a>
        </div>
      </article>
```

按钮文字根据内容选合适的,参考现有命名:
- 复习材料 → `开始复习 / Start Review` / `开始冲刺 / Start Sprint` / `开始学习 / Start Learning`
- 病例分析 → `查看分析 / View Analysis` / `阅读全文 / Read More`
- 学术汇报 → `查看演示 / View Presentation` / `进入 / Enter`

### Step 5: 提 PR

```bash
git checkout -b add-<short-topic-name>
git add presentations.html presentations/your-file-name.html
git commit -m "Add <short description> to presentations

- File: presentations/your-file-name.html
- Topic: <学科 / 主题>
- Date: <YYYY-MM>"
git push origin add-<short-topic-name>
gh pr create \
  --repo HaozhiWangSDU/personal_website \
  --title "Add <short description> to presentations" \
  --body "## 内容简介
<1-2 句中文 + 1-2 句英文,说明这份网页是什么>

## 文件清单
- presentations/your-file-name.html (新增)
- presentations.html (修改,加新卡片)

## 来源
<用户 / 朋友 / 课程材料 / 自己的笔记 之类,简短说明>"
```

**Commit message 格式**:
- 第一行:`Add <一句话描述> to presentations` (英文,imperative mood)
- 空行
- 接下来 2-4 行 bullet,列文件 / 主题 / 日期

### Step 6: 把 PR 链接给用户

**绝对不要**自己 merge。给用户一个 GitHub PR URL,例如:
```
https://github.com/HaozhiWangSDU/personal_website/pull/123
```

告诉用户"PR 已开,等 Haozhi Wang review"。

### 防雷清单(常见错误)

1. ❌ **直接 push 到 main**:这是错的。**必须**开 PR。
2. ❌ **用中文文件名**:`人体4.html` → 在 Windows + Git + GitHub Pages 环境下可能乱码。**必须**用英文 kebab-case。
3. ❌ **忘记改 `presentations.html`**:用户做完网页看不到入口。
4. ❌ **改了 `index.html`**:这是主页,本次任务不要动。
5. ❌ **HTML 引用外部不可控资源**(CDN、远程图片 URL):网站是 GitHub Pages 静态托管,这些可能 CORS / 隐私问题。**本地化**或者**别引用**。
6. ❌ **覆盖现有文件**:`presentations/sectional-anatomy-review.html` 等已有文件不要改。
7. ❌ **忘记 UTF-8 声明**:中文会乱码。
8. ❌ **commit 信息含糊**:`update` / `add file` / `新增网页` → 不可接受。要用 `Add <具体描述> to presentations` 格式。
9. ❌ **AI 自己 push 到原作者 repo 的 main**:你是 PR,不是 collaborator。

### 需要外部凭据时

如果 `gh` CLI 没登录,需要用户提供:
- GitHub Personal Access Token(PAT,建议 fine-grained,只勾 `public_repo`)
- 或在本地 git config 配好 SSH key / credential helper

如果用户不知道怎么配,**告诉用户**到 `https://github.com/settings/tokens` 生成一个 fine-grained token(只授权 `HaozhiWangSDU/personal_website` 的 Contents: Read & Write),把 token 给你,**用完让用户立刻 revoke**。
