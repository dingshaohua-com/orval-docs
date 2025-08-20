---
id: configuration-output
title: 输出配置
---

## target

类型：`String`。

有效值：包含实现的文件路径。

```js
module.exports = {
  petstore: {
    output: {
      target: 'src/petstore.ts',
    },
  },
};
```

## client

类型：`String | Function`。

有效值：`angular`、`axios`、`axios-functions`、`react-query`、`svelte-query`、`vue-query`、`swr`、`zod`、`fetch`。

默认值：`axios-functions`。

```js
module.exports = {
  petstore: {
    output: {
      client: 'react-query',
    },
  },
};
```

如果您想要扩展或创建自定义客户端生成器，可以提供一个函数，该函数接收 [GeneratorClients](https://github.com/orval-labs/orval/blob/master/packages/core/src/types.ts#L156) 作为参数，并应返回 [ClientGeneratorsBuilder](https://github.com/orval-labs/orval/blob/master/packages/core/src/types.ts#L652)。

## httpClient

类型：`String`。

有效值：`fetch`、`axios`。

默认值：`axios`。

```js
module.exports = {
  petstore: {
    output: {
      client: 'swr',
      httpClient: 'fetch',
    },
  },
};
```

如果您想使用 `fetch` API 作为 http 客户端，可以在 `httpClient` 选项中指定 `fetch`。
`httpClient` 仅在 `client` 选项指定为 `swr`、`react-query`、`vue-query` 和 `svelte-query` 时可用。

## schemas

类型：`String`。

有效值：要生成所有模型的文件夹路径。

默认值：与 target 相同。

```js
module.exports = {
  petstore: {
    output: {
      schemas: './api/model',
    },
  },
};
```

## fileExtension

类型：`String`。

默认值：`.ts`。

指定自动生成文件的文件扩展名。`tags`、`tags-split` 和 `split` 等模式不会改变 `schema` 文件；它们只涉及 `client` 文件。

```js
module.exports = {
  petstore: {
    output: {
      mode: 'split',
      target: './gen/endpoints',
      schemas: './gen/model',
      fileExtension: '.gen.ts',
    },
  },
};
```

```
src/gen/
├── endpoints
│   └── swaggerPetstore.gen.ts
└── model
    ├── listPetsParams.ts
    └── pets.ts
```

## namingConvention

类型：`String`。

有效值：`camelCase`、`PascalCase`、`snake_case`、`kebab-case`。

默认值：`camelCase`。

指定生成**文件**的命名约定。

如果您要查找**属性键**的命名约定，请参见 [namingConvention](#namingconvention-for-property-keys)。

```js
module.exports = {
  petstore: {
    output: {
      namingConvention: 'PascalCase',
      mode: 'split',
      target: './gen/endpoints',
      schemas: './gen/model',
      fileExtension: '.gen.ts',
    },
  },
};
```

```
src/gen/
├── endpoints
│   └── SwaggerPetstore.gen.ts
└── model
    ├── ListPetsParams.ts
    └── Pets.ts
```

## workspace

类型：`String`。

有效值：包含所有生成文件的文件夹路径。此值将用作 orval 配置中使用的所有其他路径的基础。

如果您提供此选项，还将创建一个包含所有可用导出的 `index.ts` 文件

```js
module.exports = {
  petstore: {
    output: {
      workspace: 'src/'
      target: './petstore.ts',
    },
  },
};
```

## mode

类型：`String`。

有效值：`single`、`split`、`tags`、`tags-split`。

默认值：`single`。

```js
module.exports = {
  petstore: {
    output: {
      mode: 'tags-split',
    },
  },
};
```

### 值：single

用于将所有内容放在一个文件中

```js
module.exports = {
  petstore: {
    output: {
      target: 'src/petstore.ts',
      mock: true,
    },
  },
};
```

```
my-app
└── src
    └── petstore.ts
```

这里将在 src 中创建一个包含您的规范实现的单个 petstore 文件。

### 值：split

用于将实现、模式、模拟放在不同的文件中

```js
module.exports = {
  petstore: {
    output: {
      target: 'src/petstore.ts',
      mock: true,
      mode: 'split',
    },
  },
};
```

```
my-app
└── src
    ├── petstore.schemas.ts
    ├── petstore.msw.ts
    └── petstore.ts
```

根据配置，您将在 src 中创建多个以 petstore 命名并带有前缀的文件。

- petstore.schemas.ts
- petstore.ts
- petstore.msw.ts

对于 Angular：

=> petstore.ts 是 petstore.service.ts

### 值：tags

如果您希望每个标签一个文件，请使用此模式。标签是 OpenAPI 规范标签的引用。如果您的所有宠物调用都有一个 `pets` 标签，那么 Orval 将在目标文件夹中生成一个 pets.ts 文件

```js
module.exports = {
  petstore: {
    output: {
      target: 'src/petstore.ts',
      mock: true,
      mode: 'tags',
    },
  },
};
```

```
my-app
└── src
    ├── pets.ts
    └── petstore.schemas.ts
```

对于 Angular：

=> petstore.ts 是 petstore.service.ts

如果您不使用 `schemas` 属性，将只创建一个包含每个标签所有模型的文件。

### 值：tags-split

此模式是标签和拆分模式的组合。Orval 将在目标文件夹中为每个标签生成一个文件夹，并在这些文件夹中拆分为多个文件。

```js
module.exports = {
  petstore: {
    output: {
      target: 'src/petstore.ts',
      mock: true,
      mode: 'tags-split',
    },
  },
};
```

```
my-app
└── src
    ├── petstore.schemas.ts
    └── pets
        ├── petstore.msw.ts
        └── petstore.ts
```

与标签模式相同，如果您不使用 `schemas` 属性，将只创建一个包含每个标签所有模型的文件。

## indexFiles

类型：`Boolean`

有效值：true 或 false。默认为 true。

指定是否在 `schemas` 生成中放置 `index.ts`。

示例：

```js
module.exports = {
  petstore: {
    output: {
      schemas: 'src/gen/model',
      indexFiles: false,
    },
  },
};
```

## title

类型：`String` 或 `Function`。

有效值：函数的路径或实现。

```js
module.exports = {
  output: {
    override: {
      title: (title) => `${title}Api`,
    },
  },
};
```

## baseUrl

类型：`String | Object`。

默认值：`''`。

允许您设置用于所有 API 调用的 baseUrl。这可以是常量字符串，也可以配置为从规范中的 `servers` 字段读取。

使用常量的示例：

```js
module.exports = {
  petstore: {
    output: {
      baseUrl: 'https://api.example.com', // 为所有 api 调用添加前缀 https://api.example.com
    },
  },
};
```

### getBaseUrlFromSpecification

类型：`boolean`

设置为 `true` 使 Orval 从规范中的 `servers` 字段读取 url。如果路径定义了 `servers` 字段，将使用该 url，否则将使用整个规范的 `servers` 字段中的 url。
如果设置为 `false`，必须设置常量 `baseUrl`。

示例：

```yaml
servers:
  - url: https://api.example.com
paths:
  /pets:
    servers:
      - url: https://pets.example.com
```

```js
module.exports = {
  petstore: {
    output: {
      baseUrl: {
        getBaseUrlFromSpecification: true,
        // 为所有调用添加规范中定义的 url 前缀，在此示例中：'https://api.example.com'
        // 除了对 /pets 的调用，它将使用 'https://pets.example.com' 作为基础 url。
      },
    },
  },
};
```

### variables

类型：`Dictionary`。

仅在 `getBaseUrlFromSpecification` 为 `true` 时有效。
用于替换 url 中的变量。
如果规范中的变量是枚举，并且配置中提供的值不是允许值之一，生成时将发生错误。
如果要替换的变量未配置，将使用规范中定义的默认值。

示例：

```yaml
servers:
  - url: https://{environment}.example.com/v1
    variables:
      environment:
        default: api
        enum:
          - api
          - api.dev
          - api.staging
```

```js
module.exports = {
  petstore: {
    output: {
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

### index

类型：`Number`。

仅在 `getBaseUrlFromSpecification` 为 `true` 时有效。
由于 `servers` 字段允许定义多个 url，您可以在此决定选择哪个 url 索引。
如果未定义，将使用第一个 url。
如果定义的索引超出数组范围，将选择数组中的最后一个 url。

示例：

```yaml
servers:
  - url: https://api.example.com/v1
  - url: https://api.dev.example.com/v1
```

```js
module.exports = {
  petstore: {
    output: {
      baseUrl: {
        getBaseUrlFromSpecification: true,
        index: 1,
      },
    },
  },
};
```

### baseUrl

类型：`String`。

仅在 `getBaseUrlFromSpecification` 为 `false` 时有效。
行为与直接将 baseUrl 设置为字符串相同。

示例：

```js
module.exports = {
  petstore: {
    output: {
      baseUrl: {
        getBaseUrlFromSpecification: false,
        baseUrl: 'https://api.example.com', // 与设置 petstore.output.baseUrl: 'https://api.example.com' 相同
      },
    },
  },
};
```

与以下设置结果相同：

```js
module.exports = {
  petstore: {
    output: {
      baseUrl: 'https://api.example.com',
    },
  },
};
```

## mock

类型：`Boolean | Object | Function`。

默认值：`false`。

默认情况下（如果值设置为 true），将使用 <a href="https://github.com/faker-js/faker" target="_blank">faker</a> 和 <a href="https://mswjs.io/" target="_blank">msw</a> 生成您的模拟数据。

```js
module.exports = {
  petstore: {
    output: {
      mock: true,
    },
  },
};
```

如果将其设置为对象，模拟选项可以接受一些属性来自定义生成。如果设置为 `true`，将使用默认选项。默认选项为：

```js
module.exports = {
  petstore: {
    output: {
      mock: {
        type: 'msw',
        delay: 1000,
        useExamples: false,
      },
    },
  },
};
```

如果您想要扩展或创建自定义模拟生成器，可以提供一个函数，并在[这里](https://github.com/orval-labs/orval/blob/master/src/types/generator.ts#L132)查看类型。

要了解所有可用选项，请阅读下文。

### type

类型：`String`。

默认值：`msw`。

有效值：`msw`、`cypress`（即将推出）。

用于指定要生成的模拟类型。

### delay

类型：`Number | Function | false`。

默认值：`1000`。

用于指定模拟的延迟时间。它可以是固定数字、false 或返回数字的函数。
将 delay 设置为 false 会完全移除延迟调用。

### delayFunctionLazyExecute

类型：`boolean`。

为您提供将传递给 `delay` 的函数在运行时执行而不是在生成模拟时执行的可能性。

### useExamples

类型：`Boolean`。

为您提供使用 OpenAPI 规范中的 `example`/`examples` 字段作为模拟值的可能性。

### generateEachHttpStatus

类型：`Boolean`。

为您提供为 OpenAPI 规范中 `responses` 字段中的所有 HTTP 状态生成模拟的可能性。默认情况下只生成 200 OK 响应。

### baseUrl

类型：`String`。

为您提供为模拟处理程序设置基础 url 的可能性。

### locale

类型：`String`。

默认值：`en`。

为您提供为模拟生成设置区域设置的可能性。它由 faker 使用，可用选项列表请参见[这里](https://fakerjs.dev/guide/localization.html#available-locales)。使用 `defineConfig` 时也应该是强类型的。

## indexMockFiles

类型：`Boolean`

默认值：`false`。

当为 `true` 时，添加一个导出所有模拟函数的 `index.msw.ts` 文件。
这仅在 `mode` 为 `tags-split` 时有效。

示例：

```js
module.exports = {
  petstore: {
    output: {
      mode: 'tags-split',
      mock: {
        indexMockFiles: true,
      },
    },
  },
};
```

## docs

类型：`Boolean | Object`。

默认值：`false`。

将使用 [TypeDoc](https://typedoc.org/) 生成 API 文档。默认情况下，这些文档将采用 Markdown 格式。

TypeDoc 可以通过将[选项](https://typedoc.org/options/)传递给 `docs` 对象来配置，或者通过在项目根目录中创建配置文件（例如 `typedoc.config.mjs`）（支持的文件名完整列表请参见[配置文档](https://typedoc.org/options/configuration/#options)），或者通过将配置文件名传递给下面的 `configPath` 选项来配置。

更多详细信息请参见 TypeDoc [配置文档](https://typedoc.org/options/)。

如果将 `docs` 选项设置为对象，它可以接受一些属性来自定义生成。如果设置为 `true`，将使用默认选项。

当 `config` 中未指定输出目录目标时，文件将默认输出到 `docs` 目录。

配置示例请参见此[示例](https://github.com/orval-labs/orval/tree/master/samples/react-app/orval.config.ts)。

### configPath

类型：`String`。

用于指定 TypeDoc 配置文件名。如果您的项目已经有用于其他文档的 TypeDoc 配置，这会很有用。

## clean

类型：`Boolean | String[]`。

默认值：`false`。

可用于清理生成的文件。如果要自定义删除的内容，请提供 glob 数组。

小心清理所有输出目标和模式文件夹。

## prettier

类型：`Boolean`。

默认值：`false`。

可用于美化生成的文件。您需要全局安装 prettier。

## biome

类型：`Boolean`。

默认值：`false`。

您可以对生成的文件应用 [`biome`](https://biomejs.dev/) 的 `lint` 和 `format`。您需要在依赖项中包含 `@biomejs/biome`。

自动生成的源代码不符合 `biome` 默认规则集中包含的某些 lint 规则，因此请在您的 `biome` 配置文件中控制它们。

## headers

类型：`Boolean`。

用于启用头部的生成

## tsconfig

类型：`String | Tsconfig`。

应该自动找到并对您透明。
可用于指定 `tsconfig` 的路径或直接指定您的配置。

## packageJson

类型：`String`。

应该自动找到并对您透明。
可用于指定 `package.json` 的路径。

## override

类型：`Object`。

为您提供覆盖输出的可能性，如您的模拟实现或按您想要的方式转换 API 实现

### transformer

类型：`String` 或 `Function`。

有效值：转换器函数的路径或实现。

此函数在生成时为每个调用执行，接受 <a href="https://github.com/orval-labs/orval/blob/master/packages/core/src/types.ts#L823" target="_blank">GeneratorVerbOptions</a> 作为参数，并应返回 <a href="https://github.com/orval-labs/orval/blob/master/packages/core/src/types.ts#L823" target="_blank">GeneratorVerbOptions</a>

```js
module.exports = {
  petstore: {
    output: {
      override: {
        transformer: 'src/yourfunction.js',
      },
    },
  },
};
```

### mutator

类型：`String` 或 `Object`。

有效值：mutator 函数的路径或包含路径和名称的对象。

如果您提供对象，还可以添加 default 属性来使用导出默认函数。

此函数在每次调用时执行。它将传递给动词的所有选项作为参数，并应返回带有您的自定义实现或首选 HTTP 客户端的 promise。

可能的参数：

- 第一个参数将是具有以下类型的对象。

```ts
// 基于 AxiosRequestConfig
interface RequestConfig {
  method: 'get' | 'put' | 'patch' | 'post' | 'delete';
  url: string;
  params?: any;
  data?: any;
  responseType?: string;
}
```

- 第二个参数仅为 Angular 客户端提供，并给出 HttpClient 的实例

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mutator: {
          path: './api/mutator/custom-instance.ts',
          name: 'customInstance',
          // default: true
        },
      },
    },
  },
};
```

```ts
// custom-instance.ts

import Axios, { AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({ baseURL: '' });

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data,
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };

  return promise;
};

// 在某些情况下，使用 react-query 和 swr 时，您希望能够覆盖返回错误类型，因此您也可以在这里这样做
export type ErrorType<Error> = AxiosError<Error>;
```

- 如果您的文件有一些别名，您还需要在 mutator 对象中定义它们。

示例：

```ts
// custom-instance.ts

import Axios, { AxiosRequestConfig } from 'axios';
import config from '@config';

export const AXIOS_INSTANCE = Axios.create({ baseURL: '', ...config });

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data,
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;
```

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mutator: {
          path: './api/mutator/custom-instance.ts',
          name: 'customInstance',
          alias: {
            '@config': path.resolve(_dirname, './src/config'),
          },
        },
      },
    },
  },
};
```

- 如果您使用以下客户端之一：`react-query`、`vue-query` 和 `svelte-query`。您也可以像这样提供一个钩子

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mutator: {
          path: './api/mutator/use-custom-instance.ts',
          name: 'useCustomInstance',
          // default: true
        },
      },
    },
  },
};
```

