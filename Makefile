REMOTE_DIR := /srv/www/zengrong.net

dev:
	hugo server -D

build:
	hugo

deploy: build
	rsync -avz --delete public/ ubuntu@zengrong-net:$(REMOTE_DIR)
	@echo "[OK] home 部署完成"
	@echo "     如需更新 aid 搜索索引: AID_TOKEN=xxx bash tools/push_index.sh"

.PHONY: dev build deploy
