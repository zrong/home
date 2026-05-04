# home

> [zengrong.net](https://zengrong.net) — 曾嵘的个人主页（Hugo）

## 构建与部署

需要 Hugo Extended >= 0.158.0。

```bash
# 本地预览
hugo server

# 构建
hugo

# 构建并部署
make deploy
# 等价于：
# hugo && rsync -avz --delete public/ ubuntu@zengrong-net:/srv/www/zengrong.net
```

更新 aid 搜索索引（部署后可选）：

```bash
AID_TOKEN=<your-token> bash tools/push_index.sh
```

## [zengrong.net](https://zengrong.net) 的历史

### 2026 年 5 月

从 VuePress 1.x 迁移到 Hugo Extended。原 VuePress 源码保留在 `vuepress1` 分支。

- 移除 Buefy / Bulma CSS 框架，改用纯 CSS + CSS 变量实现明暗双色模式
- 搜索功能通过 aid.zengrong.net FTS5 接口实现，支持与博客内容统一搜索
- 生涯页的 Carousel 改为静态列表
- 阅读数据从 Markdown 表格转换为 TOML 数据文件（`data/reading/`）

### 早期

基于 VuePress 1.x 构建，使用自定义主题 + Buefy（Bulma Vue 封装）。
