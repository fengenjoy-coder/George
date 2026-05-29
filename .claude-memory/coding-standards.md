---
name: coding-standards
description: 多语言编码规范和个人偏好
type: reference
---

# 编码规范偏好

## JavaScript / TypeScript

### 风格指南
- 使用 **严格 TypeScript** (`strict: true`)
- 优先使用 `const`，需要重新赋值时使用 `let`，避免 `var`
- 使用 `async/await` 替代回调和 Promise 链
- 优先使用函数式编程模式
- 命名规范:
  - 变量/函数: camelCase
  - 类/接口: PascalCase
  - 常量: UPPER_SNAKE_CASE
  - 布尔值: 使用 is/has/should 前缀

### 代码质量
- 所有函数必须有返回类型注解
- 避免使用 `any`，优先使用 `unknown` 或具体类型
- 使用可选链操作符 `?.` 和空值合并运算符 `??`
- 错误处理使用自定义错误类

## Python

### 风格指南
- 遵循 **PEP 8** 规范
- 使用 **类型注解** (Python 3.10+)
- 命名规范:
  - 变量/函数: snake_case
  - 类: PascalCase
  - 常量: UPPER_SNAKE_CASE
  - 私有属性: _leading_underscore

### 代码质量
- 使用 `mypy` 进行类型检查
- 使用 `black` 进行代码格式化
- 使用 `ruff` 进行 lint
- 导入排序使用 `isort`
- 显式优于隐式

## Go

### 风格指南
- 遵循 `gofmt` 格式化
- 保持简单，避免过度工程
- 显式处理错误，不要忽略
- 优先使用组合而非继承
- 命名规范:
  - 使用短而有意义的变量名
  - 接口名以 `er` 结尾 (Reader, Writer)
  - 导出标识符使用 PascalCase
  - 未导出使用 camelCase

### 代码质量
- 每个错误都必须处理或明确传递
- 使用 `context` 处理取消和超时
- 避免在热路径中分配内存

## Java / Kotlin

### 风格指南
- 遵循标准 Java/Kotlin 约定
- 使用强类型，避免原始类型
- 优先使用不可变性
- 命名规范:
  - 类: PascalCase
  - 方法/变量: camelCase
  - 常量: UPPER_SNAKE_CASE

### 代码质量
- 使用依赖注入
- 避免 null，使用 Optional 或空对象模式
- 使用 Stream API (Java) 或集合操作 (Kotlin)

## 通用原则

### 代码审查清单
- [ ] 类型安全和适当的错误处理
- [ ] 性能优化和资源管理
- [ ] 测试覆盖率和边界情况处理
- [ ] 遵守项目约定和风格指南
- [ ] 安全最佳实践（无敏感信息、输入验证）
- [ ] 文档和复杂逻辑的内联注释

### DRY 原则
- 不要重复自己
- 提取可复用的函数和组件
- 使用配置而非硬编码

### KISS 原则
- 保持简单明了
- 可读性优于巧妙性
- 避免过早优化
