---
id: zod
title: zod
---

要创建 `zod` 模式，请将 client 属性指定为 `zod`，它将在目标文件中自动生成。通过参考 <a href="https://zod.dev/" target="_blank">Zod</a> 确保在项目中正确配置 `zod`。

## orval.config.js 示例

```js
module.exports = {
  petstore: {
    output: {
      client: 'zod',
      mode: 'single',
      target: './src/gen/zod',
    },
    input: {
      target: './petstore.yaml',
    },
  },
};
```

将创建一个实现文件，包含 OpenAPI 规范中每个模式的 `zod` 对象，如下所示：

```ts
export const createPetsBody = zod.object({
  id: zod.number(),
  name: zod.string(),
  tag: zod.string().optional(),
});
```

## 如何使用生成的 `zod` 对象

自动生成的 `zod` 对象可以按通常的方式使用。

```ts
import type { z } from 'zod';
import { createPetsBodyItem } from './src/gen/zod/swaggerPetstore.ts';

const pet = { id: 1, name: 'pet name', tag: 'tag' };

// 解析
const parsedPet = createPetsBodyItem.parse(pet);
console.log(parsedPet);
// => Object { id: 1, name: "pet name", tag: "tag" }

// 推断类型
type Pet = z.infer<typeof createPetsBodyItem>;
console.log(pet as Pet);
// => Object { id: 1, name: "pet name", tag: "tag" }
```
