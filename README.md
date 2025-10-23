# vite-template-react-ts

这个模板应该可以帮助你开始在 Vite 中使用 React 18 进行开发。

## 使用

```bash
 npx degit x447618716/vite-template-react-ts my-project
```

## 开发建议

如果你是使用webstorm进行项目开发时建议安装以下插件：

1. **Git Commit Template** 这是一款符合Conventional Commits规范的模版工具

## 安装

- 安装依赖

```sh
pnpm install
```

### 运行

```sh
pnpm run dev
```

### 打包

```sh
pnpm run build
```

### 使用 [Vitest]（https://vitest.dev/） 运行单元测试

```sh
pnpm run test:unit
```

### 使用 [Cypress]（https://www.cypress.io/） 运行端到端测试

```sh
pnpm run test:e2e:dev
```

这将针对 Vite 开发服务器运行端到端测试。
它比生产版本快得多。

但仍建议在部署之前使用 'test：e2e' 测试生产版本（例如在 CI 环境中）:

```sh
pnpm run build
pnpm run test:e2e
```

## 特性

- **最新技术栈**：使用 react18/Vite/react-redux ,TypeScript 等前端前沿技术开发;
- **[Tailwindcss](https://www.tailwindcss.cn)**: 原子化 CSS
- **Eslint/Prettier**: 代码检查以及规范代码格式,统一编码;
- **请求拦截**: 使用[alova 请求](https://github.com/alovajs/alova),支持请求和响应拦截等;
- **Mock 数据**: 配合 alova 请求的[@alova/mock](https://github.com/alovajs/mock)，模拟 api 请求(App 不支持);
- **缓存加密**: 支持 AES 加密缓存,可设置区分在开发或生成环境中是否加密;
- **[Husky](https://typicode.github.io/husky/zh/)**：Git钩子管理,在提交或推送时，自动化 检查提交信息、检查代码 和 运行测试
- **[lint-staged](https://github.com/lint-staged/lint-staged)**:Git暂存区,针对阶段性的git文件运行格式化器和检查器等任务，不要让💩溜进代码库！
- **[commitlint](https://commitlint.js.org/)**:检查提交消息,帮助你的团队遵守提交约定

| 技术栈          | 说明                         | 官网                                                                                                                                 |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `Vite`          | 构建工具                     | [https://cn.vitejs.dev/](https://cn.vitejs.dev/)                                                                                     |
| `TypeScript`    | 静态语言(JavaScript增强)     | [https://www.typescriptlang.org/zh/](https://www.typescriptlang.org/zh/)                                                             |
| `React`         | 前端框架                     | [https://zh-hans.react.dev/](https://zh-hans.react.dev/)                                                                             |
| `React-redux`   | 状态管理                     | [https://react-redux.js.org/](https://react-redux.js.org/)                                                                           |
| `redux-persist` | 状态持久化方案               | [https://www.npmjs.com/package/redux-persist](https://www.npmjs.com/package/redux-persist)                                           |
| `alova`         | 请求工具(适配uniapp)         | [https://alova.js.org/zh-CN/](https://alova.js.org/zh-CN/)                                                                           |
| `crypto-es`     | 加解密方案（CryptoJS的ES版） | [https://github.com/entronad/crypto-es](https://github.com/entronad/crypto-es)                                                       |
| `Tailwindcss`   | css原子化                    | [https://www.tailwindcss.cn](https://www.tailwindcss.cn)                                                                             |
| `prettier`      | 规范代码格式,统一编码        | [https://prettier.io/docs/](https://prettier.io/docs/)                                                                               |
| `eslint`        | 代码检查                     | [https://eslint.org/](https://eslint.org/)                                                                                           |
| `husky`         | git钩子管理                  | [https://typicode.github.io/husky/zh/](https://typicode.github.io/husky/zh/)                                                         |
| `lint-staged`   | git暂存区                    | [https://www.npmjs.com/package/lint-staged#installation-and-setup](https://www.npmjs.com/package/lint-staged#installation-and-setup) |
| `commitlint`    | 检查提交消息                 | [https://commitlint.js.org/](https://commitlint.js.org/)                                                                             |

## 目录结构

```shell
.
├─ src
│   ├─assets # 静态资源目录
│   │
│   ├─components # 组件目录
│   │   └─...
│   │
│   ├─directive # 自定义指令
│   │   └─...
│   │
│   ├─enums # 枚举/常量
│   │   └─...
│   │
│   ├─http  # request相关目录
│   │   └─...
│   │
│   ├─view # 页面
│   │   ├─ index
│   │   │    └─index.vue
│   │   └─...
│   │
│   ├─services # 接口相关
│   │   ├─ api # api
│   │   │    ├─auth.ts
│   │   │    └─...
│   │   ├─ dto # 参数数据模型
│   │   │    ├─auth.ts
│   │   │    └─...
│   │   │
│   │   └─ vo # 响应数据模型
│   │        ├─auth.ts
│   │        └─...
│   │
│   │
│   ├─stores # 状态管理模式(pinia)
│   │   ├─ modules # 数据模块
│   │   │    ├─auth.ts
│   │   │    └─...
│   │   │
│   │   └─ index.ts
│   │
│   ├─static # 静态公共文件
│   │   ├─ images # 图片
│   │   │    └─...
│   │   │
│   │   └─ ...
│   │
│   │
│   └─utils # 工具类
│      └─ ...
│
├─types # 类型文件
│   ├─ env.d.ts
│   └─ ...
│
├─ .env
├─ .env.development
├─ .env.production
├─ .eslintignore
├─ .eslintrc.cjs
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.cjs
├─ favicon.ico
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ tsconfig.json
└─ vite.config.ts

```

## Git 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范进行 Git 提交。

### 提交格式

每次提交，Commit message 都包括三个部分：Header、Body 和 Footer。

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

其中，Header 是必需的，Body 和 Footer 可以省略。

### 提交类型(Type)

提交类型必须是以下之一：

| 提交类型   | 标题         | 描述                                                                                  |
| ---------- | ------------ | ------------------------------------------------------------------------------------- |
| `feat`     | 特征         | 新功能、新特性                                                                        |
| `fix`      | Bug 修复     | bug 修复                                                                              |
| `docs`     | 文档         | 仅文档更改                                                                            |
| `style`    | 风格         | 不影响代码含义的更改（空格、格式、缺少分号等）                                        |
| `refactor` | 代码重构     | 重构，在不影响代码内部行为，功能下的代码修改                                          |
| `perf`     | 性能改进     | 更改代码，以提高性能                                                                  |
| `test`     | 测试         | 添加缺失的测试或纠正现有的测试                                                        |
| `build`    | 构建         | 影响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm）                       |
| `ci`       | 持续集成     | 对我们的 CI 配置文件和脚本的更改（示例范围：Travis、Circle、BrowserStack、SauceLabs） |
| `chore`    | 其他文件修改 | 不修改 src 或测试文件的其他更改                                                       |
| `revert`   | 还原         | 恢复之前的提交                                                                        |

### 提交别名

| 提交类型           | 映射到  | 标题     | 描述                       |
| ------------------ | ------- | -------- | -------------------------- |
| `initial`          | `feat`  | 最初的   | 初始提交                   |
| `dependencies`     | `fix`   | 依赖项   | 更新依赖项                 |
| `peerDependencies` | `fix`   | 对等依赖 | 更新对等依赖项             |
| `devDependencies`  | `chore` | 开发依赖 | 更新开发依赖               |
| `metadata`         | `fix`   | 元数据   | 更新元数据（package.json） |

### Scope 范围

scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

### Subject 主题

subject 是 commit 目的的简短描述，不超过 50 个字符。

- 以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
- 第一个字母小写
- 结尾不加句号（.）

### Body 详细描述

Body 部分是对本次 commit 的详细描述，可以分成多行。

### Footer 脚注

Footer 部分只用于两种情况：

1. 不兼容变动
2. 关闭 Issue

### 示例

```
feat: 添加用户登录功能

- 实现手机号登录
- 添加记住密码功能
- 集成JWT认证

Closes #123
```

```
fix: 修复token刷新失败的问题

- 优化token刷新逻辑
- 添加错误处理
```

```
docs: 更新项目文档

- 添加API接口说明
- 更新部署文档
```

```
style: 优化代码格式

- 统一使用单引号
- 调整缩进为4空格
```

```
refactor: 重构用户认证模块

- 将认证逻辑抽离到独立服务
- 优化token管理
```

```
perf: 优化首页加载性能

- 添加路由懒加载
- 优化图片加载
```

```
test: 添加用户模块单元测试

- 添加登录功能测试
- 添加token刷新测试
```

```
chore: 更新项目依赖

- 升级Vue到3.3.4
- 更新ESLint配置
```
