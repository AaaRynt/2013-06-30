# AGENTS.md

## 1. 项目身份

本项目是一个严格停留在 `2013-06-30` 的中文综合门户网站首页。

它不是现代网站套用复古皮肤，也不是对旧互联网的夸张戏仿。所有技术选择、DOM 结构、布局方式、视觉语言和交互表现，都必须符合 `2013-06-30` 或更早时期中国门户网站的常见开发实践。

站点设定为：页面模板和主要视觉结构约形成于 `2008–2010` 年，之后持续维护并更新内容至 `2013-06-30`。因此允许脚本库在后期升级，但页面不得呈现 Twitter Bootstrap、现代组件库或统一设计系统的视觉痕迹。

目标环境：

- Windows XP | Windows 7
- Internet Explorer 8
- 360 安全浏览器兼容模式
- 360 安全浏览器极速模式作为次要兼容环境
- 屏幕分辨率以 `1024×768` 和 `1366×768` 为主
- 鼠标和键盘操作
- 桌面端固定宽度页面
- 简体中文用户

核心验收原则：

> 页面必须能够被误认为是一个在 2013 年 6 月 30 日仍然正常运营的中文门户网站，而不是现代开发者制作的“复古风作品”。

## 2. 当前目录结构

仓库当前结构如下：

```text
.
├── .gitignore
├── .prettierrc
├── .vscode/
│   └── settings.json
├── AGENTS.md
├── data/
│   ├── china.js
│   ├── fe-dev.js
│   ├── forum.js
│   ├── games.js
│   ├── gaokao.js
│   ├── graduation.js
│   ├── party.js
│   ├── questions.js
│   ├── tech.js
│   └── world.js
├── layout.md
├── prompts.md
├── README.md
├── temp/
├── todo.md
└── website/
    ├── assets/
    │   └── adv.jpg
    ├── css/
    ├── index.html
    └── js/
        ├── jquery-1.10.1.js
        └── jquery-1.10.1.min.js
```

必须尊重现有目录，不得擅自迁移 `data/`、重命名数据文件或创建现代工程目录。

`website/index.html` 引用数据时，应使用相对路径：

```html
<script type="text/javascript" src="../data/china.js"></script>
```

所有数据文件必须在业务脚本之前加载。

## 3. 时间边界

项目的技术、视觉和文案时间固定为：

`2013-06-30`

**禁止**使用在该日期之后才发布、普及或成为主流的技术和设计语言。

代码不得采用“后来虽然出现，但今天看起来更方便”的方案。

判断技术是否允许时，不只看“当时是否已经存在”，还要看它是否符合一个从 `2008–2010` 年持续维护至 `2013` 年的中文门户网站。

## 4. 技术栈白名单

### 4.1 HTML

使用：

```html
<!DOCTYPE html>
```

页面必须进入 IE8 Standards Mode。

每个 HTML 文件的 `<head>` 开头必须包含：

```html
<meta http-equiv="X-UA-Compatible" content="IE=8" /> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
```

`X-UA-Compatible` 必须尽可能靠近 `<head>` 开头。

允许使用普通 `div`、`span`、`p`、`a`、`img`、`table`、`ul`、`ol`、`li`、`form`、`input`、`button`、`select`、`textarea`、`h1` 至 `h6`、HTML 注释、IE 条件注释，以及局部 `marquee`。

**禁止**将以下元素作为主要页面结构：

- `header`
- `nav`
- `main`
- `section`
- `article`
- `aside`
- `footer`
- `figure`
- `template`
- 自定义元素
- Web Components

页面主体应由普通 `div`、`table` 和 `ul` 组成。

### 4.2 CSS

允许：

- CSS 2.1
- IE 专有 `filter` 与 `-ms-filter`
- IE 条件样式表
- 背景图片切片
- PNG、JPG、GIF
- CSS Sprite
- `float`、`clear`
- `display: block`、`inline`、`inline-block`
- `position: relative`、`absolute`
- `zoom: 1`
- `hasLayout` 时代兼容修复
- 固定像素宽度和高度
- 少量可在 IE8 中自然降级的 CSS3

**禁止**：