```ts
// use-custom-instance.ts

import Axios, { AxiosRequestConfig } from 'axios';
import { useQueryClient } from 'react-query';

export const AXIOS_INSTANCE = Axios.create({ baseURL: '' });

export const useCustomInstance = <T>(): ((
  config: AxiosRequestConfig,
) => Promise<T>) => {
  const token = useToken(); // 做您想做的事

  return (config: AxiosRequestConfig) => {
    const source = Axios.CancelToken.source();
    const promise = AXIOS_INSTANCE({
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      }
      cancelToken: source.token,
    }).then(({ data }) => data);

    // @ts-ignore
    promise.cancel = () => {
      source.cancel('Query was cancelled by React Query');
    };

    return promise;
  };
};

export default useCustomInstance;

export type ErrorType<Error> = AxiosError<Error>;
```

- 如果您使用 ES 模块（`"type": "module"`）。您也可以像这样提供一个钩子

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mutator: {
          path: './api/mutator/use-custom-instance.ts',
          name: 'useCustomInstance',
          extension: '.js',
        },
      },
    },
  },
};
```

生成的文件将使用 `.js` 扩展名导入 mutator。

#### header

类型：`Boolean | Function`。

默认值：`true`。

使用此属性禁用文件头的自动生成

您可以提供一个函数来自定义生成文件头的方式。您将接收规范的 info 对象作为参数，并应返回字符串数组。

```ts
module.exports = {
  petstore: {
    output: {
      override: {
        header: (info: InfoObject): String[] => [
          `Generated by orval 🍺`,
          `Do not edit manually.`,
          ...(info.title ? [info.title] : []),
          ...(info.description ? [info.description] : []),
          ...(info.version ? [`OpenAPI spec version: ${info.version}`] : []),
        ],
      },
    },
  },
};
```

#### 属性键的命名约定

类型：`Object`。

更改为**属性键**生成的输出命名约定。

**默认情况下，保留键**的命名约定不变。

如果您要查找**文件**命名约定，请参见 [namingConvention](#namingconvention)。

```ts

