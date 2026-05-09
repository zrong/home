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
# - 输入关键词 → 显示结果
# - 首页最新文章列表加载
# - 关于页留言板功能
# - DevTools Console 无报错
```

## 部署

```bash
# 完整部署 + 索引推送
just deploy-all

# 仅部署（不更新索引）
just deploy

# 仅推送索引
just push-index
```
