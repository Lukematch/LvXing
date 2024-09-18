import React, { useEffect, useState } from 'react'
import { getHobbyList } from '../server'
import { useModel } from '@umijs/max';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Button, Divider, List, Skeleton, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const Hobbies =(
  props?: {
    update: boolean,
    setOpen: any,
    form: any
  }
  ) => {
  const { initialState, setInitialState, refresh } = useModel('@@initialState');

  const [hobbyList, setHobbyList] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getHobbies = async () => {
    if (loading) {
      return;
    }
    try {
      const { data } = await getHobbyList(initialState?.user?.username)
      // 追加数据到 hobbyList
      setHobbyList((prevList) => [...prevList, ...data])
      // 如果数据长度小于预期数量，说明没有更多数据了
      if (data.length < 6) {
        setHasMore(false); // 没有更多数据
      }
    } catch (error) {
      message.error('获取数据失败:'+ error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setHobbyList([]); // 清空上一个用户的数据
    setHasMore(true); // 重置 hasMore 状态
    getHobbies()
  }, [initialState?.user])

  return <>
    <div style={{
      overflow: 'auto',
      height: '450px',
      border: '1px solid rgba(140, 140, 140, 0.35)',
      padding: '0 16px'
    }}>
    <InfiniteScroll
      dataLength={hobbyList.length}
      next={getHobbies}
      hasMore={hasMore}
      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
      endMessage={<Divider plain><Button style={{color: '#aaa'}}>It is all, nothing more 🤐</Button></Divider>}
      scrollableTarget="scrollableDiv"
    >
      <List
        dataSource={hobbyList}
        renderItem={(item: any) => (
          props?.update? <List.Item
            key={item?.email}
            actions={[
              <Button key="list-edit"
              onClick={() => {
                props?.setOpen(true)
                if (item?.hobbyIcon?.slice(0, 4) === 'http') {
                  let file = {
                    uid: uuidv4(),
                    name: item?.hobbyIcon?.substring(item?.hobbyIcon?.lastIndexOf('/') + 1),
                    status: 'done',
                    url: item?.hobbyIcon
                  }
                  item.file = (item?.hobbyIcon === '' || item?.hobbyIcon === null)? [] : [file]
                }
                props?.form.setFieldsValue(item)
              }}>编辑</Button>
            ]}>
              <List.Item.Meta
                avatar={item?.hobbyIcon.slice(0, 4) === 'http'? <Avatar src={item?.hobbyIcon}/>:
                <Avatar>{item?.hobbyIcon}</Avatar>}
                title={<a href="#">{item?.hobbyName}</a>}
                description={item?.hobbyDescription}
              />
            </List.Item> :
            <List.Item
            key={item?.email}>
              <List.Item.Meta
                avatar={item?.hobbyIcon.slice(0, 4) === 'http'? <Avatar src={item?.hobbyIcon}/>:
                <Avatar>{item?.hobbyIcon}</Avatar>}
                title={<a href="#">{item?.hobbyName}</a>}
                description={item?.hobbyDescription}
              />
            </List.Item>
        )}
      />
    </InfiniteScroll>
    </div>
  </>
}

export default Hobbies;