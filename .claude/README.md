# Claude Code 权限配置

## 扩展 Claude 的命令权限

为了让 Claude 能够使用 `gh` (GitHub CLI) 命令自动创建 Pull Requests，需要配置命令权限。

## 方法一：通过项目配置文件（推荐）

已创建 `.claude/settings.json` 配置文件，但可能需要额外的配置。

### 可能的配置选项：

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "tools": {
    "Bash": {
      "allowedCommands": ["gh"],
      "requireApproval": false
    }
  }
}
```

或者：

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "allowedTools": {
    "Bash": {
      "allowList": ["gh.*"]
    }
  }
}
```

## 方法二：运行时批准

在 Claude Code 会话中，当 Claude 尝试运行 `gh` 命令时：
1. 会弹出权限请求提示
2. 选择 "Allow" 或 "Always Allow"
3. 如果选择 "Always Allow"，该命令会被添加到允许列表

## 方法三：全局用户配置

编辑用户级别的配置文件：
```bash
~/.claude/settings.json
```

添加允许的命令配置。

## 方法四：手动创建 PR（临时方案）

如果无法配置权限，可以：
1. 访问 GitHub 仓库页面
2. 点击分支旁边的 "Compare & pull request" 按钮
3. 或访问直接链接创建 PR

## 当前状态

- ✅ 已创建项目级 `.claude/settings.json` 配置
- ⏳ 等待确认配置是否生效
- 📝 如配置不生效，请查看 Claude Code 文档或使用手动创建 PR

## 测试权限

可以让 Claude 尝试运行简单的 gh 命令测试：
```bash
gh --version
```

如果成功，说明权限配置生效。

## 相关文档

- Claude Code 文档: https://docs.claude.com/claude-code
- 项目配置: https://docs.claude.com/claude-code/configuration