- Flexbox
- CSS Grid
- CSS Variables
- `calc()`、`clamp()`、`min()`、`max()`
- `gap`
- `aspect-ratio`
- `object-fit`
- `position: sticky`
- CSS Modules
- CSS-in-JS
- PostCSS
- Autoprefixer
- Sass
- Less
- Stylus
- Tailwind CSS
- 现代容器查询
- 现代逻辑属性
- 毛玻璃
- 混合模式
- 现代滤镜
- 以 CSS 动画关键帧为主要交互手段

不得依赖标准 `box-shadow`、`border-radius`、`linear-gradient` 在 IE8 中工作。

如需渐变，优先级如下：

1. 小尺寸背景图片或切片；
2. IE `filter` / `-ms-filter`；
3. 纯色降级。

```css
.module-title {
	background-color: #2f68a4;
	filter: progid:DXImageTransform.Microsoft.gradient(
        startColorstr='#5f98d1',
        endColorstr='#245b94',
        GradientType=0
    );
}
```

如需阴影，优先使用深浅边框、额外包装元素、阴影背景图片或谨慎使用 IE `DropShadow`。

### 4.3 JavaScript

语言版本：

- ECMAScript 5
- 只使用 IE8 能解析和稳定运行的语法与 API

固定依赖：

```text
jQuery 1.10.1
```

项目已存在：

```text
website/js/jquery-1.10.1.js
website/js/jquery-1.10.1.min.js
```

开发阶段优先引用未压缩版：

```html
<script type="text/javascript" src="js/jquery-1.10.1.js"></script>
```

不允许升级、替换或从 CDN 加载 jQuery。

允许：`var`、普通函数、函数表达式、`setTimeout`、`setInterval`、字符串拼接、普通数组和对象、jQuery DOM 查询、jQuery 事件绑定、jQuery 动画、`window.PORTAL_DATA`、`document.cookie`、`window.location`、`window.external`。

**禁止**：

- `let`、`const`
- 箭头函数
- `class`
- 模板字符串
- 解构
- 展开语法
- 默认参数
- Promise
- async / await
- Generator
- Symbol、Map、Set、Proxy
- import / export
- ES Modules
- CommonJS
- JSX
- TypeScript
- Babel
- `fetch`
- WebSocket
- Service Worker
- Web Worker
- Node.js 浏览器端 API
- `localStorage` 作为关键功能依赖
- 未做兼容处理的 `Array.prototype.forEach`、`map`、`filter`、`indexOf`

所有数组和对象最后一项**禁止**尾随逗号。

正确：

```js
var items = [
	{
		id: "news-001",
		title: "示例标题"
	},
	{
		id: "news-002",
		title: "示例标题"
	}
];
```

错误：

```js
var items = [
	{
		id: "news-001",
		title: "示例标题"
	}
];
```

### 4.4 UI 框架

本项目明确不使用 Bootstrap 或其他通用 UI 框架。

虽然 Bootstrap 2.3.2 在时间线上符合 `2013` 年，但本网站设定为一个从 `2008–2010` 年延续维护至 `2013` 年的中文门户站。其页面模板、组件和视觉样式应为自建系统，不应出现明显的 Twitter Bootstrap 统一组件风格。

所有以下内容均必须自行实现：页面布局、导航、按钮、表单、搜索框、标签、提示框、登录弹窗、遮罩层、分页、折叠展开、广告轮播、焦点图轮播、返回顶部。

**禁止**引用任何 Bootstrap CSS 或 JavaScript。

### 4.5 工程工具

项目没有构建步骤。

**禁止**：npm、pnpm、yarn、Vite、Webpack、Parcel、Rollup、Gulp、Grunt、Babel、TypeScript 编译器、React、Vue、Angular、Svelte、Next.js、Nuxt、Astro、现代组件库和现代图标库。

运行方式：直接打开 `website/index.html`，或使用任意简单静态文件服务器。项目不得依赖 Node.js 才能运行。

## 5. 浏览器与兼容目标

强制目标：

- Internet Explorer 8 Standards Mode
- 360 安全浏览器兼容模式

必须保证页面可加载、文字可读、固定宽度布局不坍塌、导航可点击、自定义弹窗可用、广告轮播可用、新闻展开收起可用、假登录提示可用、返回顶部可用。

现代 Chrome 只作为预览工具，不是设计基准。

必须设置：

