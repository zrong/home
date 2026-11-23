set shell := ["bash", "-euo", "pipefail", "-c"]

remote_dir := "/srv/www/zengrong.net"
aid_url := "https://aid.zengrong.net"
aid_region := "1"

dev:
    hugo server -D --port 1314 --baseURL http://localhost:1314/

build:
    hugo

deploy: build
    rsync -avz --delete public/ ubuntu@zengrong-net:{{remote_dir}}
    @echo "[OK] home 部署完成"

push-index:
    #!/usr/bin/env bash
    set -euo pipefail

    if [ ! -f public/index.json ]; then
        echo "[ERR] 找不到 public/index.json，请先运行 just build" >&2
        exit 1
    fi

    extract_aid_token() {
        local file="$1"
        awk '
            BEGIN { in_aid = 0; key = ""; env_name = "" }
            /^[[:space:]]*\[/ {
                in_aid = ($0 ~ /^[[:space:]]*\[aid\][[:space:]]*(#.*)?$/)
                next
            }
            in_aid && /^[[:space:]]*api_key[[:space:]]*=/ {
                line = $0
                sub(/^[[:space:]]*api_key[[:space:]]*=[[:space:]]*"/, "", line)
                sub(/".*$/, "", line)
                if (line != "") key = line
            }
            in_aid && /^[[:space:]]*api_key_env[[:space:]]*=/ {
                line = $0
                sub(/^[[:space:]]*api_key_env[[:space:]]*=[[:space:]]*"/, "", line)
                sub(/".*$/, "", line)
                if (line != "") env_name = line
            }
            END {
                if (key != "") {
                    print "VALUE:" key
                } else if (env_name != "") {
                    print "ENV:" env_name
                }
            }
        ' "$file"
    }

    token="${AID_TOKEN:-}"
    if [ -z "$token" ]; then
        candidates=()
        d="$(pwd)"
        while true; do
            candidates+=("$d/agent_config.toml")
            [ "$d" = "/" ] && break
            d="$(dirname "$d")"
        done
        candidates+=("$HOME/.agents/agent_config.toml")

        for f in "${candidates[@]}"; do
            [ -f "$f" ] || continue
            resolved="$(extract_aid_token "$f")"
            case "$resolved" in
                VALUE:*)
                    token="${resolved#VALUE:}"
                    break
                    ;;
                ENV:*)
                    env_var="${resolved#ENV:}"
                    if [ -n "${!env_var:-}" ]; then
                        token="${!env_var}"
                        break
                    fi
                    ;;
            esac
        done
    fi

    if [ -z "$token" ]; then
        echo "[ERR] 未找到 AID_TOKEN，请设置环境变量 AID_TOKEN 或在 agent_config.toml 的 [aid] 段配置 api_key" >&2
        exit 1
    fi

    echo "[*] 推送 home 索引到 aid (r={{aid_region}})..."
    printf 'header = "Authorization: Bearer %s"\n' "$token" \
        | curl -sS --fail-with-body -K - \
            -X POST "{{aid_url}}/api/search/rebuild?r={{aid_region}}" \
            -H "Content-Type: application/json" \
            -d @public/index.json
    echo ""
    echo "[OK] home 索引已更新"

deploy-all: deploy push-index
    @echo "[OK] home 部署 + 索引推送完成"
