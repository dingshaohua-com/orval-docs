---
id: msw
title: MSW
---

如果您想生成模拟，请将 `mock` 属性定义为 `true`，将在目标文件中生成 `MSW` 的模拟。您可以查看 <a href="https://mswjs.io/" target="_blank">MSW</a> 以在项目中正确配置 MSW。

## orval.config.js 示例

```js
module.exports = {
  'petstore-file-transfomer': {
    output: {
      mode: 'single',
      target: './src/petstore.ts',
      schemas: './src/model',
      mock: true,
    },
    input: {
      target: './petstore.yaml',
    },
  },
};
```

模拟定义由以下三个函数组成。

1. 返回模式对象模拟值的函数
2. 返回将模拟对象绑定到 `MSW` HTTP 请求处理器的值的函数
3. 返回聚合文件中所有处理器的 `Array` 的函数

## 返回模式对象模拟值的函数

返回模拟对象的函数将按如下方式生成：

```typescript
import { faker } from '@faker-js/faker';

export const getShowPetByIdResponseMock = (
  overrideResponse: Partial<Pet> = {},
): Pet => ({
  id: faker.number.int({ min: undefined, max: undefined }),
  name: faker.string.alpha(20),
  tag: faker.string.alpha(20),
  ...overrideResponse,
});
```

该值在 `faker.js` 中实现。
如果您想覆盖对象的一部分，可以通过将其指定为函数参数来编写模拟值。

```typescript
import { getShowPetByIdMock } from 'pets.msw';

const pet = getShowPetByIdResponseMock({ name: 'override' });
console.log(pet);
// => { id: 7272122785202176, ​name: "override", tag: undefined }
```

## 返回将模拟对象绑定到 `MSW` HTTP 请求处理器的值的函数

生成一个函数，返回绑定到 `MSW` HTTP 请求处理器的模拟对象的值，如下所示：

```typescript
import { HttpResponse, delay, http } from 'msw';

export const getShowPetByIdMockHandler = (
  overrideResponse?:
    | Pet
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<Pet> | Pet),
) => {
  return http.get('*/pets/:petId', async (info) => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getShowPetByIdResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};
```

如果您想覆盖模拟的 HTTP 响应对象，可以通过将其指定为函数参数来编写对象。

```typescript
import { Pet } from './gen/model/pet';
import { getShowPetByIdMockHandler } from 'petstore.msw';

const pet: Pet = { id: 1, name: 'test', tag: 'test' };

const showPetByIdMockHandler = getShowPetByIdMockHandler(pet);
console.log(showPetByIdMockHandler);
// => Object { info: {…}, isUsed: false, resolver: async getShowPetByIdMockHandler(), resolverGenerator: undefined, resolverGeneratorResult: undefined, options: {} }
```

您也可以传递一个函数作为参数，每次向 API 发出请求时都会调用该函数。

```ts
getShowPetByIdMockHandler((info) => {
  const body = await info.request.json();

  return { message: `body: ${body}` };
});
```

例如，如果您想在测试中使用生成的模拟来验证 API 是否被调用，可以按如下方式使用：

```ts
import { expect, vi } from 'vitest';
import { getShowPetByIdMock, getShowPetByIdMockHandler } from 'pets.msw';

const mockFn = vi.fn();

const mock = [
  getShowPetByIdMockHandler((info) => {
    const body = await info.request.json();

    mockFn(body);
    return getShowPetByIdResponseMock();
  }),
];

expect(mockFn).toHaveBeenCalledTimes(1);
```

## 返回聚合文件中所有处理器的 `Array` 的函数

聚合所有返回处理器的函数，并生成一个返回 `Array` 的函数，如下所示：

```typescript
export const getPetsMock = () => [
  getListPetsMockHandler(),
  getCreatePetsMockHandler(),
  getShowPetByIdMockHandler(),
];
```

您可以使用此函数运行 `MSW` 服务器。

```typescript
import { getPetsMock } from 'petstore.msw';
import { setupServer } from 'msw/node';

const server = setupServer();
server.use(...getPetsMock());
```
