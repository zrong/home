# home.zengrong.net — 开发文档

zengrong.net 主页。Hugo 静态站点。

## 常用命令

| 命令 | 说明 |
|------|------|
| `just dev` | 本地开发服务器 |
| `just build` | 构建静态文件 |
| `just deploy` | 构建 + rsync 部署到服务器 |
| `just push-index` | 推送搜索索引到 aid (需设置 AID_TOKEN) |
| `just deploy-all` | 部署 + 推送索引（一步完成）|

## Joplin 同步

生涯、关于和项目等 `.Content` 驱动的 Markdown 页面通过工作区 `.agents/skills/homesite/` 与 Joplin Home 笔记本双向同步。先读取该 skill 的 `SKILL.md` 和 frontmatter 约定，使用 `homesite status` / `sync --dry-run` 预检；首次迁移须明确同步方向。

```bash
uv run --project ../.agents/skills/homesite/scripts homesite status --page /career/
uv run --project ../.agents/skills/homesite/scripts homesite sync --page /career/ --dry-run
```

Home 不使用 Blog 的 postid 和 rspeak 页面模型。同步正文以 Markdown 为准，不把网页容器、段落、列表或样式 HTML 写入 Joplin；生涯标签使用 `layouts/shortcodes/tag.html`，图片统一使用标准 Markdown，`![alt](url)` 的方括号内容即图片 alt。

`homesite` 源码位于 `motoko/skills/homesite/`，工作区 `.agents/skills/homesite` 是注册链接。同步不自动部署或更新索引；涉及正文时核对 `lastmod`，发布后另行更新 regional `1` 索引。

## 环境变量

- `AID_TOKEN`: API token，用于推送搜索索引到 aid.zengrong.net

## 配置

- `config.toml` 中 `params.aidBase` 配置 aid 服务地址
- `params.aidRegion` 配置 regional 分区（默认 1）
- 开发环境自动切换到 `http://localhost:8000`（通过 `hugo.IsProduction` 检测）

## 本地测试

测试搜索功能需要先启动 aid 后端：

```bash
# 1. 启动 aid（端口 8000）
cd ../aid && just dev

# 2. 启动 home（端口 1314，避免与 blog 端口冲突）
just dev    # 自动从 localhost:8000 加载 aid API

# 3. 测试检查项
# - Cmd/Ctrl+K 打开搜索弹窗
# - 输入关键词 → 弹窗显示结果
# - "显示更多"链接 → 跳转 /search/ 搜索页
# - 搜索页自动搜索 + 无限滚动
# - 首页最新文章列表加载
# - 关于页留言板功能
# - DevTools Console 无报错
```

## 胡扯VIP

- `/vip/` 是独立功能页：`content/vip/index.md`、`layouts/vip/single.html`、`assets/css/vip.css` 和 `assets/js/vip.js`。页面不加入 Joplin/homesite 同步，不设置 `joplin_id`。`/vip/login-invalid/` 使用 `content/vip-login-invalid.md` 与 `layouts/vip/invalid.html`，直接显示失效原因和重新登录入口，不加载 VIP 业务脚本；它同时设置 `search_exclude` 和 `noindex,nofollow`。
- 主导航中「胡扯VIP」位于「BLOG」之后。页面通过 `search_exclude = true` 排除 `index.json`，但公开 HTML 和 sitemap 保留。
- 邮箱一次性链接、VIP 会话、用户授权、上传和受保护下载均由 aid 的 `/api/vip/*` 提供；Home 只调用 API，请求必须带 `credentials: 'include'`，不得在 HTML/JS 中保存 SMTP 秘密、长期令牌或私有文件路径。
- 资源说明按多行纯文本展示，CSS 必须保留换行。任何已登录状态都隐藏顶部介绍、三步流程和邮箱验证区；有效 VIP 直接显示账号栏与资源，待授权、停用、过期和未知状态只显示账号及必要的状态原因，不重复显示资源锁定教程。未登录时保留完整引导，底部隐私说明始终折叠保留。
- 联调需先启动 aid，再运行 Home；除 `just build` 外，还应运行 `node --check assets/js/vip.js` 并验证未登录、待授权、停用、过期、有效 VIP、下载和退出流程，以及暗色和 320/390px 布局。
- aid 与 Home 分别部署；Home 发布不需要把 VIP 页面推入搜索索引。

## 部署

```bash
# 完整部署 + 索引推送
just deploy-all

# 仅部署（不更新索引）
just deploy

# 仅推送索引
just push-index
```
