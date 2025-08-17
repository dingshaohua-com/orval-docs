---
id: stream-ndjson
title: 流式换行分隔 JSON
---

## 介绍

`Orval` 生成正确类型化从 `NDJSON` 流式传输的响应的代码。
[NDJSON](https://en.wikipedia.org/wiki/JSON_streaming#Newline-delimited_JSON) 是一种流式传输 JSON 对象数组的技术。这主要用于数据集较大的情况。

## 如何使用

`Orval` 不生成实际解析流的代码，而是提供类型安全。您可以使用下面示例中的代码来了解如何实现读取流式数据。
只有在使用 `fetch` 客户端作为独立客户端或作为 [httpClient](../reference/configuration/output#httpclient) 时才支持适当的类型支持。

### 示例

```ts
// orval.config.ts
import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    input: {
      target: './stream.yaml',
    },
    output: {
      client: 'fetch',
      target: 'src/endpoints.ts',
      schemas: 'src/model',
    },
  },
});
```

```yml
openapi: 3.1.0
info:
  version: 1.0.0
  title: Stream
paths:
  /stream:
    get:
      operationId: stream
      description: Stream results
      responses:
        '200':
          description: The stream result.
          content:
            application/x-ndjson:
              schema:
                $ref: '#/components/schemas/StreamEntry'
components:
  schemas:
    StreamEntry:
      type: object
      properties:
        foo:
          type: number
        bar:
          type: string
```

```ts
// 生成的代码
interface TypedResponse<T> extends Response {
  json(): Promise<T>;
}

/**
 * Stream results
 */
export type streamResponse200 = {
  stream: TypedResponse<StreamEntry>;
  status: 200;
};
export type streamResponseComposite = streamResponse200;

export type streamResponse = streamResponseComposite & {
  headers: Headers;
};

export const getStreamUrl = () => {
  return `/stream`;
};

export const stream = async (
  options?: RequestInit,
): Promise<streamResponse> => {
  const stream = await fetch(getStreamUrl(), {
    ...options,
    method: 'GET',
    headers: { Accept: 'application/x-ndjson', ...options?.headers },
  });

  return {
    status: stream.status,
    stream,
    headers: stream.headers,
  } as streamResponse;
};
```

```ts
// 调用代码
export const readStream = <T extends object>(
  response: Response & { json(): Promise<T> },
  processLine: (value: T) => void | boolean,
  onError?: (response?: Response) => any,
): Promise<any> => {
  if (!response.ok && onError) {
    return onError(response);
  }
  if (!response.body) return Promise.resolve(() => {});

  const stream = response.body.getReader();
  const matcher = /\r?\n/;
  const decoder = new TextDecoder();
  let buffer = '';

  const loop: () => Promise<undefined> = () =>
    stream.read().then(({ done, value }) => {
      if (done) {
        if (buffer.length > 0) processLine(JSON.parse(buffer));
      } else {
        const chunk = decoder.decode(value, {
          stream: true,
        });
        buffer += chunk;

        const parts = buffer.split(matcher);
        buffer = parts.pop() ?? '';
        const validParts = parts.filter((p) => p);
        if (validParts.length !== 0) {
          for (const i of validParts) {
            const p = JSON.parse(i) as T;
            processLine(p);
          }
          return loop();
        }
      }
    });

  return loop();
};

export const getResult = async () => {
  const results: StreamEntry[] = [];

  const streamResponse = await stream();
  if (streamResponse.status !== 200) return results;

  // 当流完成时，Promise 被解析。
  await readStream(streamResponse.stream, (obj) => {
    // obj 被类型化为 StreamEntry
    results.push(obj);
  });
  return results;
};
```
