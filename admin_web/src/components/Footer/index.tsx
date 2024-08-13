import { Button, Card, Col, Drawer, Row } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import styles from './index.module.less';
import { DragOutlined } from '@ant-design/icons';
// import type { DraggableData, DraggableEvent } from 'react-draggable';
import  Draggable from 'react-draggable';
import { Modal, Image } from 'antd';
import Meta from 'antd/es/card/Meta';


const content = "踏遍山河梦，万里同行心。\n风光正独好，星辰映照情。\n途经千重路，岁月如歌行。\n愿随风中梦，长河共此生。浮生 | Luke & GPT 4o\n\n ———李思训 | 江帆楼阁图"
const CustomFooter: React.FC = () => {

  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);

  return (
    <Footer className={styles.footer}>
      <a
      rel='noopener noreferrer'
      className={styles.link}
      href="https://mwannianli.txcx.com/wnl-2024-8-1.html"
      target="_blank"
      >
      ©2024 &nbsp; |
      </a>
      <Button
      type={'link'}
      className={styles.btn}
      href="https://github.com/Lukematch"
      target="_blank">Lukematch
      </Button>
      <a
      onClick={() => setVisible(true)}
      type={'link'}
      className={styles.open}
      target="_blank">踏遍山河梦，万里同行心
      </a>
      <Modal
      className={styles.modal}
      mask={false}
      title={
        <div style={{
          width: '100%',
          cursor: 'move',
          backgroundColor: 'rgb(22,200,200)',
          padding: '15px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center'
        }}
          onMouseOver={() => {
            disabled && setDisabled(false);
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
        >
          <span>
            LvXing | 旅行
          </span>
          <DragOutlined
          style={{
            marginLeft: '120px'
          }}/>
        </div>
      }
      open={visible}
      onCancel={()=>setVisible(false)}
      footer={null}
      modalRender={modal => (
        <Draggable
          disabled={disabled}
          // bounds={bounds}
        >
          <div>{modal}</div>
        </Draggable>
      )}
      >
        <Card
       hoverable
       style={{ width: 'auto', height: 400, display: 'flex', alignItems: 'center' }}
        // key={item.img}
        // 卡片封面
        cover={
          <div style={{ flex: '0 0 50%' }}>
          <Image src="http://5b0988e595225.cdn.sohucs.com/images/20190321/8618688d39a548c089b7b5554c2a09b2.jpeg"
          alt="李思训《江帆楼阁图》"
          style={{height:400,width:230,borderRadius:3}}
          /></div>}
        >
          <div style={{ flex: '1 1 50%', padding: '0 10px' }}>
            <Meta style={{textAlign:'center'}} description={content}/>
          </div>
        </Card>
        {/* <Row>
          div>2}>
            <Image  />
          </Col>
          <Col span={12}>
            踏遍山河梦，万里同行心。
            风光正独好，星辰映照情。
            途经千重路，岁月如歌行。
            愿随风中梦，长河共此生。
          </Col>
        </Row> */}
      </Modal>
    </Footer>


  );
};

export default CustomFooter;
