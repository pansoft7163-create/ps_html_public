# 设置 dev 开发分支

目前由于仓库配置的限制，只能推送 `claude/` 开头的分支。如果你想创建一个独立的 `dev` 分支用于日常开发，有以下几种方案：

## 方案一：在 GitHub 上创建 dev 分支（推荐）

1. 访问 GitHub 仓库页面
2. 点击分支选择器，输入 `dev` 并创建新分支
3. 在本地拉取：
   ```bash
   git fetch origin
   git checkout -b dev origin/dev
   ```

## 方案二：配置分支推送权限

如果你有仓库管理权限，可以配置允许推送 dev 分支：

1. 进入 GitHub 仓库的 **Settings**
2. 找到 **Branches** 或分支保护规则
3. 允许推送 `dev` 分支
4. 然后可以直接推送：
   ```bash
   git checkout -b dev
   git push -u origin dev
   ```

## 方案三：使用 claude/dev 分支

目前已创建 `claude/dev-011CUL5t7dX66gdYJSeEmnCn` 分支，你可以：

1. 在 GitHub 上将此分支重命名为 `dev`
2. 或者直接使用此分支进行开发
3. 本地切换：
   ```bash
   git checkout claude/dev-011CUL5t7dX66gdYJSeEmnCn
   ```

## 日常开发工作流（使用 dev 分支）

一旦 dev 分支创建成功：

```bash
# 日常开发在 dev 分支上进行
git checkout dev
git pull origin dev

# 做一些修改...
git add .
git commit -m "你的提交信息"
git push origin dev

# 准备发布时，创建 PR 将 dev 合并到 main
```

## 当前分支状态

```bash
# 查看所有分支
git branch -a

# 当前开发分支
claude/dev-011CUL5t7dX66gdYJSeEmnCn
```
