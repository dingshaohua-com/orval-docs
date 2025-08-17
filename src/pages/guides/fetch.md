---
id: fetch
title: Fetch
---

与使用 `Axios` 相比，`fetch` API 具有减少应用程序包大小的优势。它还可以在服务器端框架和边缘计算运行时（如 `Cloudflare`、`Vercel Edge` 和 `Deno`）中充当 `http 客户端`。

您应该有一个 `OpenAPI` 规范和一个 `Orval` 配置，其中您将模式定义为 `fetch`。

## 使用 fetch 的示例

```ts
import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    output: {
      mode: 'tags-split',
      target: 'app/gen/petstore.ts',
      schemas: 'app/gen/models',
      client: 'fetch',
      baseUrl: 'http://localhost:3000',
      mock: true,
    },
    input: {
      target: './petstore.yaml',
    },
  },
});
```

查看 [orval 配置](../reference/configuration/full-example) 参考以了解所有可用选项。
就像来自这个 <a href="https://github.com/orval-labs/orval/blob/master/samples/next-app-with-fetch/petstore.yaml" target="_blank">`OpenAPI` 规范</a> 的以下示例：

```ts
/**
 * @summary List all pets
 */
export type listPetsResponse = {
  data: Pets;
  status: number;
};

export const getListPetsUrl = (params?: ListPetsParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === null) {
      normalizedParams.append(key, 'null');
    } else if (value !== undefined) {
      normalizedParams.append(key, value.toString());
    }
  });

  return `http://localhost:3000/pets?${normalizedParams.toString()}`;
};

export const listPets = async (
  params?: ListPetsParams,
  options?: RequestInit,
): Promise<listPetsResponse> => {
  const res = await fetch(getListPetsUrl(params), {
    ...options,
    method: 'GET',
  });
  const data = await res.json();

  return { status: res.status, data };
};
```

`fetch` 客户端将为您的 `OpenAPI` 规范中的每个路径生成一个实现文件，包含以下内容：

1. `fetch` 函数的响应类型
2. 生成包含查询参数和路径参数的请求 URL 的函数
3. 调用 `fetch` API 的函数。

查看 <a href="https://github.com/orval-labs/orval/blob/master/samples/next-app-with-fetch" target="_blank">这里</a> 的完整示例

## 自定义函数

您可以在配置中添加自定义 `fetch` 函数。

```ts
module.exports = {
  petstore: {
    output: {
      ...
      override: {
        mutator: {
          path: './custom-fetch.ts',
          name: 'customFetch',
        },
      },
    }
    ...
  },
};
```

然后，您准备像 <a href="https://github.com/orval-labs/orval/blob/master/samples/next-app-with-fetch/custom-fetch.ts" target="_blank">示例实现</a> 一样
然后，您可以生成一个调用 `customFetch` 函数的 `fetch` 客户端，如下所示：

```ts
export const listPets = async (
  params?: ListPetsParams,
  options?: RequestInit,
): Promise<listPetsResponse> => {
  return customFetch<Promise<listPetsResponse>>(getListPetsUrl(params), {
    ...options,
    method: 'GET',
  });
};
```
