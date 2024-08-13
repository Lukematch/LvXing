import { useKeepOutlets } from 'umi';

const Layout = () => {
   const element = useKeepOutlets();
   return <>{element}</>;
};

export default Layout;
