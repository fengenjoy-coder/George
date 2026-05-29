---
name: AIMarker 项目概况
description: AIMarker iOS 应用的位置、性质、当前阶段；G哥说"推进 aimarker"时从这里查
type: project
originSessionId: 34b6405f-e76c-435c-96e8-3e5018c93229
---
AIMarker 是一个高尔夫果岭测坡 / 推杆击球线 SwiftUI iOS 应用，路径在 `/Users/malbongf/projects/AIMarker`。

当前结构（截至 2026-04-28）：
- 入口：`Aimarker/AIMarkerApp.swift`、`Aimarker/ContentView.swift`
- Models：`BreakCalculator.swift`、`SlopeReading.swift`、`SlopeSample.swift`
- ViewModels：`MeasurementViewModel.swift`
- Utils：`MotionManager.swift`(读取设备运动数据)
- Views：`SetupView.swift`、`SlopeMeterView.swift`、`ResultView.swift`
- 测试目录 `AimarkerTests/`、`AimarkerUITests/` 已建好但基本是空骨架
- Git：在 main 分支干净，只有一个 initial commit

**Why:** G哥让我"继续推进 aimarker"，但记忆里没有上下文，每次重新摸一遍很浪费。这条记忆只为快速定位项目，不替代读代码。

**How to apply:** G哥再提"aimarker"时，先到该路径用 `git log --oneline` 和 `find Aimarker -name "*.swift"` 看最新结构，再问他要推进的方向。不要直接基于本记忆里的文件清单回答，结构会变。

**已知前置条件：** 2026-04-28 时 Mac 上没装完整 Xcode（只有 `/Applications/Xcode.appdownload`），`xcode-select` 指向 CommandLineTools，无法 `xcodebuild` 或起模拟器。下次再做"跑起来"类任务前，先确认 Xcode 是否已就绪。