```html
<meta http-equiv="X-UA-Compatible" content="IE=8" />
```

**禁止**使用 `IE=edge`，**禁止**依赖 Quirks Mode。

## 6. 页面尺寸与总体布局

主页面固定宽度 `1000px`，允许范围 `980px–1000px`。

```css
#page {
	width: 1000px;
	margin: 0 auto;
}
```

主体结构：顶部工具条、浏览器提示、Logo 与广告、主导航、建党节专题、站内搜索和滚动快讯、三栏主体、下半部资讯区、社区与问答、友情链接、页脚、返回顶部。

三栏建议：左栏 `240px`，中栏 `480px`，右栏 `260px`，栏间距 `10px`。必须计算边框和内边距，确保总宽不超过 `1000px`。

布局必须组合使用：

- `table`
- `ul`
- `float`
- 普通块级元素

所有 float 容器必须使用旧式 clearfix：

```css
.clearfix {
	zoom: 1;
}

.clearfix:after {
	display: block;
	clear: both;
	height: 0;
	visibility: hidden;
	content: ".";
}
```

## 7. 视觉风格

风格关键词：

- 2008–2010 年形成的中文门户模板
- 2013 年仍在维护
- Web 2.0
- 后拟物
- 桌面软件感
- 信息密集
- 模块拼接
- 高饱和度点缀
- 蓝色主导航
- 红色政治专题
- 橙黄色提醒和广告
- 灰白内容背景
- 多层边框
- 高光和凹凸感
- 小字号
- 低分辨率位图资源

允许模块风格不完全统一、广告与正文视觉冲突、空白较少、边框较多和少量补丁式视觉痕迹，但不得故意做成无法阅读的恶搞页面。

主色：

```text
深蓝：#245b91
中蓝：#367bb9
浅蓝：#dcecf8
链接蓝：#0645ad
深红：#a40000
中红：#d21717
金色：#e6b534
浅黄背景：#fff8d8
```

字体：

```css
font-family: Arial, "宋体", SimSun, sans-serif;
```

Logo、导航和少量主标题可使用“微软雅黑”。普通新闻 `12px–13px`，模块标题 `13px–14px`，栏目头条 `16px–20px`。

模块边界主要依靠 1px 边框、双层边框、标题栏背景、深浅分隔线、背景切片和轻微凹凸感，不得依赖现代卡片与留白。

默认不使用圆角，不引入圆角 polyfill。

图标必须少，只允许 GIF、PNG、JPG、CSS Sprite 和 `· » ◆ ■ ▶ [图] [荐] [热]` 等字符。**禁止** SVG 图标体系、Font Awesome、Lucide、Material Icons 和 Emoji 图标。

## 8. 页面模块要求

### 8.1 顶部工具条

左侧：设为首页、加入收藏、手机访问、RSS 订阅、官方微博。

右侧：`2013年06月30日 星期日 HH:mm:ss`、在线人数。

日期固定，只让时分秒读取本地当前时间。在线人数为伪数据，不发起网络请求。

### 8.2 浏览器提示

必须显示：

```text
推荐使用360安全浏览器兼容模式或Internet Explorer 8访问本站，以获得最佳浏览效果。
```

使用浅黄色背景、橙黄色边框和文字感叹号或小 GIF。

### 8.3 Logo 与广告横幅

Logo 区域高度 `80px–100px`，包含中文站名、英文缩写或拼音、小型口号和高饱和度颜色。

广告图片统一使用：

```text
website/assets/adv.jpg
```

页面内部引用 `assets/adv.jpg`。预留数字切换按钮 `1 2 3 4`，不使用现代圆点。

### 8.4 主导航

栏目：

```text
首页 中国 国际 科技 游戏 开发者 高考 毕业季 夏日生活 社区 问答
```

必须使用 `ul + li + float`，主导航为蓝色渐变条。

### 8.5 建党节置顶专题

位于主导航之后、主要新闻区域之前，主题为：

```text
庆祝中国共产党成立92周年
```

使用红色和金色，横跨页面主要宽度，显示 `3–4` 条正式标题，视觉显眼但数据关注度低于游戏、科技和高考栏目。

### 8.6 搜索和滚动快讯

搜索包含频道下拉、关键词输入、“搜索”按钮、“高级搜索”和热门关键词。