module.exports = {
  petstore: {
    output: {
      ...
      override: {
        namingConvention: {
          enum: 'PascalCase',
        },
      },
    },
    ...
  },
};
```

##### Enum

类型：`String`。

更改**枚举**键的命名约定。支持所有生成的[枚举类型](#enumgenerationtype)。

有效值：`camelCase`、`PascalCase`、`snake_case`、`kebab-case`。
_与文件_ [namingConvention](#namingconvention) _相同_。

#### fetch

类型：`Object`。

为生成的 `fetch` 客户端提供选项。

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

##### includeHttpResponseReturnType

类型：`Boolean`。
默认值：`true`

当使用 `fetch` 作为 `client` 或 `httpClient` 时，`fetch` 响应类型包含 http 状态，以便应用程序更容易处理。
如果您想返回定义的返回类型而不是自动生成的返回类型，请将此值设置为 `false`。

##### explode

类型：`Boolean`。
默认值：`true`

默认情况下，`fetch` 客户端遵循 OpenAPI 规范的查询参数展开行为。这意味着查询参数将被展开，除非在 OpenAPI 模式中明确设置为 `false`。

如果您想保持与之前行为的向后兼容性（只有 `explode: true` 的参数才会被展开），可以将此值设置为 `false`。

##### jsonReviver

类型：`String` 或 `Object`

允许您在 fetch 客户端解析 JSON 时提供 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#reviver" target="_blank">reviver</a> 函数。建议在设置 <a href="#usedates">useDates</a> 为 `true` 时使用此功能来恢复日期。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        fetch: {
          jsonReviver: {
            path: './api/mutator/custom-reviver.ts',
            name: 'customReviver',
            // default: true
          },
        },
      },
    },
  },
};
```

