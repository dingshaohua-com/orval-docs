---
id: client-with-zod
title: 使用 Zod 的客户端
---

如果您想将 `zod` 与 `swr` 或 `TanStack Query` 客户端一起使用，可以通过如下配置来实现。

## orval.config.js 示例

```js
module.exports = {
  petstore: {
    input: {
      target: './petstore.yaml',
    },
    output: {
      mode: 'tags-split',
      client: 'swr',
      target: 'src/gen/endpoints',
      schemas: 'src/gen/models',
      mock: true,
    },
  },
  petstoreZod: {
    input: {
      target: './petstore.yaml',
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: 'src/gen/endpoints',
      fileExtension: '.zod.ts',
    },
  },
};
```

这里我们描述了 `zod` 的生成和 `swr` 的定义。`petstoreZod` 通过为 `output.fileExtension` 指定 `.zod.ts` 并且不定义 `schemas` 来避免生成文件名冲突。另外，`mock` 只需要生成一次，所以只在 `petstore` 中定义。

实际自动生成的文件如下：

```
samples/swr-with-zod/src/gen/
├── endpoints
│   └── pets
│       ├── pets.msw.ts
│       ├── pets.ts
│       └── pets.zod.ts
└── models
```

自动生成的 `swr` 和 `zod` 定义可以在您的应用程序中按如下方式使用：

```ts
import { Pet } from './gen/models';
import { useListPets, useCreatePets } from './gen/endpoints/pets/pets';
import { createPetsBodyItem } from './gen/endpoints/pets/pets.zod';

function App() {
  const { data } = useListPets();
  const { trigger } = useCreatePets();

  const createPet = async () => {
    // 例如，在 name 中指定数字 123 将导致 `zod` 错误。
    const pet = { name: '123', tag: 'test' };

    try {
      const parsedPet = createPetsBodyItem.parse(pet);

      await trigger([parsedPet]);
    } catch (error) {
      console.log('raise error', error);
    }
  };
}
```

查看完整的 [示例应用](https://github.com/orval-labs/orval/tree/master/samples/swr-with-zod)。
