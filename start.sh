#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
[ -d node_modules ] || npm install
npm run build
npx serve out -l 20002
