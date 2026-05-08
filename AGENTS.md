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

## 部署

```bash
# 完整部署 + 索引推送
just deploy-all

# 仅部署（不更新索引）
just deploy

# 仅推送索引
just push-index
```
