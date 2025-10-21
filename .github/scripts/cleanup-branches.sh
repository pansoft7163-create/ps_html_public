#!/bin/bash

# 清理已合并的分支脚本

echo "🧹 开始清理已合并的分支..."

# 获取当前分支
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "当前分支: $CURRENT_BRANCH"

# 确保在main分支上
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "切换到main分支..."
    git checkout main
fi

# 拉取最新的main分支
echo "更新main分支..."
git pull origin main

# 删除本地已合并的分支（排除main和当前分支）
echo ""
echo "删除本地已合并的分支..."
git branch --merged | grep -v "\*\|main\|master" | while read branch; do
    echo "  删除本地分支: $branch"
    git branch -d "$branch"
done

# 清理远程已删除的分支引用
echo ""
echo "清理远程已删除的分支引用..."
git fetch --prune

# 列出远程已合并但未删除的分支
echo ""
echo "检查远程已合并的分支..."
git branch -r --merged origin/main | grep -v "main\|master" | sed 's/origin\///' | while read branch; do
    echo "  发现远程已合并分支: $branch"
    read -p "是否删除远程分支 $branch? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push origin --delete "$branch"
        echo "  ✅ 已删除远程分支: $branch"
    fi
done

echo ""
echo "✅ 清理完成！"
echo ""
echo "当前本地分支:"
git branch

echo ""
echo "当前远程分支:"
git branch -r