滚动快讯可使用 jQuery 定时切换、`marquee` 或单行 `ul` 轮换。

### 8.7 正式新闻栏目

每个栏目默认展示前 `10` 条，第一条可做头条，其余使用 `ul`。每条显示 `MM/DD`。点击“更多>>”展开剩余数据。点击新闻不展示正文，而进入统一登录提示。

### 8.8 社区和问答

论坛每次显示 `8–12` 条，问题每次显示 `6–10` 条，提供“换一批”或“刷新看看”文字按钮。

### 8.9 登录与访问限制

登录区放在右栏，使用表格布局，包含用户名、密码、验证码占位、记住登录、登录、注册、忘记密码。

所有标题点击后打开自定义旧式遮罩和弹窗：

```text
请先登录后查看全文。
```

登录提交：

```text
用户系统维护中，暂时无法登录。
```

注册：

```text
注册系统维护中，暂未开放新用户注册。
```

忘记密码：

```text
密码找回功能正在升级，请联系网站管理员。
```

**禁止**使用浏览器原生 `alert()` 作为最终弹窗样式。

### 8.10 设为首页、加入收藏、手机访问、RSS 和微博

“设为首页”和“加入收藏”可以尝试旧 IE 专有接口，失败时显示手动操作提示。“手机访问”“RSS”“微博”只显示建设中或维护提示，不访问真实外部页面。

### 8.11 返回顶部

使用文字 `↑ 返回顶部` 或小型位图按钮。**禁止**圆形悬浮按钮、SVG 箭头、Material FAB 和现代平滑滚动 API。

## 9. 数据加载约束

现有数据文件位于仓库根目录 `data/`。

加载顺序：

1. jQuery；
2. 所有数据文件；
3. 网站业务脚本。

```html
<script type="text/javascript" src="js/jquery-1.10.1.js"></script>
<script type="text/javascript" src="../data/china.js"></script>
<script type="text/javascript" src="../data/world.js"></script>
<script type="text/javascript" src="../data/tech.js"></script>
<script type="text/javascript" src="../data/games.js"></script>
<script type="text/javascript" src="../data/fe-dev.js"></script>
<script type="text/javascript" src="../data/gaokao.js"></script>
<script type="text/javascript" src="../data/graduation.js"></script>
<script type="text/javascript" src="../data/party.js"></script>
<script type="text/javascript" src="../data/forum.js"></script>
<script type="text/javascript" src="../data/questions.js"></script>
<script type="text/javascript" src="js/main.js"></script>
```

不得使用 `fetch`、`XMLHttpRequest`、`$.ajax`、JSONP、外部 API、动态模块加载或服务端接口。

业务代码必须容忍单个数据文件缺失或数组为空，不能因此导致整页脚本中断。

## 10. 资源要求

所有运行时资源必须来自：

```text
website/css/
website/js/
website/assets/
../data/
```

**禁止** CDN、Google Fonts、在线图床、外部 API、动态图片服务、第三方统计脚本、真实微博接口和真实 RSS 服务。

图片缺失时保留旧式图片占位区域，不得使用现代 skeleton。

## 11. 明确**禁止**的现代审美

以下特征一旦出现，应视为实现失败：

- 大面积留白
- 超大字号 Hero
- 单列信息流
- 卡片瀑布流
- 现代 SaaS Dashboard
- 极简 Logo
- Material Design
- Fluent Design
- iOS 风格
- Bootstrap 风格
- 扁平化纯色大按钮
- 毛玻璃
- 莫兰迪配色
- 大圆角
- 统一线性 SVG 图标
- 现代 Toast
- Drawer
- Sheet
- Skeleton
- 无限滚动
- 响应式移动优先
- 深色模式
- 现代精致微交互
- 现代无边框输入框
- 设计令牌系统
- 现代组件化视觉语言

## 12. 代码风格

HTML、CSS 和 JavaScript 应体现传统静态门户项目风格。

允许较大的 `index.html`、全局 CSS 类、全局变量、全局命名空间、jQuery 插件式代码和多个 `<script>` 数据文件。

JavaScript 推荐：

```js
(function ($) {
	// ES5 code
})(jQuery);
```

变量使用 `camelCase`，CSS 类名使用 `portal-header`、`news-list`、`side-login`、`party-special` 这类普通短横线命名。