```ts
// custom-reviver.ts
const isoDateFormat =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

export function customReviver(key: string, value: unknown) {
  if (value && typeof value === 'string' && isoDateFormat.test(value)) {
    return new Date(value);
  }
  return value;
}
```

#### query

类型：`Object`。

为您提供覆盖生成的 <a href="https://react-query.tanstack.com/" target="_blank">query</a> 的可能性

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
          signal: true
        },
      },
    },
    ...
  },
};
```

##### useQuery

类型：`Boolean`。

用于生成 <a href="https://tanstack.com/query/latest/docs/react/reference/useQuery" target="_blank">useQuery</a> 自定义钩子。
如果未提供查询键，这是生成的默认钩子。

##### useMutation

类型：`Boolean`。

用于生成 <a href="https://tanstack.com/query/latest/docs/react/reference/useMutation" target="_blank">useMutation</a> 自定义钩子。
只有当操作不是 `GET` 操作，且未配置生成 [query](#useQuery) 时，才会生成该钩子。

如果两者都配置了，[operations override](#operations) 将优先。

##### useInfinite

类型：`Boolean`。

用于生成 <a href="https://tanstack.com/query/latest/docs/react/reference/useInfiniteQuery" target="_blank">useInfiniteQuery</a> 自定义钩子。

##### usePrefetch

类型：`Boolean`。

用于生成 <a href="https://tanstack.com/query/v4/docs/react/guides/prefetching" target="_blank">预取</a> 函数。
这对于 NextJS SSR 或任何预取情况可能很有用。

生成函数示例：

```js
export const prefetchGetCategories = async <
  TData = Awaited<ReturnType<typeof getCategories>>,
  TError = ErrorType<unknown>,
>(
  queryClient: QueryClient,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getCategories>>,
      TError,
      TData,
    >,
    request?: SecondParameter<typeof customAxiosInstance>,
  },
): Promise<QueryClient> => {
  const queryOptions = getGetCategoriesQueryOptions(options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};
```

##### useInfiniteQueryParam

类型：`String`。

用于在使用 `getFetchMore` 函数时自动将 useInfiniteQuery 提供的查询参数添加到请求中。

##### options（已弃用，请使用 queryOptions）

类型：`Object`。

用于覆盖查询配置。可用选项请查看<a href="https://tanstack.com/query/latest/docs/react/reference/useQuery" target="_blank">这里</a>

##### queryKey

类型：`String` 或 `Object`。

有效值：`queryKey` 函数的路径或包含路径和名称的对象。

如果您提供对象，还可以添加 default 属性来使用导出默认函数。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        query: {
          queryKey: {
            path: './api/query/custom-query-key.ts',
            name: 'customQueryKeyFn',
            // default: true
          },
        },
      },
    },
  },
};
```

##### queryOptions

类型：`String` 或 `Object`。

有效值：`queryOptions` 函数的路径或包含路径和名称的对象。

如果您提供对象，还可以添加 default 属性来使用导出默认函数。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        query: {
          queryOptions: {
            path: './api/query/custom-query-options.ts',
            name: 'customQueryOptionsFn',
            // default: true
          },
        },
      },
    },
  },
};
```

##### mutationOptions

类型：`String` 或 `Object`。

有效值：`mutationOptions` 函数的路径或包含路径和名称的对象。

如果您提供对象，还可以添加 default 属性来使用导出默认函数。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        query: {
          mutationOptions: {
            path: './api/mutator/custom-mutator-options.ts',
            name: 'useCustomMutatorOptions',
            // default: true
          },
        },
      },
    },
  },
};
```

```ts
// custom-mutator-options.ts

// custom-mutator-options.ts
type OptionsWithMutationFn<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> = UseMutationOptions<T, TError, TData, TContext> &
  Required<Pick<UseMutationOptions<T, TError, TData, TContext>, 'mutationFn'>>;

export const useCustomMutatorOptions = <
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(
  options: OptionsWithMutationFn<T, TError, TData, TContext>,
): OptionsWithMutationFn<T, TError, TData, TContext> => {
  const queryClient = useQueryClient();
  if (options.mutationKey?.[0] === 'petDestroy') {
    // 注意：`options.mutationKey?.[0]` 是无类型的。
    options.onSuccess = (_data, variables, _context) => {
      // 注意：`variables` 是无类型的。
      options.onSuccess?.(data, variables, context);
      // 注意：`queryKey` 是硬编码的，不能使用 `getGetPetQueryKey()`，因为这会引入循环依赖。
      queryClient.invalidateQueries({
        queryKey: ['api', 'v2', 'pet', variables.id],
      });
    };
  }
  // TODO: 为每个 mutation 添加更多 if 语句。
  return options;
};
```

##### signal

类型：`Boolean`。

用于移除 <a href="https://react-query.tanstack.com/" target="_blank">query</a> 提供的中止信号的生成

##### shouldExportMutatorHooks

类型：`Boolean`。

默认值：`true`。

用于停止导出 mutator 钩子。如果您想完全依赖 useQuery、useSuspenseQuery 等，这很有用。

##### shouldExportQueryKey

类型：`Boolean`。

默认值：`true`。

用于停止导出查询键。

##### shouldSplitQueryKey

类型：`Boolean`。

默认值：`false`。

用于使 Orval 生成数组形式的查询键而不是字符串。

##### version

类型：`number`。

默认值：`从 package json 检测`。

用于为生成的钩子指定版本。如果您想强制为钩子指定版本，这很有用。

#### angular

类型：`Object`。

为 angular 客户端提供特定选项

```js
module.exports = {
  petstore: {
    output: {
      ...
      override: {
        angular: {
          provideIn: 'any',
        },
      },
    },
    ...
  },
};
```

##### provideIn

类型：`Boolean` 或 `String`。

有效值：`true`、`false`、`'root'`、`'any'`、`''`。

默认值：`'root'`。

可用于设置生成的 Angular 服务上的 `providedIn` 值。如果为 `false`，将不设置 `providedIn`。如果为 `true` 或未指定，将回退到默认值：`root`。

#### swr

类型：`Object`。

