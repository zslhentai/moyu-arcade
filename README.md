# 摸鱼游戏厅 · Moyu Arcade

支持手机与电脑的 Modern Retro Arcade 小游戏网站。React + TypeScript + Vite + Tailwind CSS + React Router；无账号、无后端，原创 CSS 游戏封面。

## 本地开发

Node.js 22.12+（推荐 Node 22 LTS）：

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

手机与电脑处于同一网络时，打开终端中显示的 Network 地址。

## 功能

- 首页：导航、Hero、热门游戏、益智/街机筛选、随机游戏、更新日志、页脚。
- 游戏模板：懒加载、重开、全屏（不支持原生全屏时使用页面沉浸模式）、操作说明、推荐游戏。
- 扫雷：9×9 / 10雷、首步周围安全、展开空白、右键/触控插旗、计时、累计胜场。
- 贪吃蛇：16×16、方向键/WASD/滑动/方向按钮、暂停、碰撞、随分数加速；页面隐藏时暂停。
- 2048：方向键/WASD/滑动/方向按钮、正确单次合并、计分、终局检测、2048后继续。
- 本地记录：版本化 localStorage，读写失败提示；当前对局不持久化。

## Pages 部署

仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。推送 main 后工作流运行测试、构建、上传并部署；PR 只检查构建。

期望地址：https://zslhentai.github.io/moyu-arcade/ （只有 Pages 工作流成功后才是已部署地址。）

`vite.config.ts` 使用 Actions 的 GITHUB_REPOSITORY 推导 `/moyu-arcade/`；用户站点仓库使用 `/`。自定义域名可配置工作流环境变量 `VITE_BASE_PATH=/`。不要在资源引用中手写仓库路径。

使用 HashRouter，游戏地址例如 `/moyu-arcade/#/game/snake`。刷新时服务器只需返回根 index.html，无需 Pages 不支持的 history fallback。

## 项目结构与扩展

```text
src/
  components/        通用卡片、方向控制
  games/catalog.ts   游戏注册和懒加载
  games/<id>/        Game.tsx + engine.ts
  lib/               存储与纪录 hook
  App.tsx            首页、统一游戏页、路由
  styles.css         Tailwind 主题与响应式设计组件
 tests/              游戏规则与存储测试
 .github/workflows/  自动测试部署
```

接入太空弹珠：新增 `src/games/pinball/Game.tsx` 与独立引擎，在 catalog 添加元数据和 lazy import，并在 Cover 添加原创程序封面。游戏容器卸载时销毁画布、动画帧、音频和监听器。无需修改路由与页面模板。

设计令牌：背景 #0B1020、卡片 #1A2238、青色 #57D6FF、紫色 #9B7BFF、黄色 #FFD166；内容最大宽1180px；圆角10–16px；常规按钮至少44px；适度动效并尊重 prefers-reduced-motion。扫雷格子为密集棋盘，在390px宽度约32px，以独立插旗按钮避免依赖长按。

## 验证

单元测试覆盖合并/方向/终局、扫雷首步/洪泛/边界/胜负、贪吃蛇增长/碰撞/食物、存储异常。执行 `npm test` 和 `npm run build`。

验收尺寸：390×844、1280×800、1440×900。验收时检查无横向溢出、三款游戏实际输入、重开、分类/随机、全屏、记录恢复和游戏地址刷新。

本次环境缺少受支持的浏览器验收工具，尚未完成真实浏览器截图与触控验收；响应式断点和棋盘宽度已在代码中处理，这不等同于通过浏览器验收。

P0 不含排行榜、账号、评论后端；太空弹珠为未来独立模块，尚未实现。
