+++
title = "DoomUI"
description = "连接 Figma 与 Cocos Creator 的开源 UI 工具链：兼容 >=3.8.6 <3.9.0，手动推送设计，预览变更，持续更新视觉 Prefab。"
date = 2026-10-17T00:00:00+08:00
lastmod = 2026-10-20T12:25:41+08:00
weight = 1

[menu.main]
  parent = "projects"
  weight = 1
+++

DoomUI 是一套连接 Figma 与 Cocos Creator 的开源 UI 工具链。设计师在 Figma 中调整界面，手动推送所选设计；程序员在 Cocos 中预览变更，确认后生成或更新 Prefab，让设计迭代进入游戏工程。 详细介绍见[《美术切图，程序重拼：游戏 UI 同步的苦，能靠 AI 解决吗？》](https://blog.zengrong.net/post/figma-cocos-ui-sync-doomui/)。

兼容范围：Cocos Creator `>=3.8.6 <3.9.0`。当前已在 macOS + Figma Desktop + Creator 3.8.6 完成运行态验证，范围内其他补丁版本尚未逐一验收。

[DoomUI 官方网站](https://zengrong.net/project/doomui/) · [GitHub 源码](https://github.com/zrong/doomui)

源码采用 [MIT 许可证](https://github.com/zrong/doomui/blob/master/LICENSE)开放。

## 两个插件，一条工作流

DoomUI 由两个配套插件组成，需要在同一台电脑上运行：

| 插件 | 运行环境 | 主要用途 |
| --- | --- | --- |
| **Cocos Sync** | Figma Desktop | 推送所选 Frame / Component，导入现有 Cocos Prefab 与共享素材 |
| **Figma Sync** | Cocos Creator `>=3.8.6 <3.9.0` | 接收设计、预览差异、应用变更，生成 Prefab 和贴图 |

日常操作分为四步：

1. 在 Cocos 中打开「扩展 → DoomUI → Figma Sync」，与 Figma Desktop 中的 Cocos Sync 配对。
2. 在 Figma 画布中明确选择一个或多个 Frame，或 Page 直属的 Component，手动推送到 Cocos。
3. 在 Cocos 的 **Preview** 中检查差异、警告和阻断项。
4. 确认后执行 **Apply**，写入视觉 Prefab 及所需资源。

## 设计与程序如何协作

**视觉和逻辑分开维护。** 首次同步创建视觉 Prefab 与逻辑 Prefab，程序员在逻辑 Prefab 中维护业务脚本和交互。之后的同步只更新插件拥有的视觉 Prefab 与依赖资源，保留程序逻辑。

**从已有界面开始。** 可以把现有 Cocos View / Item Prefab 一次性导入 Figma，建立设计起点。后续迭代统一从 Figma 推送到 Cocos。

**复用共享素材。** 没有关联 Prefab 的 SpriteFrame 也能导入 Figma 的 Shared Assets Catalog。设计师使用这些素材搭建界面，回传时插件会校验来源，条件满足时直接复用 Cocos 中的原始资源。

**尽量保留可编辑语义。** 文字、图片、组件实例、按钮状态和九宫格按制作规范转换；布局与约束在支持的范围内映射为 Cocos 组件，复杂视觉效果可能转为 PNG。具体规则见 [Figma UI 制作规范](https://github.com/zrong/doomui/blob/master/docs/figma-authoring-guide.md)。

**在本机传输。** 所选设计与所需图片通过配对连接传给同机 Cocos 扩展，插件不向公网服务器上传设计内容，也不包含分析或广告服务。

## 获取与安装

- [GitHub 开源仓库](https://github.com/zrong/doomui)：源码、安装说明、最小验收工程与完整文档。
- [Figma Community · Cocos Sync](https://www.figma.com/community/plugin/1675173114763421112/cocos-sync)：Figma 端插件。
- [Cocos Store · Figma Sync](https://store.cocos.com/app/detail/9750)：Creator 端插件。

截至 **2026 年 10 月 20 日**，Cocos 端的 **Figma Sync 已通过审核并上架**，可从 [Cocos 商城免费获取](https://store.cocos.com/app/detail/9750)，在 Creator 的「扩展 → 扩展管理器」中导入安装包并启用。Figma 端的 Cocos Sync 仍在 Community 审核中，可按 [开发指南](https://github.com/zrong/doomui/blob/master/docs/development.md)导入开发插件。

当前面向 macOS + Figma Desktop，Creator 兼容范围为 `>=3.8.6 <3.9.0`。源码安装还需要 Node.js 18+，推荐使用 `just` 运行仓库命令：

```bash
git clone https://github.com/zrong/doomui.git
cd doomui
just install
just check
just sandbox-link
```

然后用 Creator 3.8.6 打开仓库中的 `sandbox/`，直接运行 `assets/ArticleDemo.scene` 可体验按钮逻辑与九宫格。在 Figma Desktop 中通过「Plugins → Development → Import plugin from manifest…」导入 `cocos-sync/manifest.json`，按开发指南完成配对与首次同步。重新走同步流程时使用独立输出 Bundle，详见 [Sandbox 说明](https://github.com/zrong/doomui/blob/master/sandbox/README.md)。

## 使用范围

DoomUI 使用手动推送，不自动监听设计修改，也不会自动执行 Apply。现有 Prefab 导入 Figma 是一次性的设计接管，后续保持 Figma → Cocos 单向同步；不支持两端修改的自动合并，也不直接处理 PSD。

Toggle、ScrollView、ProgressBar、RichText 等业务组件目前没有专用转换，需由程序员在逻辑层维护。Figma 网页版、Windows，以及兼容范围内除 Creator 3.8.6 之外的补丁版本尚未完成运行态验收。完整限制与运行态验证情况见 [验收记录](https://github.com/zrong/doomui/blob/master/docs/acceptance.md)。

## 文档与反馈

- [文档索引](https://github.com/zrong/doomui/blob/master/docs/README.md)
- [安装与开发指南](https://github.com/zrong/doomui/blob/master/docs/development.md)
- [Figma UI 制作规范](https://github.com/zrong/doomui/blob/master/docs/figma-authoring-guide.md)
- [GitHub Issues：问题反馈与功能建议](https://github.com/zrong/doomui/issues)
