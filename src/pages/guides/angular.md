---
id: angular
title: Angular
---

您应该有一个 OpenAPI 规范和一个 Orval 配置，其中您将模式定义为 Angular。

## 使用 Angular 的示例

```js
module.exports = {
  petstore: {
    output: {
      mode: 'tags-split',
      target: 'src/petstore.ts',
      schemas: 'src/model',
      client: 'angular',
      mock: true,
    },
    input: {
      target: './petstore.yaml',
    },
  },
};
```

查看 [orval 配置](../reference/configuration/full-example) 参考以了解所有可用选项。

Angular 模式将自动生成两个类。一个带有定义的抽象类和一个带有实现的服务类。您应该将服务添加到模块中，并在需要的地方使用它。

您可以查看示例 <a href="https://github.com/orval-labs/orval/tree/master/samples/angular-app" target="_blank">这里</a>

## 如何设置后端 URL

您可以使用拦截器自动添加 API 的 URL。就像添加授权头一样。

## 如何使用模拟

您应该在环境文件中定义您的模拟。如果您不这样做，您将向包中添加所有依赖项。

例如，您可以添加一个 `modules` 属性，并在其中添加一个 MockModule 来设置您的模拟。您可以查看示例 <a href="https://github.com/orval-labs/orval/tree/master/samples/angular-app/src/api/mocks" target="_blank">这里</a>

您也可以查看 msw 示例 <a href="https://github.com/mswjs/examples/tree/master/examples/rest-angular" target="_blank">这里</a>
