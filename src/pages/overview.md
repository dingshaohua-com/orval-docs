---
id: overview
title: 概述
---

`orval` 能够从任何有效的 OpenAPI v3 或 Swagger v2 规范（支持 `yaml` 或 `json` 格式）生成具有适当类型签名的客户端（TypeScript）。

## 动机

我经常使用 swagger 作为前端和后端团队之间的契约。在 Orval 之前，我使用 <a href="https://editor.swagger.io" target="_blank">swagger editor</a> 或 <a href="https://swagger.io/tools/swagger-codegen" target="_blank">swagger codegen</a>，但这无法满足我的需求。这就是我开始开发 Orval 的原因。

主要目标：

- 生成 TypeScript 模型
- 生成 HTTP 调用
- 使用 <a href="https://mswjs.io/" target="_blank">MSW</a> 生成 Mock

默认生成的客户端使用 axios，也可以通过 fetch API 或您喜欢的 JavaScript 框架（如 Angular、React 或 Vue）使用。它只是一个函数，接受 axios 实例或 fetch API 函数作为参数，并返回一个对象，其中每个键都是一个设置 HTTP 调用的函数。[了解更多](./guides/basics)

Orval 还可以生成以下客户端：

- [使用 axios 的 React Query](./guides/react-query)
- [使用 HttpClient 的 Angular](./guides/angular)