为生成的 `swr` 客户端提供选项。也可以扩展生成的函数。

```js
module.exports = {
  petstore: {
    output: {
      ...
      override: {
        swr: {
          useInfinite: true,
        },
      },
    },
    ...
  },
};
```

##### useInfinite

类型：`Boolean`。

用于生成 <a href="https://swr.vercel.app/docs/pagination#useswrinfinite" target="_blank">useSWRInfinite</a> 自定义钩子。

##### useSWRMutationForGet

类型：`Boolean`。

用于为 get 请求生成 <a href="https://swr.vercel.app/docs/mutation#useswrmutation" target="_blank">useSWRMutation</a> 自定义钩子。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        swr: {
          swrOptions: {
            useSWRMutationForGet: true,
          },
        },
      },
    },
  },
};
```

##### swrOptions

类型：`Object`。

用于覆盖 `useSwr` 选项。可用选项请查看[这里](https://swr.vercel.app/docs/api#options)

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        swr: {
          swrOptions: {
            dedupingInterval: 10000,
          },
        },
      },
    },
  },
};
```

##### swrMutationOptions

类型：`Object`。

用于覆盖 `useSWRMutation` 选项。可用选项请查看[这里](https://swr.vercel.app/docs/mutation#useswrmutation-parameters)

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        swr: {
          swrMutationOptions: {
            revalidate: true,
          },
        },
      },
    },
  },
};
```

##### swrInfiniteOptions

类型：`Object`。

用于覆盖 `useSWRInfinite` 选项。可用选项请查看[这里](https://swr.vercel.app/docs/pagination#parameters)

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        swr: {
          swrInfiniteOptions: {
            initialSize: 10,
          },
        },
      },
    },
  },
};
```

#### zod

类型：`Object`。

为 zod 客户端提供特定选项

```js
module.exports = {
  petstore: {
    output: {
      ...
      override: {
        zod: {
          strict: {
            response: true,
            query: true,
            param: true,
            header: true,
            body: true
          },
          coerce: {
            response: true,
              query: true,
              param: true,
              header: true,
              body: true
          },
        },
      },
    },
    ...
  },
};
```

##### strict

类型：`Object`。

默认值：`false`。

用于为 zod 模式设置严格模式。如果设置为 true，模式将以严格模式生成。

##### generate

类型：`Object`。

默认值：`true`。

用于设置要为 zod 模式生成哪种类型的模式。

示例：

```js
module.exports = {
  petstore: {
    output: {
      ...
      override: {
        zod: {
          generate: {
            param: true,
            body: true,
            response: false,
            query: true,
            header: true,
          }
        },
      },
    },
    ...
  },
};
```

在上面的示例中，排除响应体验证不会生成

##### coerce

类型：`Object`。

默认值：`false`。

用于为 zod 模式设置强制转换。如果设置为 true，模式将在可能的类型上生成强制转换。

您还可以提供强制转换类型数组，仅为指定类型生成强制转换类型。

示例：

```js
module.exports = {
  petstore: {
    output: {
      ...
      override: {
        zod: {
          coerce: {
            response: [ 'boolean'],
            query: ['string', 'number', 'boolean', 'bigint', 'date'],
          }
        },
      },
    },
    ...
  },
};
```

##### preprocess

类型：`Object`。

用于向 zod 模式添加预处理函数。您可以使用自定义 mutator 在验证之前预处理数据。

示例：

```js
module.exports = {
  petstore: {
    output: {
      ...
      override: {
        zod: {
          preprocess: {
            response: {
              name: 'stripNill',
              path: './src/mutators.ts',
            },
          },
        },
      },
    },
    ...
  },
};
```

##### generateEachHttpStatus

类型：`Boolean`。

为您提供为 OpenAPI 规范中 `responses` 字段中的所有 HTTP 状态生成模拟的可能性。默认情况下只生成 200 OK 响应。

```js
module.exports = {
  petstore: {
    output: {
      ...
      override: {
        zod: {
          generateEachHttpStatus: true,
        },
      },
    },
    ...
  },
};
```

##### dateTimeOptions

Type: `Object`.

Default Value: `{}`.

Use to set options for zod `datetime` fields. These options are passed directly to zod `datetime` validation.

Example:

```js
module.exports = {
  petstore: {
    output: {
      override: {
        zod: {
          dateTimeOptions: {
            local: true,
            offset: true,
            precision: 3,
          },
        },
      },
    },
  },
};
```

You can find more details in the [zod documentation ](https://zod.dev/?id=datetimes).

##### timeOptions

Type: `Object`.

Default Value: `{}`.

Use to set options for zod `time` fields. These options are passed directly to zod `time` validation.

Example:

```js
module.exports = {
  petstore: {
    output: {
      override: {
        zod: {
          timeOptions: {
            precision: -1,
          },
        },
      },
    },
  },
};
```

You can find more details in the [zod documentation ](https://zod.dev/?id=times).

#### mock

类型：`Object`。

为您提供覆盖生成的模拟的可能性

##### properties

类型：`Object` 或 `Function`。

您可以使用此功能按属性覆盖生成的模拟。Properties 可以接受一个函数，该函数将规范作为参数并应返回一个对象或直接返回对象。此对象的每个键可以是正则表达式或要覆盖的属性的直接路径，值可以是返回所需值的函数或直接值。如果使用函数，这将在运行时执行。

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mock: {
          properties: {
            '/tag|name/': 'jon', // 匹配每个名为 'tag' 或 'name' 的属性，包括嵌套的
            '/.*.user.id/': faker.string.uuid(), // 匹配名为 'user' 的对象内名为 'id' 的每个属性，包括嵌套的
            email: () => faker.internet.email(), // 仅匹配属性 'email'
            'user.id': () => faker.string.uuid(), // 仅匹配完整路径 'user.id'
          },
        },
      },
    },
  },
};
```

##### format

类型：`Object`。

为您提供为 `format` 设置值的可能性。在您的规范中，如果您为属性设置 `format: email`，Orval 将自动为您生成随机电子邮件。默认可用格式请参见<a href="https://github.com/orval-labs/orval/blob/master/packages/mock/src/faker/constants.ts" target="_blank">这里</a>。

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mock: {
          format: {
            email: () => faker.internet.email(),
            iban: () => faker.finance.iban(),
          },
        },
      },
    },
  },
};
```

##### required

类型：`Boolean`。

为您提供将每个属性设置为必需的可能性。

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mock: {
          required: true,
        },
      },
    },
  },
};
```

##### delay

类型：`number`、`Function` 或 `false`。

为您提供为模拟设置延迟时间的可能性。它可以是固定数字、false 或返回数字的函数。
将 delay 设置为 false 会完全移除延迟调用。

默认值：`1000`

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mock: {
          delay: 0,
        },
      },
    },
  },
};
```

