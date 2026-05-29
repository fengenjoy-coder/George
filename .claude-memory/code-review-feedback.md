---
name: code-review-feedback
description: 历史代码审查记录和模式
type: feedback
---

# 代码审查反馈记录

## 常见模式和改进

### 已识别的代码质量问题

#### 类型安全
- **问题**: 过度使用 `any` 类型
- **解决**: 使用具体类型或 `unknown` + 类型守卫
- **示例**: 将 `function process(data: any)` 改为 `function process(data: UserInput)`

#### 错误处理
- **问题**: 忽略异步错误
- **解决**: 使用 try/catch 或 .catch()
- **示例**: 
  ```typescript
  // 避免
  fetchData().then(data => process(data));
  
  // 推荐
  try {
    const data = await fetchData();
    process(data);
  } catch (error) {
    logger.error('Failed to fetch data', error);
  }
  ```

#### 命名规范
- **问题**: 不清晰或模糊的命名
- **解决**: 使用描述性名称，动词开头命名函数
- **示例**: 将 `do()` 改为 `processUserPayment()`

#### 代码重复
- **问题**: 复制粘贴代码
- **解决**: 提取函数或创建工具类
- **策略**: 三次法则 - 第三次重复时抽象

#### 性能问题
- **问题**: 循环中创建函数
- **解决**: 将函数定义移到循环外
- **示例**:
  ```javascript
  // 避免
  items.map(item => expensiveOperation(item));
  
  // 如果 expensiveOperation 不依赖闭包
  items.map(expensiveOperation);
  ```

## 学习记录

### 用户偏好总结
- 倾向于显式而非隐式
- 重视类型安全
- 偏好函数式编程风格
- 关注边界情况处理

### 有效建议类型
- 性能优化建议
- 架构改进建议
- 安全最佳实践
- 可维护性提升

### 避免的建议
- 过度工程化
- 过早优化
- 不符合项目上下文的建议

## 持续改进

### 待学习领域
- 更多设计模式应用
- 特定领域的最佳实践
- 团队特定的编码规范

### 反馈循环
- 每次代码审查后记录关键点
- 定期回顾和改进建议质量
- 根据用户反馈调整建议风格
