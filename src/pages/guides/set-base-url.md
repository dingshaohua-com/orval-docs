---
id: use-your-own-base-url
title: 使用您自己的基础 URL
---

Orval 允许您为每个 OpenAPI 规范设置自定义基础 URL。这可以是规范中省略的 URL 部分或整个 URL。您还可以配置 Orval 读取规范中的 `servers` 字段。

```ts
module.exports = {
  petstore: {
    output: {
      target: 'src/petstore.ts',
      baseUrl: '/api/v2',
      // baseUrl: 'https://petstore.swagger.io/v2',
    },
  },
};
```

## 使用 OpenAPI 规范中的 URL

如果您想使用规范中定义的 URL（由 `servers` 字段描述），可以将 `getBaseUrlFromSpecification` 设置为 `true`，这将使 Orval 正确识别每个操作使用的基础 URL。在 [输出配置](../reference/configuration/output#baseurl) 中了解更多关于不同设置的信息。

```ts
module.exports = {
  petstore: {
    output: {
      target: 'src/petstore.ts',
      baseUrl: {
        getBaseUrlFromSpecification: true,
        variables: {
          environment: 'api.dev',
        },
      },
    },
  },
};
```

也可以在您的 HTTP 客户端上直接配置基础 URL。

## Axios

您可以为所有请求设置默认的 baseUrl：

```ts
axios.defaults.baseURL = '<BACKEND URL>'; // 在此处使用您自己的 URL 或环境变量
```

您也可以使用拦截器来实现：

```ts
axios.interceptors.request.use((config) => {
  return {
    ...config,
    baseURL: '<BACKEND URL>', // 在此处使用您自己的 URL 或环境变量
  };
});
```

还可以创建自定义的 axios 实例。查看 [完整指南](../guides/custom-axios) 了解更多详情。

```ts
const AXIOS_INSTANCE = axios.create({ baseURL: '<BACKEND URL>' }); // 在此处使用您自己的 URL 或环境变量
```

## Fetch 客户端

另外，如果您使用 `fetch` 客户端，仍然可以通过自定义 fetch 客户端设置请求 URL。

```ts
const getUrl = (contextUrl: string): string => {
  const url = new URL(contextUrl);
  const pathname = url.pathname;
  const search = url.search;
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'productionBaseUrl'
      : 'http://localhost:3000';

  const requestUrl = new URL(`${baseUrl}${pathname}${search}`);

  return requestUrl.toString();
};

export const customFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestInit: RequestInit = {
    ...options,
  };

  const request = new Request(requestUrl, requestInit);
  const response = await fetch(request);
  const data = await getBody<T>(response);

  return { status: response.status, data } as T;
};
```

请参考完整示例 [这里](https://github.com/orval-labs/orval/blob/master/samples/next-app-with-fetch/custom-fetch.ts)

## Angular HTTP 客户端

您可以使用拦截器自动添加 API 的 URL。就像添加授权头一样。

```ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `<BACKEND URL>/${req.url}` });
    return next.handle(apiReq);
  }
}
```

还要记住在模块的提供者中添加拦截器。

```ts
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true,
  },
];
```

## 其他客户端

根据您使用的客户端，您需要自己添加它
