---
name: tech-stack-notes
description: 各技术栈的重要决策和架构笔记
type: reference
---

# 技术栈笔记

## JavaScript / TypeScript 生态

### 推荐工具链
- **构建**: Vite, esbuild, tsup
- **测试**: Vitest, Jest
- **类型检查**: TypeScript 严格模式
- **Lint**: ESLint + @typescript-eslint
- **格式化**: Prettier

### 架构模式
- 优先使用 ESM 模块
- 使用 monorepo 时选择 pnpm workspace + Turborepo
- API 层使用 Zod 进行运行时验证
- 状态管理根据复杂度选择: React Context → Zustand → Redux Toolkit

### 性能考量
- 使用动态导入代码分割
- 图片和静态资源优化
- 使用 Web Workers 处理重计算

## Python 生态

### 推荐工具链
- **Web 框架**: FastAPI (API), Django (全栈)
- **测试**: pytest
- **类型检查**: mypy
- **Lint**: ruff (替代 flake8 + black + isort)
- **环境**: poetry 或 pip + venv

### 架构模式
- 使用依赖注入容器
- 分层架构: API → Service → Repository → Model
- 使用 Pydantic 进行数据验证
- 异步优先使用 asyncio

### 性能考量
- 使用 asyncio 处理 I/O 密集型任务
- 使用多进程处理 CPU 密集型任务
- 数据库查询使用连接池

## Go 生态

### 推荐工具链
- **Web 框架**: Gin, Echo, 或标准库
- **测试**: 内置 testing 包 + testify
- **ORM**: Gorm 或 sqlx
- **配置**: Viper

### 架构模式
- 标准项目布局遵循 golang-standards/project-layout
- 使用接口定义依赖
- 错误处理显式且分层
- 使用 context 传递请求上下文

### 性能考量
- 利用 goroutine 和 channel
- 使用 sync.Pool 减少内存分配
- 避免在循环中进行内存分配

## Java / Kotlin 生态

### 推荐工具链
- **构建**: Gradle (Kotlin DSL)
- **框架**: Spring Boot
- **测试**: JUnit 5 + AssertJ + Mockito
- **数据库**: JPA + QueryDSL 或 jOOQ

### 架构模式
- 分层架构: Controller → Service → Repository
- 使用依赖注入 (Spring)
- 领域驱动设计 (DDD) 对于复杂业务
- 响应式编程使用 Reactor 或 coroutines (Kotlin)

### 性能考量
- 使用连接池 (HikariCP)
- 缓存策略 (Redis, Caffeine)
- 异步处理使用 @Async 或消息队列

## 跨语言通用

### API 设计
- RESTful API 遵循标准 HTTP 方法
- 使用 OpenAPI/Swagger 文档
- 版本控制: URL 路径或 Header

### 数据库
- 使用迁移工具管理 schema
- 索引优化查询性能
- 连接池配置

### 安全
- 不在代码中硬编码密钥
- 使用环境变量或密钥管理服务
- 输入验证和 SQL 注入防护
- HTTPS 强制

### 监控和日志
- 结构化日志 (JSON 格式)
- 分布式追踪
- 应用性能监控 (APM)
