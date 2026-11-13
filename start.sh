#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
PORT="${npm_package_config_port:-$(node -p "require('./package.json').config.port")}"
[ -d node_modules ] || npm install
npm run build
npx serve out -l "$PORT"
