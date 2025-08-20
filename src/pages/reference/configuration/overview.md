---
id: configuration
title: 配置
---

本页面是配置 Orval 项目不同方式的参考文档。

通过在项目根目录放置 `orval.config.(js|mjs|ts)` 配置文件，您可以提供一系列选项来改变 Orval 生成文件的默认行为。

本页面描述了以下配置选项：

<div>
<table className="table-auto">
  <thead>
    <tr>
      <th className="px-4 py-2">类别</th>
      <th className="px-4 py-2">描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border px-4 py-2">Input</td>
      <td className="border px-4 py-2">直接指定规范文件的路径，或导入规范的配置以及您想要覆盖的内容。
      </td>
    </tr>
    <tr className="bg-gray-100">
      <td className="border px-4 py-2">Output</td>
      <td className="border px-4 py-2">直接指定生成模型和 HTTP 调用的路径，或配置生成代码的内容和位置。</td>
    </tr>
    <tr>
      <td className="border px-4 py-2">Hooks</td>
      <td className="border px-4 py-2">允许您在特定事件上运行脚本。
      </td>
    </tr>
  </tbody>
</table>
</div>

## orval.config.js

```js
module.exports = {
  petstore: {
    input: './petstore.yaml',
    output: './petstore.ts',
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
};
```

## orval.config.ts

```ts
import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    input: './petstore.yaml',
    output: './petstore.ts',
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
```
