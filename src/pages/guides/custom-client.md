---
id: custom-client
title: 自定义 HTTP 客户端
---

您可以在配置中添加一个 mutator 函数来设置您首选 HTTP 客户端的自定义实例。

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

const baseURL = '<BACKEND URL>'; // 在此处使用您自己的 URL 或环境变量

export const customInstance = async <T>(
  url: string,
  {
    method,
    params,
    body,
  }: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    params?: any;
    body?: BodyType<unknown>;
    responseType?: string;
  },
): Promise<T> => {
  let targetUrl = `${baseURL}${url}`;

  if (params) {
    targetUrl += '?' + new URLSearchParams(params);
  }

  const response = await fetch(targetUrl, {
    method,
    body,
  });

  return response.json();
};

export default customInstance;

// 在某些情况下，使用 react-query 和 swr 时，您可能想要覆盖返回的错误类型，您也可以在这里这样做
export type ErrorType<Error> = AxiosError<Error>;
// 如果您想要包装 body 类型（可选）
// （如果自定义实例在发送数据之前处理数据，比如改变大小写等）
export type BodyType<BodyData> = CamelCase<BodyType>;
```

或者，请参考使用 Next.js 自定义 fetch 的示例应用 [这里](https://github.com/orval-labs/orval/blob/master/samples/next-app-with-fetch/custom-fetch.ts)。

## Angular

即使您使用 `angular` 客户端，您也可以在配置中添加 mutator 函数来设置您首选的 HTTP 客户端。

```js
module.exports = {
  petstore: {
    output: {
      ...
      override: {
        mutator: 'src/api/mutator/response-type.ts'
      }
    }
    ...
  },
};
```

```ts
// response-type.ts

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const responseType = <Result>(
  {
    url,
    method,
    params,
    data,
  }: {
    url: string;
    method: string;
    params?: any;
    data?: any;
    headers?: any;
  },
  http: HttpClient,
): Observable<Result> =>
  http.request<Result>(method, url, {
    params,
    body: data,
    responseType: 'json',
  });

export default responseType;
```

请也参考示例应用了解更多详情。

https://github.com/orval-labs/orval/tree/master/samples/angular-app
