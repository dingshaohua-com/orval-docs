---
id: quick-start
title: 快速开始
---

## 无配置示例：

```bash
$ orval --input ./petstore.yaml --output ./src/petstore.ts
```

`--input` 可以接受 yaml 或 json 格式。

`--output` 是您想要生成模型和 HTTP 调用的文件。

## 使用配置的示例：

```bash
$ orval --config ./orval.config.js
# 或者
$ orval
```

**文件 orval.config.js**

```js
module.exports = {
  'petstore-file': {
    input: './petstore.yaml',
    output: './src/petstore.ts',
  },
};
```
