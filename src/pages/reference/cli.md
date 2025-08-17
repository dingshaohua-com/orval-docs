---
id: cli
title: CLI
---

## Orval 参考

Orval 提供了一套选项，允许您生成应用程序的模型或 API 调用。本页包含所有可用 Orval 选项的完整列表。

要下载和安装 Orval，请[按照此处的说明](../installation)。

### 基本用法

`orval` 命令用于生成具有适当类型签名的客户端。默认情况下会搜索 `orval.config.js` 文件。

```bash
$ orval
```

### 输入

`--input` 选项，简写为 `-i`，可用于设置 OpenAPI 规范的路径或链接。

```bash
$ orval --input ./petstore.yaml
```

### 输出

`--output` 选项，简写为 `-o`，可用于设置生成模型和 HTTP 调用的目标路径。

```bash
$ orval --output ./api/endpoints/petstoreFromFileSpec.ts"
```

### 配置

`--config` 选项，简写为 `-c`，可用于设置 Orval 配置的路径。

```bash
$ orval --config ./api/orval.config.js
```

### 项目

`--project` 选项，简写为 `-p`，可用于专注于 Orval 配置中的一个项目。

```bash
$ orval --project petstore
```

### 监听

`--watch` 选项，简写为 `-w`，可用于监听某些文件并在它们更改时执行 orval。如果未指定路径，则监听规范文件。重复使用 "--watch" 可以监听多个路径

```bash
$ orval --watch
```

```bash
$ orval --watch ./src
```

### 清理

`--clean` 可用于清理生成的文件。请小心，这会清理所有输出目标和 schemas 文件夹。

```bash
$ orval --clean
```

```bash
$ orval --clean ./src
```

### Prettier

`--prettier` 可用于美化生成的文件。您需要全局安装 prettier。

```bash
$ orval --prettier
```

### Biome

`--biome` 可用于使用 [`Biome`](https://biomejs.dev/) 格式化生成的文件。您需要在全局依赖中安装 `Biome`。

```bash
$ orval --biome
```

### tsconfig

`--tsconfig` 可用于指定 `tsconfig` 的路径。

```bash
$ orval --tsconfig ./src/tsconfig.json
```
