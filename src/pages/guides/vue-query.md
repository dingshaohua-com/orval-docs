---
id: vue-query
title: Vue Query
---

您应该有一个 OpenAPI 规范和一个 Orval 配置，其中您将模式定义为 vue-query。

## 使用 Vue Query 的示例

```js
module.exports = {
  petstore: {
    output: {
      mode: 'tags-split',
      target: 'src/petstore.ts',
      schemas: 'src/model',
      client: 'vue-query',
      mock: true,
    },
    input: {
      target: './petstore.yaml',
    },
  },
};
```

查看 [orval 配置](../reference/configuration/full-example) 参考以了解所有可用选项。

Vue Query 模式将为 OpenAPI 规范中的每个路径生成一个实现文件，每个路径都有一个自定义钩子。

就像来自这个 <a href="https://github.com/orval-labs/orval/blob/master/samples/vue-query/petstore.yaml" target="_blank">swagger</a> 的以下示例：

```ts
export const showPetById = (
  petId: string,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<Pet>> => {
  return axios.get(`/pets/${petId}`, options);
};

export const getShowPetByIdQueryKey = (petId: string) => [`/pets/${petId}`];

export const useShowPetById = <
  TData = AsyncReturnType<typeof showPetById>,
  TError = Error,
>(
  petId: string,
  options?: {
    query?: UseQueryOptions<AsyncReturnType<typeof showPetById>, TError, TData>;
    axios?: AxiosRequestConfig;
  },
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getShowPetByIdQueryKey(petId);
  const queryFn = () => showPetById(petId, axiosOptions);

  const query = useQuery<AsyncReturnType<typeof queryFn>, TError, TData>(
    queryKey,
    queryFn,
    {
      enabled: !!petId,
      ...queryOptions,
    },
  );

  return {
    queryKey,
    ...query,
  };
};
```

## 如何使用其他查询

使用以下示例，Orval 将生成一个带有 nextId 查询参数的 useQuery 和 useInfiniteQuery。您还可以通过 options 属性为每个配置覆盖配置。

```js
module.exports = {
  petstore: {
    output: {
      ...
      override: {
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: 'nextId',
          options: {
            staleTime: 10000,
          },
        },
      },
    },
    ...
  },
};
```

如果需要，您还可以直接覆盖到操作或标签

```js
module.exports = {
  petstore: {
    output: {
      ...
      override: {
        operations: {
          listPets: {
            query: {
              ...
            },
          }
        },
      },
    }
    ...
  },
};
```

查看 <a href="https://github.com/orval-labs/orval/tree/master/samples/vue-query" target="_blank">这里</a> 的完整示例
