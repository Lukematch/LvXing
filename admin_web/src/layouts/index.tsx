import { ProLayout } from '@ant-design/pro-components';
import { useKeepOutlets } from '@umijs/max';
import { useModel } from '@umijs/max';
import { FloatButton } from 'antd';

const Layout = () => {
  const { collapsed, setCollapsed } = useModel('global');

   const element  = useKeepOutlets();
   return <>
    { element }
    <FloatButton.BackTop type='primary' />
  </>
};

export default Layout;