##### delayFunctionLazyExecute

类型：`boolean`。

为您提供将传递给 `delay` 的函数在运行时执行而不是在生成模拟时执行的可能性。

##### generateEachHttpStatus

类型：`Boolean`。

为您提供为 OpenAPI 规范中 `responses` 字段中的所有 HTTP 状态生成模拟的可能性。

##### arrayMin

类型：`Number`。

为指定多个项目的属性设置生成数组的默认最小长度。如果属性未定义 `minItems`，则使用此值。（默认为 `1`）

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mock: {
          arrayMin: 5,
        },
      },
    },
  },
};
```

##### arrayMax

类型：`Number`。

为指定多个项目的属性设置生成数组的默认最大长度。如果属性未定义 `maxItems`，则使用此值。（默认为 `10`）

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mock: {
          arrayMax: 15,
        },
      },
    },
  },
};
```

##### stringMin

类型：`Number`。

设置生成字符串的默认最小长度。如果属性未定义 `minLength`，则使用此值。（默认为 `10`）

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mock: {
          stringMin: 5,
        },
      },
    },
  },
};
```

##### stringMax

类型：`Number`。

设置生成字符串的默认最大长度。如果属性未定义 `maxLength`，则使用此值。（默认为 `20`）

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mock: {
          stringMax: 15,
        },
      },
    },
  },
};
```

##### numberMin

类型：`Number`。

设置生成数字的默认最小值。如果属性未定义 `minimum`，则使用此值。

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mock: {
          numberMin: 5,
        },
      },
    },
  },
};
```

##### numberMax

类型：`Number`。

设置生成数字的默认最大值。如果属性未定义 `maximum`，则使用此值。

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mock: {
          numberMax: 15,
        },
      },
    },
  },
};
```

##### fractionDigits

类型：`Number`。

设置浮点数中显示的小数位数。（默认为 `2`）

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mock: {
          fractionDigits: 1,
        },
      },
    },
  },
};
```

##### useExamples

全局模拟选项的扩展。如果设置为 `true`，模拟生成器将使用规范的 `example` 属性来生成模拟。如果未设置 `example` 属性，模拟生成器将回退到默认行为。将覆盖全局选项。

```js
module.exports = {
  petstore: {
    output: {
      override: {
        mock: {
          useExamples: true,
        },
      },
    },
  },
};
```

##### baseUrl

类型：`String`。

为您提供为模拟处理程序设置基础 url 的可能性。将覆盖全局选项。

#### hono

类型：`Object`

为您提供覆盖生成的 `hono` 的可能性

```js
module.exports = {
  petstore: {
    output: {
      override: {
        hono: {
          handlers: 'src/handlers',
          validatorOutputPath: 'src/validator.ts',
          compositeRoute: 'src/routes.ts',
        },
      },
    },
  },
};
```

##### handlers

类型：`String`。

您可以指定 `hono` 处理程序的输出路径。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        hono: {
          handlers: 'src/handlers',
        },
      },
    },
  },
};
```

然后将生成如下结构：

```
src/
├── handlers
│   ├── createPets.ts
│   ├── listPets.ts
│   ├── showPetById.ts
│   └── updatePets.ts
├── index.ts
├── mutators.ts
├── petstore.context.ts
├── petstore.schemas.ts
├── petstore.ts
├── petstore.validator.ts
└── petstore.zod.ts
```

##### validatorOutputPath

类型：`String`。

您可以更改验证器输出路径

##### compositeRoute

类型：`String`。

您可以输出一个定义复合路由的 `hono` 实例的文件。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        hono: {
          compositeRoute: 'src/routes.ts',
        },
      },
    },
  },
};
```

然后将生成如下结构：

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

#### components

类型：`Object`。

为您提供覆盖模型的可能性

```js
module.exports = {
  petstore: {
    output: {
      override: {
        components: {
          schemas: {
            suffix: 'DTO',
          },
          responses: {
            suffix: 'Response',
          },
          parameters: {
            suffix: 'Params',
          },
          requestBodies: {
            suffix: 'Bodies',
          },
        },
      },
    },
  },
};
```

#### operations

类型：`Object`。

为您提供通过 <a href="https://swagger.io/docs/specification/paths-and-operations/" target="_blank">operationId</a> 覆盖生成的模拟的可能性。

对象的每个键应该是一个 operationId，并以对象作为值。

值对象可以采用与 override 属性相同的属性（mutator、query、transformer、mock）。

模拟选项还有一个可能性是 data 属性。它可以接受函数或直接值。函数将在运行时执行。

```js
module.exports = {
  petstore: {
    output: {
      override: {
        operations: {
          listPets: {
            transformer: 'src/yourfunction.js',
            mutator: 'src/response-type.js',
            mock: {
              properties: () => {
                return {
                  id: () => faker.number.int({ min: 1, max: 99999 }),
                };
              },
            },
          },
          showPetById: {
            mock: {
              data: () => ({
                id: faker.number.int({ min: 1, max: 99 }),
                name: faker.person.firstName(),
                tag: faker.helpers.arrayElement([
                  faker.word.sample(),
                  undefined,
                ]),
              }),
            },
          },
        },
      },
    },
  },
};
```

#### tags

类型：`Object`。

与 `override.operations` 完全相同，但这次您可以通过 <a href="https://swagger.io/docs/specification/grouping-operations-with-tags/" target="_blank">标签</a> 来执行

#### operationName

类型：`Function`。

```ts
// 类型签名
(operation: OperationObject, route: string, verb: Verbs) => string;
```

用于覆盖生成的操作名称的函数。

#### requestOptions

类型：`Object | Boolean`。

使用此属性为您的 http 客户端提供配置或完全从生成的文件中移除请求选项属性。

#### formData

类型：`Boolean` 或 `String` 或 `Object`。

有效值：formData 函数的路径或包含路径和名称的对象。您还可以定义如何处理关于数组的表单条目名称。

使用此属性在使用 multipart 时禁用表单数据的自动生成

如果您提供对象，还可以添加 default 属性来使用导出默认函数。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        formData: {
          path: './api/mutator/custom-form-data-fn.ts',
          name: 'customFormDataFn',
          // default: true
        },
      },
    },
  },
};
```

```ts
// 类型签名
export const customFormDataFn = <Body>(body: Body): FormData => {
  // 执行您的实现以将其转换为 FormData

  return FormData;
};
```

##### mutator

类型：`String` | `Object`

与直接在 `formData` 上定义 mutator 相同，但这样您也可以指定 `arrayHandling`。

