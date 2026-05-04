#!/usr/bin/env bash
# 用法: AID_TOKEN=xxx bash tools/push_index.sh
set -e
AID_URL="https://aid.zengrong.net"
TOKEN="${AID_TOKEN:?请设置 AID_TOKEN 环境变量}"
echo "[*] 推送 home 索引到 aid..."
curl -s -X POST "${AID_URL}/ability/search/post" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d @public/index.json
echo ""
echo "[OK] home 索引已更新"
