---
id: basics
title: 基础
---

您应该定义一个 OpenAPI 规范（示例 <a href="https://github.com/orval-labs/orval/blob/master/samples/basic/petstore.yaml" target="_blank"> petstore.yaml</a>）。

然后在项目根目录创建一个 `orval.config.js` 文件：

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

输出选项配置您想要写入生成代码的内容和位置。

- `mode` 是您定义生成文件方式的地方（默认：`single` - 只有一个包含所有内容的文件）
- `target` 是默认写入生成代码的位置
- `schemas` 是写入模型的位置
- `mock` 是当您想要使用模拟生成器生成模拟时（默认是 MSW）。它将在目标文件中生成。您可以查看 <a href="https://mswjs.io/" target="_blank">MSW</a> 以在项目中正确设置它们。

输入选项配置导入的规范以及您想要覆盖的内容。

- `target` 是规范文件
- `override` 是快速覆盖输入
  - `transformer` 转换规范，比如为每个调用添加参数。

查看 [orval 配置](../reference/configuration/overview) 以了解所有可用选项。
