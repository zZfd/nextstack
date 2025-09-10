# Visual Pixel Gallery - 主题风格指南

> 一个现代化的视觉内容分享平台的完整设计系统文档

## 📋 目录

- [🎨 颜色系统](#-颜色系统)
- [✍️ 字体系统](#️-字体系统)
- [📐 间距与布局系统](#-间距与布局系统)
- [🧩 组件设计规范](#-组件设计规范)
- [🌙 主题管理](#-主题管理)
- [📱 响应式设计](#-响应式设计)
- [✨ 动效与交互](#-动效与交互)
- [🚀 最佳实践](#-最佳实践)

---

## 🎨 颜色系统

### 主色调调色板

我们的设计系统采用深色主题，以绿色作为品牌主色调，营造现代科技感。

#### 核心颜色变量

```css
:root {
  /* 背景色系 */
  --background: 0 0% 3%; /* 主背景 - 极深灰黑 */
  --foreground: 0 0% 98%; /* 主文本色 - 近白色 */

  /* 卡片与容器 */
  --card: 0 0% 6%; /* 卡片背景 */
  --card-foreground: 0 0% 98%; /* 卡片文本 */

  /* 弹出层 */
  --popover: 0 0% 6%; /* 弹出层背景 */
  --popover-foreground: 0 0% 98%; /* 弹出层文本 */

  /* 品牌主色 */
  --primary: 142 76% 36%; /* 品牌绿 - HSL(142, 76%, 36%) */
  --primary-foreground: 0 0% 98%; /* 主色上的文本 */

  /* 次要色彩 */
  --secondary: 0 0% 9%; /* 次要背景 */
  --secondary-foreground: 0 0% 98%; /* 次要文本 */

  /* 柔和色彩 */
  --muted: 0 0% 9%; /* 静音背景 */
  --muted-foreground: 0 0% 63%; /* 静音文本 */

  /* 强调色 */
  --accent: 0 0% 9%; /* 强调背景 */
  --accent-foreground: 0 0% 98%; /* 强调文本 */

  /* 危险/错误 */
  --destructive: 0 63% 31%; /* 错误红色 */
  --destructive-foreground: 0 0% 98%; /* 错误文本 */

  /* 边框与输入 */
  --border: 0 0% 15%; /* 边框色 */
  --input: 0 0% 15%; /* 输入框背景 */
  --ring: 142 76% 36%; /* 焦点环颜色 */
}
```

#### 语义化颜色应用

| 用途     | 颜色变量         | 十六进制  | 应用场景             |
| -------- | ---------------- | --------- | -------------------- |
| 品牌主色 | `--primary`      | `#22c55e` | 按钮、链接、重要操作 |
| 成功状态 | `--primary`      | `#22c55e` | 成功提示、完成状态   |
| 错误状态 | `--destructive`  | `#dc2626` | 错误提示、删除操作   |
| 警告状态 | `text-amber-600` | `#d97706` | 警告提示、待处理状态 |
| 中性状态 | `text-gray-400`  | `#9ca3af` | 禁用状态、占位符     |

### 扩展颜色调色板

项目中使用的其他语义化颜色：

```css
/* 状态颜色 */
.text-green-500 { color: #22c55e; }    /* 在线状态 */
.text-blue-500 { color: #3b82f6; }     /* 信息提示 */
.text-red-500 { color: #ef4444; }      /* 错误状态 */
.text-amber-600 { color: #d97706; }    /* 警告状态 */
.text-yellow-800 { color: #92400e; }   /* 高亮标记 */

/* 渐变色 */
.bg-gradient-to-r.from-blue-500.to-purple-600  /* 头像渐变 */
.bg-gradient-to-r.from-emerald-500.to-teal-600 /* 特殊按钮渐变 */
.bg-gradient-to-t.from-black/60                /* 遮罩渐变 */
```

---

## ✍️ 字体系统

### 字体族

```css
body {
  font-family: 'Inter', sans-serif;
}
```

我们使用 **Inter** 作为主字体，这是一个专为屏幕阅读优化的现代几何字体，具有出色的可读性。

### 字体大小层级

基于 Tailwind CSS 的字体大小系统：

| 类名        | 字体大小 | 行高 | 用途             |
| ----------- | -------- | ---- | ---------------- |
| `text-xs`   | 12px     | 16px | 标签、辅助信息   |
| `text-sm`   | 14px     | 20px | 次要文本、描述   |
| `text-base` | 16px     | 24px | 正文、卡片标题   |
| `text-lg`   | 18px     | 28px | 小标题、重要信息 |
| `text-xl`   | 20px     | 28px | 导航栏标题       |
| `text-2xl`  | 24px     | 32px | 页面标题         |
| `text-3xl`  | 30px     | 36px | 主要页面标题     |
| `text-4xl`  | 36px     | 40px | 404页面等大标题  |

### 字体重量

| 类名            | 字重值 | 应用场景             |
| --------------- | ------ | -------------------- |
| `font-medium`   | 500    | 卡片标题、用户名     |
| `font-semibold` | 600    | 导航项、重要标签     |
| `font-bold`     | 700    | 页面主标题、数据展示 |

### 字体特性设置

```css
body {
  font-feature-settings:
    'rlig' 1,
    'calt' 1;
}
```

- `rlig`: 启用连字
- `calt`: 启用上下文替代

---

## 📐 间距与布局系统

### 间距规范

基于 8px 基准单位的间距系统：

| Tailwind 类           | 实际值 | 用途           |
| --------------------- | ------ | -------------- |
| `space-x-1` / `gap-1` | 4px    | 图标与文本间距 |
| `space-x-2` / `gap-2` | 8px    | 按钮组间距     |
| `space-x-4` / `gap-4` | 16px   | 卡片内容间距   |
| `space-x-6` / `gap-6` | 24px   | 组件间距       |
| `space-x-8` / `gap-8` | 32px   | 大区块间距     |

### 内边距系统

| 类名        | 实际值    | 应用场景     |
| ----------- | --------- | ------------ |
| `p-2`       | 8px       | 小按钮、标签 |
| `p-4`       | 16px      | 卡片内容区   |
| `p-6`       | 24px      | 对话框内容   |
| `px-4 py-2` | 16px 8px  | 标准按钮     |
| `px-6 py-3` | 24px 12px | 大按钮       |

### 布局容器

```css
/* 主容器 */
.max-w-7xl.mx-auto.px-4.sm:px-6.lg:px-8

/* 内容区宽度限制 */
.max-w-md   /* 448px - 搜索框 */
.max-w-4xl  /* 896px - 内容区 */
.max-w-7xl  /* 1280px - 主容器 */
```

### 瀑布流布局

```css
.masonry-grid {
  column-count: 1;
  column-gap: 1rem;
}

@media (min-width: 640px) {
  column-count: 2;
}
@media (min-width: 768px) {
  column-count: 3;
}
@media (min-width: 1024px) {
  column-count: 4;
}
@media (min-width: 1280px) {
  column-count: 5;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}
```

---

## 🧩 组件设计规范

### 1. 按钮组件

#### 基础样式

```css
.button-base {
  @apply inline-flex items-center justify-center gap-2 whitespace-nowrap
         rounded-md text-sm font-medium ring-offset-background
         transition-colors focus-visible:outline-none focus-visible:ring-2
         focus-visible:ring-ring focus-visible:ring-offset-2
         disabled:pointer-events-none disabled:opacity-50;
}
```

#### 变体样式

| 变体          | 样式         | 用途           |
| ------------- | ------------ | -------------- |
| `default`     | 绿色主按钮   | 主要操作       |
| `destructive` | 红色警告按钮 | 删除、取消操作 |
| `outline`     | 边框按钮     | 次要操作       |
| `secondary`   | 灰色按钮     | 辅助操作       |
| `ghost`       | 透明按钮     | 导航、轻量操作 |
| `link`        | 链接样式     | 文本链接       |

#### 尺寸规范

| 尺寸      | 高度    | 内边距   | 应用场景 |
| --------- | ------- | -------- | -------- |
| `sm`      | 36px    | 12px     | 紧凑空间 |
| `default` | 40px    | 16px 8px | 标准按钮 |
| `lg`      | 44px    | 32px     | 重要操作 |
| `icon`    | 40x40px | -        | 图标按钮 |

### 2. 卡片组件

#### 基础结构

```css
.card-base {
  @apply rounded-lg border bg-card text-card-foreground shadow-sm;
}

/* 悬停效果 */
.card-hover {
  @apply hover:border-primary/20 transition-all duration-300
         hover:shadow-xl hover:shadow-primary/5;
}
```

#### 内容区域

- **CardHeader**: `p-6` 头部区域
- **CardContent**: `p-6 pt-0` 内容区域
- **CardFooter**: `p-6 pt-0` 底部区域

### 3. 输入框组件

```css
.input-base {
  @apply flex h-10 w-full rounded-md border border-input
         bg-background px-3 py-2 text-sm ring-offset-background
         file:border-0 file:bg-transparent file:text-sm file:font-medium
         placeholder:text-muted-foreground focus-visible:outline-none
         focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
         disabled:cursor-not-allowed disabled:opacity-50;
}
```

### 4. 徽章组件

#### 变体样式

| 变体          | 样式     | 用途     |
| ------------- | -------- | -------- |
| `default`     | 灰色徽章 | 一般标签 |
| `secondary`   | 次要徽章 | 分类标签 |
| `destructive` | 红色徽章 | 错误状态 |
| `outline`     | 边框徽章 | 轻量标签 |

---

## 🌙 主题管理

### 暗色主题配置

项目默认使用暗色主题，通过 CSS 变量实现：

```css
:root {
  /* 暗色主题变量已在颜色系统中定义 */
}

/* 主题切换类 */
.dark {
  /* 暗色主题已是默认值 */
}
```

---

## 📱 响应式设计

### 断点系统

```css
/* Tailwind CSS 默认断点 */
sm: 640px    /* 小屏手机横屏、大屏手机 */
md: 768px    /* 平板设备 */
lg: 1024px   /* 小屏笔记本 */
xl: 1280px   /* 大屏桌面 */
2xl: 1536px  /* 超大屏 */
```

### 响应式布局模式

#### 导航栏适配

```css
/* 移动端 */
.navbar-mobile {
  @apply px-4 h-14;
}

/* 桌面端 */
.navbar-desktop {
  @apply px-6 lg:px-8 h-16;
}
```

#### 网格布局适配

```css
/* 响应式网格 */
.responsive-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
         lg:grid-cols-4 xl:grid-cols-5 gap-4;
}
```

#### 内容区适配

```css
/* 内容区间距 */
.content-padding {
  @apply px-4 sm:px-6 lg:px-8;
}

/* 标题尺寸 */
.responsive-title {
  @apply text-2xl sm:text-3xl;
}
```

---

## ✨ 动效与交互

### 过渡动画

#### 基础过渡

```css
.transition-base {
  @apply transition-colors duration-300;
}

.transition-transform {
  @apply transition-transform duration-300;
}

.transition-all {
  @apply transition-all duration-300;
}
```

#### 悬停效果

```css
/* 卡片悬停 */
.card-hover:hover {
  @apply border-primary/20 shadow-xl shadow-primary/5 scale-[1.02];
}

/* 图片悬停缩放 */
.image-hover:hover {
  @apply scale-105;
}

/* 按钮悬停 */
.button-hover:hover {
  @apply bg-primary/90;
}
```

### 自定义动画

```css
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}
```

### 加载状态

```css
/* 旋转加载器 */
.loader-spin {
  @apply w-4 h-4 border-2 border-current border-t-transparent
         rounded-full animate-spin;
}

/* 脉冲占位符 */
.placeholder-pulse {
  @apply bg-muted animate-pulse;
}
```

---

## 🚀 最佳实践

### 1. 颜色使用原则

- **主色调克制使用**: 绿色主要用于重要操作和状态指示
- **语义化颜色**: 红色表示错误/危险，绿色表示成功，橙色表示警告
- **对比度保证**: 文本与背景对比度至少为 4.5:1
- **一致性**: 相同语义使用相同颜色

### 2. 字体使用规范

- **层级清晰**: 通过字体大小和重量建立清晰的信息层级
- **可读性优先**: 正文字体不小于 14px
- **重点突出**: 重要信息使用更大字号或更重字重
- **行间距适当**: 保证文本的可读性和美观性

### 3. 间距使用指南

- **8px 基准**: 所有间距都是 8px 的倍数
- **一致性**: 相同层级的元素使用相同间距
- **呼吸感**: 给内容足够的空间，避免拥挤
- **对齐**: 保持元素之间的对齐关系

### 4. 组件开发规范

- **可复用性**: 组件设计要考虑多场景使用
- **一致性**: 遵循既定的设计规范
- **可访问性**: 支持键盘导航和屏幕阅读器
- **状态管理**: 明确定义各种状态的视觉表现

### 5. 响应式设计原则

- **移动优先**: 从小屏幕开始设计，逐步增强
- **断点合理**: 在关键尺寸设置断点
- **内容优先**: 确保内容在所有设备上都能良好展示
- **触控友好**: 移动端交互元素至少 44px 大小

### 6. 性能优化

- **图片懒加载**: 使用 `loading="lazy"` 属性
- **动画优化**: 使用 `transform` 和 `opacity` 进行动画
- **减少重绘**: 避免频繁改变布局属性
- **CSS 优化**: 合理使用 CSS 选择器

---

## 📊 快速参考

### 常用 Tailwind 类名组合

```css
/* 卡片容器 */
.card-container {
  @apply bg-card border border-border/50 rounded-lg shadow-sm
         hover:border-primary/20 transition-all duration-300;
}

/* 按钮组合 */
.btn-primary {
  @apply bg-primary text-primary-foreground hover:bg-primary/90
         px-4 py-2 rounded-md font-medium transition-colors;
}

/* 输入框组合 */
.input-field {
  @apply bg-background border border-border rounded-md px-3 py-2
         focus:ring-2 focus:ring-primary focus:border-transparent;
}

/* 文本层级 */
.text-heading {
  @apply text-2xl font-bold;
}
.text-subheading {
  @apply text-lg font-semibold;
}
.text-body {
  @apply text-base;
}
.text-caption {
  @apply text-sm text-muted-foreground;
}
```

### 颜色变量速查

```css
/* 背景色 */
bg-background, bg-card, bg-popover, bg-muted

/* 文本色 */
text-foreground, text-muted-foreground, text-primary

/* 边框色 */
border-border, border-primary, border-destructive

/* 状态色 */
text-green-500 (成功), text-red-500 (错误), text-amber-600 (警告)
```

### 组件尺寸标准

```css
/* 按钮高度 */
h-9 (36px), h-10 (40px), h-11 (44px)

/* 头像尺寸 */
w-8 h-8 (32px), w-10 h-10 (40px), w-12 h-12 (48px)

/* 图标尺寸 */
w-4 h-4 (16px), w-5 h-5 (20px), w-6 h-6 (24px)

/* 圆角 */
rounded (6px), rounded-md (6px), rounded-lg (8px)
```

---

## 📝 更新日志

### v1.0.0 (2024)

- 初始版本发布
- 建立完整的设计系统
- 定义颜色、字体、间距规范
- 制定组件设计标准

---

> **注意**: 本文档会随着项目发展持续更新，请定期查看最新版本。
>
> **联系**: 如有设计相关问题，请提交 Issue 或联系设计团队。
