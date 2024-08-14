import { ProLayout } from '@ant-design/pro-components';
import { useKeepOutlets } from '@umijs/max';
import { useModel } from '@umijs/max';

const Layout = () => {
  const { collapsed, setCollapsed } = useModel('global');

   const element  = useKeepOutlets();
   return <>
    { element }
  </>
};

export default Layout;
