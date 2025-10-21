# 设置 dev 开发分支指南

当前仓库通过 Claude Code 连接，只允许推送 `claude/` 开头的分支。要创建 `dev` 分支用于日常开发，有以下几种方法：

## 方法一：在 GitHub 网页上创建（推荐，最简单）

### 步骤：

1. **访问 GitHub 仓库页面**
   - 打开 https://github.com/pansoft7163-create/ps_html_public

2. **创建 dev 分支**
   - 点击左上角的分支选择器（显示当前分支名称的按钮）
   - 在搜索框输入 `dev`
   - 点击 "Create branch: dev from 'claude/dev-011CUL5t7dX66gdYJSeEmnCn'"

3. **完成**
   - dev 分支创建成功！
   - 我之后就可以向 dev 分支创建 PR 了

## 方法二：通过 GitHub Settings 配置分支权限

如果方法一不可行，可以尝试调整仓库设置：

1. **进入仓库设置**
   - GitHub 仓库页面 → Settings（设置）
   - 左侧菜单找到 "Branches"（分支）

2. **检查分支保护规则**
   - 查看是否有针对分支名称的限制
   - 如果有 "Branch name pattern" 限制，添加 `dev` 到允许列表

3. **检查 GitHub App 权限**
   - Settings → Integrations → GitHub Apps
   - 找到 Claude Code 相关的应用
   - 确保有 "Contents: Read and write" 权限

## 方法三：使用 claude/dev 分支作为开发分支

如果上述方法都不可行，可以直接使用现有的分支：

```bash
# 使用 claude/dev-011CUL5t7dX66gdYJSeEmnCn 作为开发主分支
# 在 GitHub 上可以将这个分支设为默认分支
```

## 推荐的分支结构

创建成功后，建议使用以下工作流程：

```
main (生产/稳定版本)
  ↑ PR 合并
dev (开发主线/预览分支) ← 你在这里查看效果
  ↑ PR 合并
claude/feature-xxx (功能开发分支) ← Claude 在这里开发
```

## 验证 dev 分支是否创建成功

创建后，告诉我一声，我会执行：

```bash
git fetch origin
git checkout -b dev origin/dev
```

然后我们就可以开始使用标准的开发工作流程了！

## 当前状态

- ✅ 已创建 `claude/dev-011CUL5t7dX66gdYJSeEmnCn` 分支
- ✅ 包含所有自动化配置
- ⏳ 等待创建 `dev` 分支
- ⏳ 设置 `dev` 为开发主线

---

**需要帮助？** 如果遇到问题，可以截图发给我，我来协助排查。
