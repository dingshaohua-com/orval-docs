import { Banner } from 'components/Banner';
import { Footer } from 'components/Footer';
import { Nav } from 'components/Nav';
import { Seo } from 'components/Seo';
import { Sticky } from 'components/Sticky';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import { siteConfig } from 'siteConfig';
import Highlight from '../components/Highlight';
import { Playground } from '../components/playground/Playground';
import { getSponsors } from '../get-sponsors';
import Image from 'next/image';

const Home = (props) => {
  const { sponsors } = props;

  return (
    <>
      <Seo
        title="orval"
        description="orval 能够从任何有效的 OpenAPI v3 或 Swagger v2 规范（支持 yaml 或 json 格式）生成具有适当类型签名的客户端（TypeScript）。🍺"
      />
      <Head>
        <title>orval - Restful 客户端生成器</title>
      </Head>
      <div className="bg-gray-50 h-full min-h-full">
        <Banner />
        <Sticky>
          <Nav />
        </Sticky>
        <div className="relative bg-white overflow-hidden">
          <div className="py-24 mx-auto container px-4 sm:mt-12  relative">
            <img
              src="/images/emblem.svg"
              className="absolute transform right-0 top-5/12 h-0 lg:h-full scale-100 translate-x-1/12 -translate-y-1/4"
              alt="orval 标志"
            />
            <div className="grid grid-cols-12 lg:gap-8">
              <div className="col-span-12 lg:col-span-6 ">
                <div className="text-center lg:text-left md:max-w-2xl md:mx-auto ">
                  <h1 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                    生成具有
                    <br className="hidden md:inline xl:hidden" />{' '}
                    <span>适当类型签名的客户端</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    在您的前端应用程序中生成、验证、缓存和模拟，全部基于您的 OpenAPI 规范。
                  </p>

                  <div className="mt-5  mx-auto sm:flex sm:justify-center lg:justify-start lg:mx-0 md:mt-8">
                    <div className="rounded-md shadow">
                      <Link
                        href="/overview"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-coral-default hover:bg-coral-light focus:outline-none focus:border-coral focus:shadow-outline-coral transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                      >
                        开始使用
                      </Link>
                    </div>
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                      <a
                        href={siteConfig.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-coral-default bg-white hover:text-coral-light focus:outline-none focus:border-coral-light focus:shadow-outline-coral transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-lg border-t border-gray-200 bg-gray-50 ">
          <div className="py-24  ">
            <div className="mx-auto container">
              <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                <div>
                  <div>
                    <h3 className="text-xl leading-6 xl:text-2xl font-bold text-gray-900">
                      生产力
                    </h3>
                    <p className="mt-2 lg:mt-4 text-base xl:text-lg lg:leading-normal leading-6 text-gray-600">
                      节省时间喝杯 🍺，几秒钟内即可开箱即用地准备好您的 API。防止人为错误，通过强制标准格式确保返回结果的准确性。
                    </p>
                  </div>
                </div>
                <div className="mt-10 lg:mt-0">
                  <div>
                    <h3 className="text-xl leading-6 xl:text-2xl font-bold text-gray-900">
                      错误边界
                    </h3>
                    <p className="mt-2  lg:mt-4 text-base xl:text-lg lg:leading-normal leading-6 text-gray-600">
                      获得您的契约！通过 orval 和 openapi 的结合，您为团队建立了强大的标准，避免任何误解问题，让您能够专注于用户界面。
                    </p>
                  </div>
                </div>
                <div className="mt-10 lg:mt-0">
                  <div>
                    <h3 className="text-xl leading-6 xl:text-2xl font-bold text-gray-900">
                      API 模拟
                    </h3>
                    <p className="mt-2  lg:mt-4 text-base xl:text-lg lg:leading-normal leading-6 text-gray-600">
                      无需等待后端准备就绪即可测试您的应用程序。使用 Orval 生成您的模拟，确保您已准备好连接到您的 API。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Playground height={300} />
        <div className="bg-gray-100 relative py-24 border-t border-gray-200 ">
          <div className="px-4 sm:px-6 lg:px-8  mx-auto container max-w-3xl sm:text-center">
            <h3 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 lg:leading-none mt-2">
              更少时间。更高生产力。
            </h3>
            <p className="my-4 text-xl leading-7  text-gray-600">
              与其浪费时间编写模型、HTTP 调用和模拟，不如继续前进，专注于其他需求。
            </p>
          </div>
          <div
            style={{
              height: 224,
            }}
          />
        </div>

        <section className="bg-coral-default body-font">
          <div className="container max-w-7xl px-4  mx-auto -mt-72 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-x-hidden">
              <Highlight>
                {`module.exports = {
  petstore: {
    output: {
      mode: 'split',
      target: './src/petstore.ts',
      schemas: './src/model',
      client: 'react-query',
      mock: true,
    },
    input: {
      target: './petstore.yaml',
    },
  },
};
`}
              </Highlight>
              <Highlight>
                {`
my-app
└── src
    ├── petstore.definition.ts
    ├── petstore.schemas.ts
    ├── petstore.msw.ts
    ├── petstore.ts
    └── model
        ├── index.ts
        ├── pet.ts
        ├── pets.ts
        ├── createPetsBody.ts
        └── error.ts


`}
              </Highlight>
            </div>
          </div>
          <div className="py-24 px-4 sm:px-6 lg:px-8  mx-auto container">
            <div className=" sm:text-center pb-16">
              <h3 className="text-3xl mx-auto leading-tight font-extrabold tracking-tight text-white sm:text-4xl  lg:leading-none mt-2">
                一个生成器统治所有。
              </h3>
            </div>
            <div>
              <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 text-white max-w-screen-lg mx-auto text-lg">
                <a className="mb-2">
                  <span className="bg-coral-light text-gray-800 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <Check />
                  </span>
                  代码生成
                </a>
                <a className="mb-2">
                  <span className="bg-coral-light text-gray-800 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <Check />
                  </span>
                  TypeScript 模型
                </a>
                <a className="mb-2">
                  <span className="bg-coral-light text-gray-800 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <Check />
                  </span>
                  Axios 客户端
                </a>
                <a className="mb-2">
                  <span className="bg-coral-light text-gray-800 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <Check />
                  </span>
                  React Query
                </a>
                <a className="mb-2">
                  <span className="bg-coral-light text-gray-800 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <Check />
                  </span>
                  Angular
                </a>
                <a className="mb-2">
                  <span className="bg-coral-light text-gray-800 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <Check />
                  </span>
                  配置覆盖
                </a>
                <a className="mb-2">
                  <span className="bg-coral-light text-gray-800 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <Check />
                  </span>
                  Faker 模拟
                </a>
                <a className="mb-2">
                  <span className="bg-coral-light text-gray-800 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <Check />
                  </span>
                  MSW
                </a>
                <a className="mb-2">
                  <span className="bg-coral-light text-gray-800 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <Check />
                  </span>
                  Swagger 验证
                </a>
                <a className="mb-2">
                  <span className="bg-coral-light text-gray-800 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <Check />
                  </span>
                  简单设置
                </a>
                <a className="mb-2">
                  <span className="bg-coral-light text-gray-800 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <Check />
                  </span>
                  仅需 CLI
                </a>
                <a className="mb-2">
                  <span className="bg-coral-light text-gray-800 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <Check />
                  </span>
                  从链接导入
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-gray-100 border-b border-gray-300">
          <div className="container mx-auto py-12 text-center">
            <h3 className="text-2xl md:text-5xl mx-auto leading-tight font-extrabold tracking-tight   lg:leading-none mt-2">
              感谢大家的支持！🍻
            </h3>
            <div className="flex flex-wrap justify-center mt-8">
              {sponsors.map((sponsor) => (
                <a
                  key={sponsor.login}
                  target="_blank"
                  href={`https://github.com/${sponsor.login}`}
                  alt={sponsor.login}
                >
                  <img
                    className="w-10 h-10 m-1 rounded-full"
                    src={sponsor.avatarUrl}
                  />
                </a>
              ))}
            </div>
            <div className="inline-flex rounded-md shadow mt-12">
              <a
                href="https://github.com/sponsors/anymaniax"
                target="_blank"
                className="inline-flex items-center justify-center text-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-coral-default hover:bg-coral-light focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                成为赞助商
              </a>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto py-24 px-4 flex flex-wrap md:flex-no-wrap items-center justify-between md:space-x-8">
            <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              准备深入了解？
            </h2>
            <div className="mt-8 flex lg:flex-shrink-0 md:mt-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/overview"
                  className="inline-flex items-center justify-center text-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-coral-default hover:bg-coral-light focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  好的，让我们开始吧！
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href={siteConfig.repoUrl}
                  className="inline-flex items-center justify-center text-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-coral-default bg-white hover:text-coral-light focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const sponsors = await getSponsors();

    return {
      props: {
        sponsors,
      },
    };
  } catch (e) {
    return {
      props: {
        sponsors: [],
      },
    };
  }
};

export default Home;
Home.displayName = 'Home';

const Check = React.memo(() => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="3"
    className="w-3 h-3"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5"></path>
  </svg>
));
