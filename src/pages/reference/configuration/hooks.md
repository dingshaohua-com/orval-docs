---
id: configuration-hooks
title: 钩子配置
---

## afterAllFilesWrite

类型：`String` 或 `String[]` 或 `Function`。

在 orval 生成客户端并将生成的文件写入文件系统后运行。文件路径或其目录作为参数传递给脚本。您可以对 orval 生成的文件运行配置的代码检查任务。

```js
module.exports = {
  petstore: {
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
};
```

如果您不想将生成的文件注入到命令中，可以使用带有对象的 `afterAllFilesWrite`：

```js
module.exports = {
  petstore: {
    hooks: {
      afterAllFilesWrite: {
        command: 'prettier --write .',
        injectGeneratedDirsAndFiles: false,
      },
    },
  },
};
```
