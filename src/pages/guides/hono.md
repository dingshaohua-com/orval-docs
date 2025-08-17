---
id: hono
title: Hono
---

如果您想要生成 hono，请将 `client` 属性定义为 `hono`，将在目标文件和目录中生成 `Hono` 模板。您可以查看 <a href="https://hono.dev/docs/getting-started/cloudflare-workers" target="_blank">Hono</a>。

## orval.config.js 示例

```js
module.exports = {
  petstore: {
    input: {
      target: './petstore.yaml',
    },
    output: {
      mode: 'split',
      client: 'hono',
      target: 'src/petstore.ts',
      override: {
        hono: {
          handlers: 'src/handlers',
        },
      },
    },
  },
};
```

## 生成模板

`orval` 生成如下文件：

```
src/
├── handlers
│   ├── createPets.ts
│   ├── listPets.ts
│   ├── showPetById.ts
│   └── updatePets.ts
├── index.ts
├── petstore.context.ts
├── petstore.schemas.ts
├── petstore.ts
├── petstore.validator.ts
└── petstore.zod.ts
```

- petstore.ts: 初始化 hono 并定义端点。
- handlers: 包含每个端点的模板。
- petstore.schemas.ts: 定义请求和响应模式。
- petstore.validator.ts: 实现 hono 验证器。
- petstore.zod.ts: 使用 zod 定义验证模式。
- petstore.context.ts: 定义端点的上下文。

## 在处理器中实现端点处理

`Orval` 为 `Hono` 生成处理器模板。例如，查看 `listPets.ts`。
为请求和响应定义了验证。只是没有实现实际的处理逻辑。

```ts
import { createFactory } from 'hono/factory';
import { zValidator } from '../petstore.validator';
import { ListPetsContext } from '../petstore.context';
import { listPetsQueryParams, listPetsResponse } from '../petstore.zod';

const factory = createFactory();

export const listPetsHandlers = factory.createHandlers(
  zValidator('query', listPetsQueryParams),
  zValidator('response', listPetsResponse),
  async (c: ListPetsContext) => {},
);
```

您只需根据响应模式定义响应即可实现 API。

```diff
import { createFactory } from 'hono/factory';
import { zValidator } from '../petstore.validator';
import { ListPetsContext } from '../petstore.context';
import { listPetsQueryParams, listPetsResponse } from '../petstore.zod';

const factory = createFactory();

export const listPetsHandlers = factory.createHandlers(
  zValidator('query', listPetsQueryParams),
  zValidator('response', listPetsResponse),
  async (c: ListPetsContext) => {
+    return c.json([
+      {
+        id: 1,
+        name: 'doggie',
+      },
+    ]);
  },
);
```

## 运行 `Hono` 开发服务器

您可以使用 `wrangler dev` 命令运行和检查。
入口点是 `src/petstore.ts` 而不是 `src/index.ts`。

```bash
yarn wrangler dev src/petstore.ts
curl http://localhost:8787/pets #=> [{"id":1,"name":"doggie"}]
```

查看 <a href="https://github.com/orval-labs/orval/tree/master/samples/hono/hono-with-zod" target="_blank">这里</a> 的完整示例。如果您想使用 `Hono`、`fetch` 和 `Next.js` 用 `TypeScript` 开发前端和后端，请也查看 <a href="https://github.com/orval-labs/orval/tree/master/samples/hono/hono-with-fetch-client" target="_blank">这里</a>。

## 在 `OpenAPI` 中使用复合路由和按标签分割的处理器

如果您想使用 `tags` 或 `tags-split` 模式（按 `OpenAPI` 中定义的标签分割处理器），但想生成复合的单个 `hono` 路由文件，请将文件路径（如 `src/routes.ts`）定义到 `override.hono.compositeRoute` 属性，`Hono` 模板将在目标文件和目录中生成复合根文件。

```js
module.exports = {
  petstore: {
    input: {
      target: './petstore.yaml',
    },
    output: {
      mode: 'tags-split',
      client: 'hono',
      target: 'src/endpoints',
      schemas: 'src/schemas',
      override: {
        hono: {
          compositeRoute: 'src/routes.ts',
        },
      },
    },
  },
};
```

然后它将按如下方式生成：

```
src/
├── endpoints
│   ├── pets
│   │   ├── pets.context.ts
│   │   ├── pets.handlers.ts
│   │   └── pets.zod.ts
│   └── validator.ts
├── routes.ts
└── schemas
    ├── pet.ts
    └── pets.ts
```

`routes.ts` 复合所有路由，如下所示：

```ts:routes.ts
import { Hono } from 'hono';
import {
  listPetsHandlers,
  createPetsHandlers,
  updatePetsHandlers,
  showPetByIdHandlers,
} from './endpoints/pets/pets.handlers';

const app = new Hono();

app.get('/pets', ...listPetsHandlers);
app.post('/pets', ...createPetsHandlers);
app.put('/pets', ...updatePetsHandlers);
app.get('/pets/:petId', ...showPetByIdHandlers);

export default app;
```

您可以准备一个像 `app.ts` 这样的 hono 服务器，并像这样嵌入：

```ts:app.ts
import { Hono } from 'hono';
import routes from './routes';

const app = new Hono();

app.route('/', routes);

export default app;
```

像往常一样运行 `Hono` 开发服务器。

```bash
yarn wrangler dev src/app.ts
curl http://localhost:8787/pets #=> [{"id":1,"name":"doggie"}]
```

查看 <a href="https://github.com/orval-labs/orval/tree/master/samples/hono/composite-routes-with-tags-split" target="_blank">这里</a> 的完整示例。
