---
name: workflow-preferences
description: 常用命令和工作流程偏好
type: reference
---

# 工作流偏好

## 自动化配置

### 保存时自动执行
- **代码格式化**: prettier (JS/TS), black/isort (Python), gofmt (Go), clang-format (Java)
- **测试运行**: 相关测试文件
- **Lint**: eslint (JS/TS), ruff/mypy (Python), go vet (Go)

### 提交前检查
- 运行 lint
- 运行类型检查
- 运行相关测试
- 代码审查检查

## 常用命令

### JavaScript / TypeScript
```bash
# 包管理
npm install
npm run dev
npm run build
npm test

# 代码质量
npx prettier --write .
npx eslint . --fix
npx tsc --noEmit
npx vitest run
```

### Python
```bash
# 虚拟环境
python -m venv venv
source venv/bin/activate  # 或 venv\Scripts\activate on Windows

# 依赖管理
pip install -r requirements.txt
pip install -e .

# 代码质量
black .
isort .
ruff check . --fix
mypy .
pytest
```

### Go
```bash
# 构建和运行
go build
go run .
go test ./...

# 代码质量
go fmt ./...
go vet ./...
go mod tidy
```

### Java
```bash
# Maven
mvn clean install
mvn test

# Gradle
gradle build
gradle test
```

## Git 工作流

### 提交规范
- 使用清晰的提交信息
- 遵循 conventional commits 格式
- 每次提交做一件逻辑相关的事

### 分支策略
- main: 稳定代码
- feature/*: 新功能
- fix/*: Bug 修复
- refactor/*: 重构

## 开发环境偏好

### 编辑器设置
- 使用 2 空格缩进
- 显示行尾空白
- 自动保存
- 集成终端

### 终端偏好
- 使用 zsh 或 bash
- 常用别名配置
- Git 提示符显示分支信息

## 研究任务偏好

### Plan Mode 使用
- **场景**: 复杂多步骤研究任务
- **触发条件**: 需要深入探索、多方案对比、技术调研
- **示例**: API方案调研、架构设计、技术选型
- **要求**: 系统性地探索、记录决策过程、提供多方案对比
