<p align="center">
  <img src="../logo/orval-logo-horizontal.svg?raw=true" width="500" height="160" alt="orval - Restful 客户端生成器" />
</p>

这是 orval.dev 的源代码。它从 [Formik](https://formik.org) 文档分支而来，使用以下技术构建：

- Next.js
- MDX
- Tailwind
- Algolia

## 本地运行

```sh
yarn install
```

如果您想设置 algolia，只需添加一个包含以下内容的 `.env` 文件：

```
NEXT_PUBLIC_ALGOLIA_APP_ID=<您的应用 ID>
NEXT_PUBLIC_ALGOLIA_API_KEY=<您的 API 密钥>
NEXT_PUBLIC_ALGOLIA_INDEX_NAME=<您的索引名称>
```

现在它就可以工作了。运行 `yarn dev` 开始使用。