不得使用 CSS Modules、BEM 过度工程化、原子 CSS、Tailwind 类、自动生成类名和 React 风格组件命名。

## 13. 第一阶段任务边界

第一阶段只负责：

1. 保留现有目录结构；
2. 使用现有本地 jQuery 1.10.1；
3. 创建或完善 `website/index.html`；
4. 创建 `website/css/site.css`；
5. 创建 `website/css/ie8.css`；
6. 创建 `website/js/main.js`；
7. 完成静态页面骨架；
8. 完成顶部工具条；
9. 完成兼容提示；
10. 完成 Logo 和广告位置；
11. 完成主导航；
12. 完成建党节专题位置；
13. 完成搜索和滚动快讯占位；
14. 完成三栏主体静态布局；
15. 完成登录区静态表单；
16. 完成页脚；
17. 引入已有数据文件，但暂不完成所有栏目数据渲染；
18. 确保页面无构建工具即可打开。

第一阶段不得：

- 引入 Bootstrap
- 编写完整数据渲染逻辑
- 编写随机刷新
- 编写完整登录交互
- 编写广告轮播
- 编写焦点图轮播
- 编写“更多”展开
- 引入后端
- 引入网络请求
- 擅自移动 `data/`
- 擅自创建现代组件
- 擅自升级 jQuery

## 14. 第一阶段验收标准

- [ ] 使用本地 jQuery 1.10.1
- [ ] 未引用 Bootstrap
- [ ] 未使用 npm、Vite 或其他构建工具
- [ ] 未使用 ES6 及以上语法
- [ ] 未使用 Flexbox
- [ ] 未使用 CSS Grid
- [ ] 未使用 SVG 图标库
- [ ] 未使用现代字体
- [ ] 未使用 CDN
- [ ] 已设置 `X-UA-Compatible: IE=8`
- [ ] 主页面固定宽度约 `1000px`
- [ ] 页面在 `1024×768` 下不产生主体横向溢出
- [ ] 页面组合使用 table、ul 和 float
- [ ] 主导航为蓝色渐变
- [ ] 建党节专题为红色置顶模块
- [ ] 页面边框和模块标题明显
- [ ] 页面信息密度符合旧中文门户
- [ ] 页面没有现代卡片化和移动优先特征
- [ ] IE8 不支持的效果已有图片、filter 或纯色降级
- [ ] 所有图片、脚本、样式和数据均从本地加载
- [ ] 页面无真实登录、鉴权、后端或网络请求
- [ ] 页面看起来像从 2008–2010 年延续维护至 2013 年的真实门户，而不是现代复古主题

任何一项不满足，都不得宣布第一阶段完成。

---

---

# 第二阶段任务：数据驱动化与门户交互实现

你现在继续开发当前 2013-06-30 中文门户网站项目。

第一阶段已经完成：

- 固定宽度 1000px 门户首页
- IE8 兼容 HTML/CSS
- jQuery 1.10.1
- 旧式 table / ul / float 布局
- 首页静态视觉

当前问题：

首页所有新闻标题、社区帖子、问答内容仍然硬编码在 website/index.html 中。

你的任务：

将首页改造成“静态 CMS 模拟系统”。

不要重新设计页面。
不要改变现有视觉风格。
不要引入现代技术。

## 当前技术约束（必须保持）

浏览器：

- Internet Explorer 8
- 360 浏览器兼容模式

必须使用：

- ES5 JavaScript
- jQuery 1.10.1
- 原生 DOM
- HTML4/HTML5兼容写法

禁止：

- React
- Vue
- Angular
- Bootstrap
- RequireJS
- webpack
- npm构建
- fetch
- Promise
- async/await
- JSON模块导入
- ES6语法

继续使用：

```javascript
window.PORTAL_DATA = window.PORTAL_DATA || {};
```

的数据形式。

## 一、数据来源改造

所有资讯必须来自：

```
/data
```

目录。

已有：

```
china.js
world.js
tech.js
games.js
fe-dev.js
gaokao.js
graduation.js
party.js
forum.js
questions.js
```

禁止继续在 HTML 中写新闻标题。

index.html 只保留：

- 模块容器
- class
- id

例如：

原：

```html
<ul>
	<li>新闻标题</li>
</ul>
```

