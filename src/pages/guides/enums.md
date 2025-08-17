---
id: enums
title: 枚举名称
---

您可以扩展 OpenAPI 模式以包含枚举值的枚举名称。这将让 Orval 使用正确的名称生成您的枚举。

## OpenAPI 模式示例

```yaml
openapi: '3.1.0'
info:
  version: 1.0.0
  title: Swagger Petstore
  license:
    name: MIT
components:
  schemas:
    MyObject:
      type: object
      properties:
        myEnum:
          type: number
          enum:
            - 1
            - 2
            - 3
            - 4
          x-enumNames:
            - One
            - Two
            - Three
            - Four
```

Orval 生成的枚举将是

```ts
export const MyEnum {
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4
} as const;
```

## 有效的枚举名称扩展

Orval 识别以下扩展：

- x-enumNames
- x-enumnames
- x-enum-varnames