```js
module.exports = {
  petstore: {
    output: {
      override: {
        formData: {
          mutator: {
            path: './api/mutator/custom-form-data-fn.ts',
            name: 'customFormDataFn',
          },
        },
      },
    },
  },
};
```

##### arrayHandling

类型：`serialize` | `serialize-with-brackets` | `explode`

默认值：`serialize`

决定 FormData 生成如何处理数组。

```js
module.exports = {
  petstore: {
    output: {
      override: {
        formData: {
          mutator: {
            path: './api/mutator/custom-form-data-fn.ts',
            name: 'customFormDataFn',
          },
          arrayHandling: 'serialize-with-brackets',
        },
      },
    },
  },
};
```

对于以下所有示例，使用此规范：

```yaml
components:
  schemas:
    Pet:
      type: object
      properties:
        name:
          type: string
        age:
          type: number
        relatives:
          type: array
          items:
            type: object
            properties:
              name:
                type: string
              colors:
                type: array
                items:
                  type: string
                  enum:
                    - white
                    - black
                    - green
```

类型 `serialize` 设置会生成以下代码：

```ts
const formData = new FormData();
if (pet.name !== undefined) {
  formData.append(`name`, pet.name);
}
if (pet.age !== undefined) {
  formData.append(`age`, pet.age.toString());
}
if (pet.relatives !== undefined) {
  pet.relatives.forEach((value) =>
    formData.append(`relatives`, JSON.stringify(value)),
  );
}
```

类型 `serialize-with-brackets` 设置会生成以下代码：

```ts
const formData = new FormData();
if (pet.name !== undefined) {
  formData.append(`name`, pet.name);
}
if (pet.age !== undefined) {
  formData.append(`age`, pet.age.toString());
}
if (pet.relatives !== undefined) {
  pet.relatives.forEach((value) =>
    formData.append(`relatives[]`, JSON.stringify(value)),
  );
}
```

类型 `explode` 设置会生成以下代码：

```ts
const formData = new FormData();
if (pet.name !== undefined) {
  formData.append(`name`, pet.name);
}
if (pet.age !== undefined) {
  formData.append(`age`, pet.age.toString());
}
if (pet.relatives !== undefined) {
  pet.relatives.forEach((value, index) => {
    if (value.name !== undefined) {
      formData.append(`relatives[${index}].name`, value.name);
    }
    if (value.colors !== undefined) {
      value.colors.forEach((value, index1) =>
        formData.append(`relatives[${index}].colors[${index1}]`, value),
      );
    }
  });
}
```

#### formUrlEncoded

类型：`Boolean` 或 `String` 或 `Object`。

有效值：formUrlEncoded 函数的路径或包含路径和名称的对象。

使用此属性禁用表单 URL 编码的自动生成

如果您提供对象，还可以添加 default 属性来使用导出默认函数。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        formUrlEncoded: {
          path: './api/mutator/custom-form-url-encoded-fn.ts',
          name: 'customFormUrlEncodedFn',
          // default: true
        },
      },
    },
  },
};
```

```ts
// 类型签名
export const customFormUrlEncodedFn = <Body>(body: Body): URLSearchParams => {
  // 执行您的实现以将其转换为 FormData

  return URLSearchParams;
};
```

#### paramsSerializer

类型：`String` 或 `Object`。

重要：这仅在使用 `axios` 或 `angular` 时有效。

有效值：paramsSerializer 函数的路径或包含路径和名称的对象。

使用此属性为所有使用查询参数的请求添加自定义参数序列化器。

如果您提供对象，还可以添加 default 属性来使用导出默认函数。

如果未指定，参数将按照 `axios` 默认方式序列化。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        paramsSerializer: {
          path: './api/mutator/custom-params-serializer-fn.ts',
          name: 'customParamsSerializerFn',
          // default: true
        },
      },
    },
  },
};
```

```ts
// 类型签名
export const customParamsSerializerFn = (
  params: Record<string, any>,
): string => {
  // 执行您的实现以转换参数

  return params;
};
```

#### paramsSerializerOptions

类型：`Object`

重要：这仅在使用 `axios` 时有效。

使用此属性决定参数如何序列化。这仅在未定义 `paramsSerializer` 时考虑。
目前，只有 `qs` 是可用选项。在[这里](https://www.npmjs.com/package/qs)了解更多关于 `qs` 及其设置的信息。

如果未指定，参数将按照 `axios` 默认方式序列化。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        paramsSerializerOptions: {
          qs: {
            arrayFormat: 'repeat',
          },
        },
      },
    },
  },
};
```

#### useDates

类型：`Boolean`

有效值：true 或 false。默认为 false。

使用此属性将 OpenAPI `date` 或 `datetime` 转换为 JavaScript `Date` 对象而不是 `string`。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        useDates: true,
      },
    },
  },
};
```

**注意：** 您必须提供 Axios 转换器来将这些转换为日期，因为这只是使 TypeScript 定义为 Date。
您可以选择使用任何您想要的日期库，如 Moment、Luxon 或原生 JS 日期。

```ts
// 类型签名
const client = axios.create({
  baseURL: '',
});

client.interceptors.response.use((originalResponse) => {
  handleDates(originalResponse.data);
  return originalResponse;
});

export default client;

const isoDateFormat =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

function isIsoDateString(value: any): boolean {
  return value && typeof value === 'string' && isoDateFormat.test(value);
}

export function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== 'object')
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) {
      body[key] = new Date(value); // 默认 JS 转换
      // body[key] = parseISO(value); // date-fns 转换
      // body[key] = luxon.DateTime.fromISO(value); // Luxon 转换
      // body[key] = moment(value).toDate(); // Moment.js 转换
    } else if (typeof value === 'object') {
      handleDates(value);
    }
  }
}
```

**注意：** 如果您使用 fetch 客户端并且 useDates 设置为 true，Date 类型的查询参数将使用 toISOString() 进行字符串化

#### useBigInt

类型：`Boolean`

有效值：true 或 false。默认为 false。

使用此属性将 OpenAPI `int64` 和 `uint64` 格式转换为 JavaScript `BigInt` 对象而不是 `number`。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        useBigInt: true,
      },
    },
  },
};
```

#### coerceTypes

类型：`Boolean`

已弃用：请使用 `zod.coerce` 代替。

有效值：true 或 false。默认为 false。

使用此属性为 [Zod](https://zod.dev/) 模式启用[类型强制转换](https://zod.dev/?id=coercion-for-primitives)（仅适用于查询参数模式）。

如果您想使用 zod 模式在验证之前将（可能是字符串序列化的）查询参数强制转换为正确的类型，这很有用。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        coerceTypes: true,
      },
    },
  },
};
```

