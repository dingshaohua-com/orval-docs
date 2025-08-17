---
id: mcp
title: MCP
---

## 介绍

`Orval` 从 `OpenAPI` 生成 `MCP 服务器`。
[模型上下文协议 (MCP)](https://modelcontextprotocol.io/introduction) 服务器通过简单地中继 `API` 客户端创造巨大价值。
这消除了等待某人开发或在市场上发布它的需要。您可以为拥有 `OpenAPI` 的各种服务创建 `MCP 服务器`，并与 AI 代理一起使用它们。
从单个 `OpenAPI` 规范中，可以生成各种 `API` 生态系统组件。相同的规范可用于支持传统的客户端-服务器应用程序和 AI 代理集成。

## 如何使用

如果您想生成 [模型上下文协议 (MCP)](https://modelcontextprotocol.io/introduction) 的服务器，请将 `client` 属性定义为 `mcp`，将在目标文件和目录中生成 `MCP` 服务器。您可以查看 <a href="https://github.com/modelcontextprotocol/typescript-sdk" target="_blank">typescript-sdk</a>。

### 使用 orval.config.js 的示例

```ts
import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    input: {
      target: './petstore.yaml',
    },
    output: {
      mode: 'single',
      client: 'mcp',
      baseUrl: 'https://petstore3.swagger.io/api/v3',
      target: 'src/handlers.ts',
      schemas: 'src/http-schemas',
    },
  },
});
```

目前，请注意 `mcp` 客户端仅在 `single` 模式下工作。

### 生成的模板结构

`orval` 按以下结构生成文件：

```
src/
├── http-schemas
│   ├── createPetsBodyItem.ts
│   ├── error.ts
│   ├── index.ts
│   ├── listPetsParams.ts
│   ├── pet.ts
│   ├── pets.ts
│   └── updatePetByParamsParams.ts
├── handlers.ts
├── http-client.ts
├── server.ts
└── tool-schemas.zod.ts
```

每个生成的文件都有特定的用途：

- `http-schemas/`: 包含 `request`/`response` 数据的 `TypeScript` 类型定义的目录
- `handlers.ts`: 包含使用 `fetch` 客户端进行 `API` 调用并以 `MCP` 格式返回结果的处理器函数
- `http-client.ts`: 包含用于 `API` 通信的生成 `fetch` 客户端函数
- `server.ts`: 定义 `MCP 工具` 和服务器配置
- `tool-schemas.zod.ts`: 为 `MCP 工具` 输入定义 `Zod` 模式

### 使用生成的 MCP 服务器

要将生成的代码用作 `MCP 服务器`，请按照以下步骤操作：

1. 构建 Docker 镜像：

```sh
docker build ./ -t mcp-petstore
```

2. 在 AI 代理的配置中配置 MCP 服务器：

这里我们将介绍使用 `cline` 为 AI 代理进行的设置。它将与其他 AI 代理一起工作，因此请相应地调整详细设置。
对于 `clile`，请按如下方式指定：

```
{
  "mcpServers": {
    "petstore": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "mcp-petstore"
      ],
      "disabled": false,
      "alwaysAllow": []
    },
  }
}
```

此设置允许您的 AI 代理通过 MCP 协议与 petstore API 交互，使用生成的处理器和工具。

查看 <a href="https://github.com/orval-labs/orval/tree/master/samples/mcp/petstore" target="_blank">这里</a> 的完整示例。
