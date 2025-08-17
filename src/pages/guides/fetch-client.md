---
id: fetch-client
title: Fetch 客户端
---

如果您想使用 `fetch` API 作为 `swr` 或 `TanStack Query` 客户端的 HTTP 客户端，可以通过设置 `httpClient` 选项将 HTTP 客户端从 `axios` 更改为 `fetch` API。

```js
module.exports = {
  petstore: {
    output: {
      ...
      client: 'swr',
      httpClient: 'fetch'
      ...
    },
  },
};
```

```ts
/**
 * @summary List all pets
 */
export type listPetsResponse = {
  data: Pets | BadRequest;
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

  return normalizedParams.size
    ? `http://localhost:8000/pets?${normalizedParams.toString()}`
    : `http://localhost:8000/pets`;
};

export const listPets = async (
  params?: ListPetsParams,
  options?: RequestInit,
): Promise<listPetsResponse> => {
  const res = await fetch(getListPetsUrl(params), {
    ...options,
    method: 'GET',
  });
  const data: Pets =
    [204, 205, 304].includes(res.status) || !res.body ? {} : await res.json();

  return { status: res.status, data };
};

export const getListPetsKey = (params?: ListPetsParams) =>
  [`http://localhost:8000/pets`, ...(params ? [params] : [])] as const;

export type ListPetsQueryResult = NonNullable<
  Awaited<ReturnType<typeof listPets>>
>;
export type ListPetsQueryError = Promise<Pets | Error>;

/**
 * @summary List all pets
 */
export const useListPets = <TError = Promise<Pets | Error>>(
  params?: ListPetsParams,
  options?: {
    swr?: SWRConfiguration<Awaited<ReturnType<typeof listPets>>, TError> & {
      swrKey?: Key;
      enabled?: boolean;
    };
    fetch?: RequestInit;
  },
) => {
  const { swr: swrOptions, fetch: fetchOptions } = options ?? {};

  const isEnabled = swrOptions?.enabled !== false;
  const swrKey =
    swrOptions?.swrKey ?? (() => (isEnabled ? getListPetsKey(params) : null));
  const swrFn = () => listPets(params, fetchOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  );

  return {
    swrKey,
    ...query,
  };
};
```

## 返回原始定义的返回类型

当使用 `fetch` 作为 `httpClient` 时，默认情况下 `fetch` 响应类型包含 HTTP 状态。
如果使用 `swr` 或查询，我将访问像 `data.data` 这样的内容，这会很嘈杂，所以如果您想返回定义的返回类型而不是自动生成的返回类型，请将 `override.fetch.includeHttpResponseReturnType` 值设置为 `false`。

```js
module.exports = {
  petstore: {
    output: {
      ...
      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },
      },
    },
    ...
  },
};
```

```diff
/**
 * @summary List all pets
 */
- export type listPetsResponse = {
-   data: Pets | BadRequest;
-   status: number;
- };

export const listPets = async (
  params?: ListPetsParams,
  options?: RequestInit,
- ): Promise<listPetsResponse> => {
+ ): Promise<Pet> => {
  const res = await fetch(getListPetsUrl(params), {
    ...options,
    method: 'GET',
  });
  const data: Pets =
    [204, 205, 304].includes(res.status) || !res.body ? {} : await res.json();

-  return { status: res.status, data };
+  return data;
};
```

## 自定义 fetch 客户端

另外，如果您想使用自定义 fetch 客户端，可以在 override 选项中设置。

```js
module.exports = {
  petstore: {
    output: {
      ...
      client: 'swr',
      httpClient: 'fetch',
      override: {
        mutator: {
          path: './src/mutator.ts',
          name: 'customFetch',
        },
      },
    },
  },
};
```
