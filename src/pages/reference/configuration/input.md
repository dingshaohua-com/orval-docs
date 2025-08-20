---
id: configuration-input
title: 输入配置
---

## target

类型：`String`。

有效值：规范文件的路径或链接。

```js
module.exports = {
  petstore: {
    input: {
      target: './petstore.yaml',
    },
  },
};
```

## validation

类型：`Boolean` 或 `Object`

默认值：`false`。

为了尽可能确保规范的最佳质量，我们集成了出色的 <a href="https://github.com/IBM/openapi-validator" target="_blank">IBM OpenAPI 检查器</a>。

指定 `true` 将默认使用 <a href="https://github.com/IBM/openapi-validator/blob/main/docs/ibm-cloud-rules.md"><em>IBM Cloud 验证规则集</em></a>。
指定 `Object` 将使用提供的规则集。您可以在<a href="https://docs.stoplight.io/docs/spectral/aa15cdee143a1-java-script-ruleset-format">这里</a>了解更多关于创建规则集的信息。

```js
module.exports = {
  petstore: {
    input: {
      validation: true,
    },
  },
};
```

## override

类型：`Object`。

为您提供覆盖规范的可能性

### transformer

类型：`String` 或 `Function`。

有效值：转换器函数的路径或实现。

此函数在生成时执行，接受一个 <a href="https://github.com/metadevpro/openapi3-ts/blob/master/src/model/openapi30.ts#L12" target="_blank">OpenAPIObject</a> 作为参数，并应返回一个 <a href="https://github.com/metadevpro/openapi3-ts/blob/master/src/model/openapi30.ts#L12" target="_blank">OpenAPIObject</a>。

```js
module.exports = {
  input: {
    override: {
      transformer: 'src/api/transformer/add-version.js',
    },
  },
};
```

转换器示例请参见<a href="https://github.com/orval-labs/orval/blob/master/samples/basic/api/transformer/add-version.js" target="_blank">这里</a>

## filters

类型：`Object`。

默认值：`{}`。

如果指定，Orval 只会在应用过滤器后生成端点。

### mode

类型：`String`。

有效值：`include`、`exclude`。

默认值：`include`。

与 `tags` 或 `schemas` 结合使用，此设置决定是包含还是排除指定的项目。
例如，下面的示例生成不包含标签 `pets` 的端点。

```js
module.exports = {
  petstore: {
    input: {
      filters: {
        mode: 'exclude',
        tags: ['pets'],
      },
    },
  },
};
```

### tags

类型：`string` 或 `RegExp` 数组。

默认值：`[]`。

可以根据 `tags` 进行过滤。
例如，下面的示例只生成包含标签 `pets` 或匹配正则表达式 `/health/` 的端点。

```js
module.exports = {
  petstore: {
    input: {
      filters: {
        tags: ['pets', /health/],
      },
    },
  },
};
```

### schemas

类型：`string` 或 `RegExp` 数组。

只有模式名称匹配指定的 `string` 或 `RegExp` 才会自动生成。
例如，下面的示例只生成匹配字符串 `Error` 或正则表达式 `/Cat/` 的 `schema` 对象。

```js
module.exports = {
  petstore: {
    input: {
      filters: {
        schemas: ['Error', /Cat/],
      },
    },
  },
};
```

## converterOptions

类型：`Object`。

默认值：`{}`。

Orval 将 Swagger 2.0 定义转换为 OpenAPI 3.0.x。您可以使用 converterOptions 属性为此提供自定义配置。可用选项请查看[这里](https://github.com/orval-labs/orval/blob/next/src/types/swagger2openapi.d.ts#L10)。

```js
module.exports = {
  petstore: {
    input: {
      converterOptions: true,
    },
  },
};
```

## parserOptions

类型：`Object`。

默认值：`{ resolve: { github: githubResolver }, validate: true }`。

Orval 使用解析器来处理多个文件规范。您可以使用 `parserOptions` 属性自定义其行为。配置的[可用选项](https://apidevtools.com/swagger-parser/options.html)请参见链接。默认情况下，Orval 包含一个 GitHub 解析器，但您可以为私有规范或其他特定需求添加自己的解析器。

您的规范默认会自动验证。

```js
module.exports = {
  petstore: {
    input: {
      parserOptions: {
        resolve: { gitlab: gitlabResolver },
      },
    },
  },
};
```