#### useNamedParameters

类型：`Boolean`。

默认值：`false`。

生成带有命名路径参数的操作接口，而不是为每个路径参数使用单独的参数。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        useNamedParameters: true,
      },
    },
  },
};
```

#### useTypeOverInterfaces

类型：`Boolean`

有效值：true 或 false。默认为 false。

使用此属性使用 TypeScript `type` 而不是 `interface`。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        useTypeOverInterfaces: true,
      },
    },
  },
};
```

#### useDeprecatedOperations

类型：`Boolean`

有效值：true 或 false。默认为 true。

使用此属性包含/排除生成在 OpenAPI 中标记为 `"deprecated": true` 的任何操作。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        useDeprecatedOperations: false,
      },
    },
  },
};
```

#### contentType

类型：`Object`

使用此属性包含或排除某些内容类型

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        contentType: {
          include: ['application/json'],
          exclude: ['application/xml'],
        },
      },
    },
  },
};
```

#### useNativeEnums（已弃用，请使用 'enumGenerationType="enum"' 代替）

类型：`Boolean`

有效值：true 或 false。默认为 false。

使用此属性生成原生 TypeScript `enum` 而不是 `type` 和 `const` 组合。

示例：

```js
module.exports = {
  petstore: {
    output: {
      override: {
        useNativeEnums: true,
      },
    },
  },
};
```

#### enumGenerationType

类型：`const` | `enum` | `union`

默认值：`const`。

这用于指定如何生成枚举。`const` 生成常量对象，`enum` 生成原生枚举，`union` 生成简单的联合类型。
要更改生成的枚举键的名称，您可以使用 x-enumNames 扩展您的 OpenAPI 模式。在[这里](../../guides/enums)了解更多。

```js
module.exports = {
  petstore: {
    output: {
      override: {
        enumGenerationType: 'const',
      },
    },
  },
};
```

当 `enumGenerationType` 为 `const` 时的结果：

```ts
export type Example = (typeof Example)[keyof typeof Example];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Example = {
  foo: 'foo',
  bar: 'bar',
  baz: 'baz',
} as const;
```

当 `enumGenerationType` 为 `enum` 时的结果：

```ts
export enum Example {
  foo = 'foo',
  bar = 'bar',
  baz = 'baz',
}
```

当 `enumGenerationType` 为 `union` 时的结果：

```ts
export const Example = 'foo' | 'bar' | 'baz';
```

#### suppressReadonlyModifier

类型：`Boolean`

有效值：`true` 或 `false`。

默认值：`false`。

当在 `OpenAPI` 中指定 `readonly` 字段时，在从模式输出的 `type` 和 `interface` 字段中指定 `readonly`。

```js
module.exports = {
  petstore: {
    output: {
      override: {
        suppressReadonlyModifier: true,
      },
    },
  },
};
```

#### jsDoc

##### filter

类型：`Object`。

一个配置对象，允许您通过可选地提供一个将模式条目转换为键值对的过滤器函数来自定义 `JSDoc` 生成。

示例：

```ts
module.exports = {
  petstore: {
    output: {
      override: {
        jsDoc: {
          filter: (schema) => {
            const allowlist = [
              'type',
              'format',
              'maxLength',
              'minLength',
              'description',
              'minimum',
              'maximum',
              'exclusiveMinimum',
              'exclusiveMaximum',
              'pattern',
              'nullable',
              'enum',
            ];
            return Object.entries(schema || {})
              .filter(([key]) => allowlist.includes(key))
              .map(([key, value]) => {
                return {
                  key,
                  value,
                };
              })
              .sort((a, b) => {
                return a.key.length - b.key.length;
              });
          },
        },
      },
    },
  },
};
```

输入：

```yaml
components:
  schemas:
    Pet:
      type: object
      required:
        - id
        - name
      oneOf:
        - $ref: '#/components/schemas/Dog'
        - $ref: '#/components/schemas/Cat'
      properties:
        '@id':
          type: string
          format: iri-reference
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
        email:
          type: string
          format: email
        callingCode:
          type: string
          enum: ['+33', '+420', '+33'] # 故意重复的值
        country:
          type: string
          enum: ["People's Republic of China", 'Uruguay']
```

结果：

```ts
export interface Pet {
  /**
   * @type integer
   * @format int64
   */
  id: number;
  /**
   * @type string
   * @maxLength 0
   * @minLength 40
   * @description Name of pet
   */
  name: string;
  /**
   * @type integer
   * @format int32
   * @minimum 0
   * @maximum 30
   * @exclusiveMinimum true
   * @exclusiveMaximum true
   */
  age?: number;
  /**
   * @type string
   * @pattern ^\\d{3}-\\d{2}-\\d{4}$
   * @nullable true
   */
  tag?: string | null;
  /**
   * @type string
   * @format email
   */
  email?: string;
  /**
   * @type string
   * @enum +33,+420,+33
   */
  callingCode?: PetCallingCode;
  /**
   * @type string
   * @enum People's Republic of China,Uruguay
   */
  country?: PetCountry;
}
```

## allParamsOptional

类型：`Boolean`

有效值：`true` 或 `false`。

默认值：`false`。

适用于所有客户端，但可能只对 `Tanstack Query` 有意义。
使用此属性使除路径参数外的所有参数都可选。这对于利用 `Orval` 的 `Tanstack Query` 自动启用功能很有用，请参见 https://github.com/orval-labs/orval/pull/894

```js
module.exports = {
  petstore: {
    output: {
      allParamsOptional: true,
    },
  },
};
```

## urlEncodeParameters

类型：`Boolean`

有效值：true 或 false。默认为 false。**注意：** 目前仅适用于 Tanstack Query 客户端。

使用此属性启用路径/查询参数的 URL 编码。强烈推荐使用，将来可能会成为默认设置，请参见 https://github.com/orval-labs/orval/pull/895

```js
module.exports = {
  petstore: {
    output: {
      urlEncodeParameters: true,
    },
  },
};
```

## optionsParamRequired

类型：`Boolean`

有效值：`true` 或 `false`。

默认值：`false`。
使用此属性使第二个 `options` 参数成为必需的（例如使用自定义 axios 实例时）

```js
module.exports = {
  petstore: {
    output: {
      optionsParamRequired: true,
    },
  },
};
```

## propertySortOrder

类型：`Alphabetical` | `Specification`

默认值：`Specification`
这使您能够指定模型中属性的排序方式，可以按字母顺序排序或按它们在规范中出现的顺序排序。

```js
module.exports = {
  petstore: {
    output: {
      propertySortOrder: 'Alphabetical',
    },
  },
};
```
