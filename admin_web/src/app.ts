// 运行时配置

// import { defineApp } from "@umijs/max";


// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'Lukematch' };
}

export const layout = () => {
  return {
    title: 'LvX-react',
    logo: '/favicon.ico',
    menu: {
      locale: false,
    },
  };
};
// umi v4不再不要defineApp
// export default defineApp({
//   getInitialState,
//   layout,
// })

