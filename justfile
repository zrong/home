set shell := ["bash", "-euo", "pipefail", "-c"]

remote_dir := "/srv/www/zengrong.net"
aid_url := "https://aid.zengrong.net"
aid_region := "1"
AID_TOKEN := `d=$(pwd); while [ "$d" != "/" ]; do f="$d/agent_config.toml"; [ -f "$f" ] && grep 'api_key' "$f" | sed 's/[^"]*"\([^"]*\)".*/\1/' && break; d=$(dirname "$d"); done`

dev:
    hugo server -D --port 1314 --baseURL http://localhost:1314/

build:
    hugo

deploy: build
    rsync -avz --delete public/ ubuntu@zengrong-net:{{remote_dir}}
    @echo "[OK] home 部署完成"

push-index:
    @echo "[*] 推送 home 索引到 aid (r={{aid_region}})..."
    curl -s -X POST "{{aid_url}}/api/search/rebuild?r={{aid_region}}" \
        -H "Authorization: Bearer {{AID_TOKEN}}" \
        -H "Content-Type: application/json" \
        -d @public/index.json
    @echo ""
    @echo "[OK] home 索引已更新"

deploy-all: deploy push-index
    @echo "[OK] home 部署 + 索引推送完成"
