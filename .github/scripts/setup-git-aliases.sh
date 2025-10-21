#!/bin/bash

# 设置实用的Git别名

echo "🔧 设置Git别名..."

# 清理本地已合并的分支
git config alias.cleanup-local "!git branch --merged | grep -v '\\*\\|main\\|master' | xargs -n 1 git branch -d"

# 清理远程分支引用
git config alias.cleanup-remote "fetch --prune"

# 列出已合并的分支
git config alias.merged "branch --merged"

# 一键清理（本地+远程引用）
git config alias.cleanup "!git cleanup-local && git cleanup-remote"

# 显示分支状态
git config alias.branches "!git branch -a -vv"

# 同步主分支并清理
git config alias.sync "!git checkout main && git pull origin main && git cleanup"

echo "✅ Git别名设置完成！"
echo ""
echo "可用的命令:"
echo "  git cleanup-local    - 删除本地已合并的分支"
echo "  git cleanup-remote   - 清理远程已删除的分支引用"
echo "  git cleanup          - 一键清理本地和远程引用"
echo "  git merged           - 查看已合并的分支"
echo "  git branches         - 查看所有分支详情"
echo "  git sync             - 同步main分支并清理"
