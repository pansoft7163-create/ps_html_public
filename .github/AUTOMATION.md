# 自动化功能说明

本仓库配置了多种自动化功能，帮助保持代码仓库的整洁。

## 1. 自动删除合并后的分支

### GitHub Actions 自动清理

已配置 `.github/workflows/cleanup-merged-branches.yml` 工作流：

- **自动运行**: 每周日自动清理已合并的远程分支
- **手动触发**: 在 GitHub Actions 页面可以手动运行
- **保护分支**: 自动跳过 `main`、`master`、`develop` 等保护分支

### 本地清理脚本

运行以下命令清理本地和远程分支：

```bash
# 运行完整清理脚本（交互式）
./.github/scripts/cleanup-branches.sh
```

## 2. Git 快捷命令

已为你设置了以下 Git 别名，可以直接使用：

### 基础清理命令

```bash
# 删除本地已合并的分支
git cleanup-local

# 清理远程已删除的分支引用
git cleanup-remote

# 一键清理（本地+远程引用）
git cleanup
```

### 查看命令

```bash
# 查看已合并的分支
git merged

# 查看所有分支详情
git branches
```

### 同步命令

```bash
# 同步main分支并自动清理
git sync
```

## 3. 使用示例

### 日常工作流

```bash
# 1. 完成功能开发并合并PR后
# 2. 运行同步命令
git sync

# 这会自动：
# - 切换到 main 分支
# - 拉取最新代码
# - 删除本地已合并的分支
# - 清理远程分支引用
```

### 手动清理远程分支

```bash
# 查看哪些分支已合并
git merged

# 删除远程分支（需要手动确认）
./.github/scripts/cleanup-branches.sh
```

## 4. GitHub 仓库设置（推荐）

在 GitHub 仓库设置中启用自动删除功能：

1. 进入仓库 **Settings**
2. 找到 **Pull Requests** 部分
3. 勾选 **Automatically delete head branches**

这样每次PR合并后，GitHub会自动删除源分支。

## 5. 注意事项

- 自动化脚本只会删除**已合并**的分支
- 受保护的分支（main、master、develop）不会被删除
- 本地脚本在删除远程分支前会要求确认
- GitHub Actions 工作流会在日志中记录所有操作

## 6. 故障排除

### 如果分支无法删除

```bash
# 查看分支状态
git branch -a -vv

# 强制删除本地分支（谨慎使用）
git branch -D <branch-name>

# 删除远程分支
git push origin --delete <branch-name>
```

### 重新设置Git别名

```bash
# 运行设置脚本
./.github/scripts/setup-git-aliases.sh
```
