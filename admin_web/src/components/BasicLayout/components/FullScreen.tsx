import { Button, Tooltip } from 'antd';
import type { FC } from 'react';
import { FullscreenOutlined, ExpandOutlined } from '@ant-design/icons';
import screenfull from 'screenfull';

const FullScreen: FC = () => {

  const handleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  return (
    <>
      <Tooltip title='全屏'>
          <Button type="text" style={{color: '#aaa'}} icon={<ExpandOutlined />} onClick={handleFullscreen} />
      </Tooltip>
    </>
  );
};

export default FullScreen;