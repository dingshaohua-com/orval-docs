---
id: swr
title: SWR
---

您应该有一个 OpenAPI 规范和一个 Orval 配置，其中您将模式定义为 swr。

## 使用 SWR 的示例

```js
module.exports = {
  petstore: {
    output: {
      mode: 'tags-split',
      target: 'src/petstore.ts',
      schemas: 'src/model',
      client: 'swr',
      mock: true,
    },
    input: {
      target: './petstore.yaml',
    },
  },
};
```

查看 [orval 配置](../reference/configuration/full-example) 参考以了解所有可用选项。

SWR 模式将为 OpenAPI 规范中的每个路径生成一个实现文件，每个路径都有一个自定义钩子。

就像来自这个 <a href="https://github.com/orval-labs/orval/blob/master/samples/react-app-with-swr/petstore.yaml" target="_blank">swagger</a> 的以下示例：

```ts
export const showPetById = (
  petId: string,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<Pet>> => {
  return axios.get(`/pets/${petId}`, options);
};

export const getShowPetByIdKey = (petId: string) => [`/pets/${petId}`];
Re;

export const useShowPetById = <TError = Error>(
  petId: string,
  options?: {
    swr?: SWRConfiguration<AsyncReturnType<typeof showPetById>, TError> & {
      swrKey?: Key;
      enabled?: boolean;
    };
    axios?: AxiosRequestConfig;
  },
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnabled = swrOptions?.enabled !== false && !!petId;
  const swrKey =
    swrOptions?.swrKey ?? (() => (isEnabled ? getShowPetByIdKey(petId) : null));
  const swrFn = () => showPetById(petId, axiosOptions);

  const query = useSwr<AsyncReturnType<typeof swrFn>, TError>(
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

查看 <a href="https://github.com/orval-labs/orval/blob/master/samples/react-app-with-swr" target="_blank">这里</a> 的完整示例