改成：

```html
<ul id="china-news-list"></ul>
```

由 JS 填充。

## 二、创建数据渲染层

新增：

```
website/js/render.js
```

负责：

- 新闻列表生成
- 日期生成
- 热度显示
- 分类标签

例如：

```javascript
renderNewsList("#china-news-list", PORTAL_DATA.china, 7);
```

前三个参数：

1. DOM选择器
2. 数据数组
3. 初始展示数量

## 三、新闻模块逻辑

所有新闻频道：

中国：

```
china
```

国际：

```
world
```

科技：

```
tech
```

游戏：

```
games
```

开发者：

```
fe-dev
```

高考：

```
gaokao
```

毕业：

```
graduation
```

夏日：

如果不存在数据，可暂时复用生活类。

默认首页：

显示：

7-10条。

点击：

```
更多>>
```

第一次：

展开剩余内容。

第二次：

弹出登录提示。

效果：

游客：

```
您正在浏览摘要内容

登录后可查看全部文章
```

按钮：

```
登录
注册
```

注册按钮显示：

```
注册系统维护中，暂未开放
```

模拟2013门户会员机制。

## 四、文章点击行为

所有新闻标题：

不要跳转。

点击：

打开登录弹窗。

提示：

```
该文章需要登录后阅读全文

华夏资讯网会员系统正在升级维护
```

这是模拟早期门户网站。

## 五、创建统一弹窗

新增：

```
website/js/modal.js
```

实现：

- 登录提示
- 注册维护
- 文章限制

不要使用现代 modal。

使用：

```css
position:absolute;
border;
background:#ffffff;
box-shadow
```

模拟2013网页弹窗。

## 六、社区模块

数据：

```
PORTAL_DATA.forum
```

当前已有数百条。

首页显示：

8条。

增加：

```
换一批
```

按钮。

点击：

随机抽取8条。

每条显示：

标题

用户名

回复数

浏览数

格式：

```
不是我地图炮，为什么大学生都喜欢买苹果

网友：蓝色星球
浏览：1234 回复：56
```

保持2013论坛风格。

不要显示现代：

- 点赞
- 收藏
- 关注
- 热榜算法

## 七、问答模块

数据：

```
PORTAL_DATA.questions
```

首页显示：

5条。

增加：

```
刷新看看
```

随机刷新。

显示：

标题

回答数量

浏览数量

不要模拟现代知乎。

使用：

```
回答：
浏览：
关注：
```

这样的早期问答社区风格。

## 八、导航栏行为

当前：

```html
首页 中国 国际 科技 游戏 开发者...
```

全部：

```
href="#"
```

改成：

首页：

滚动顶部。

新闻频道：

点击后：

弹出：

```
频道页面正在建设中

登录后可以访问完整频道
```

不要生成大量 html 页面。

但是：

社区：

允许打开：

```
forum.html
```

问答：

允许打开：

```
questions.html
```

后续制作。

## 九、右侧排行榜

当前：

新闻点击排行

也是硬编码。

改成：

根据新闻数据随机生成。

显示：

```
1
2
3
4
5
```

数字样式保持门户风格。

## 十、广告轮播准备

目前不要真实图片切换。

只实现：

点击：

```
1 2 3 4
```

切换广告标题。

使用：

jQuery fadeIn/fadeOut。

保持：

2013年网页广告轮播感觉。

## 十一、文件结构调整

最终：

```
website/
 ├── index.html
 ├── css/
 │   ├── site.css
 │   └── ie8.css
 └── js/
     ├── jquery-1.10.1.js
     ├── render.js
     ├── modal.js
     ├── random.js
     └── main.js
```

script 顺序：

必须：

```html
jquery data/*.js render.js modal.js random.js main.js
```

## 十二、验收标准

完成后：

打开首页：

应该看到：

1. 新闻标题来自 data 文件
2. 刷新页面内容仍正常
3. 点击更多可以展开
4. 再点击出现登录限制
5. 社区可以随机刷新
6. 问答可以随机刷新
7. 所有交互 IE8 可运行
8. 没有 ES6
9. 没有现代框架
10. 页面视觉保持2013门户

不要优化设计。

不要美化。

目标：

像一个2013年真实存在的网站经过后台升级后的状态。
