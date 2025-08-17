---
id: custom-axios-instance
title: 自定义 Axios 实例
---

您可以在配置中添加一个 mutator 函数来设置 axios 的自定义实例。

```js
module.exports = {
  petstore: {
    output: {
      ...
      override: {
        mutator: {
          path: './api/mutator/custom-instance.ts',
          name: 'customInstance',
        },
      },
    }
    ...
  },
};
```

```ts
// custom-instance.ts

import Axios, { AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({ baseURL: '<BACKEND URL>' }); // 在此处使用您自己的 URL 或环境变量

// 如果您想要为每个生成的查询传递额外的选项，请在此处添加第二个 `options` 参数
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

// 在某些情况下，使用 react-query 和 swr 时，您可能想要覆盖返回的错误类型，您也可以在这里这样做
export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;

// 或者，如果您想要包装 body 类型（可选）
// （如果自定义实例在发送数据之前处理数据，比如改变大小写等）
export type BodyType<BodyData> = CamelCase<BodyData>;
```
