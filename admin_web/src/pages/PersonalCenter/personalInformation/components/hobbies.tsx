import React, { useEffect, useState } from 'react';
import { deleteHobby, getHobbyList } from '../server';
import { history, useModel } from '@umijs/max';
import { Avatar, Button, List, Popconfirm, Skeleton, message, Divider } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const Hobbies = (
  props?: {
    update?: boolean,
    setOpen?: any,
    form?: any,
    setType?: any,
    setNowId?: any,
    refreshKey?: number,
    setRefreshKey?: any,
  }
) => {
  const { initialState } = useModel('@@initialState');

  const [hobbyList, setHobbyList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [page, setPage] = useState<number>(1); // 分页页码
  const pageSize = 5; // 每次加载的条数

  // 获取数据
  const getHobbies = async (isLoadMore = false) => {
    if (loading) {
      return; // 防止重复加载
    }
    try {
      setLoading(true); // 设置加载状态
      const currentPage = isLoadMore ? page : 1; // 加载更多时使用当前页码，否则重置为第一页
      const res = await getHobbyList(initialState?.user?.username, currentPage, pageSize);
      const { data, total } = res;

      if (isLoadMore) {
        setHobbyList(prevList => [...prevList, ...data]); // 追加新数据
        setPage(prevPage => prevPage + 1); // 增加页码
        if (hobbyList.length + data.length >= total) {
          setHasMore(false); // 没有更多数据时关闭加载更多
        }
      } else {
        setHobbyList(data); // 初始加载
        setPage(2); // 设置下一页为第2页
        setHasMore(data.length < pageSize ? false : true); // 判断是否还有更多数据
      }
    } catch (error) {
      message.error('获取数据失败: ' + error);
    } finally {
      setLoading(false); // 加载完成，重置加载状态
    }
  };

  // 重新加载列表时，重置状态
  useEffect(() => {
    setPage(1); // 重置页码为1
    setHobbyList([]); // 清空列表
    setHasMore(true); // 重置加载更多状态
    getHobbies(); // 初次加载
  }, [initialState?.user, props?.refreshKey]);

  return (
    <>
      <div
        style={{
          overflow: 'auto',
          maxHeight: '580px',  // 最大高度限制为 650px
          border: '1px solid rgba(140, 140, 140, 0.35)',
          padding: '0 16px',
        }}>
        {loading && <Skeleton avatar paragraph={{ rows: 1 }} active />}
        <List
          dataSource={hobbyList}
          renderItem={(item: any) => (
            props?.update ? (
              <List.Item
                key={item?.id}
                actions={[
                  <Button key="list-edit" onClick={() => {
                    if (item?.hobbyIcon?.slice(0, 4) === 'http') {
                      let file = {
                        uid: uuidv4(),
                        name: item?.hobbyIcon?.substring(item?.hobbyIcon?.lastIndexOf('/') + 1),
                        status: 'done',
                        url: item?.hobbyIcon
                      };
                      item.file = (item?.hobbyIcon === '' || item?.hobbyIcon === null) ? [] : [file];
                    }
                    props?.setOpen(true);
                    props?.setType('edit')
                    props?.setNowId(item?.id);
                    props?.form.setFieldsValue(item);
                  }}>编辑</Button>,
                  <Popconfirm title="确定删除吗？" onConfirm={async () => {
                    const { data } = await deleteHobby(item?.id);
                    data?.success ? message.success('删除成功') : message.error('删除失败');
                    props?.setRefreshKey((prev:any) => prev + 1);
                  }}>
                    <Button key="list-delete" danger>删除</Button>
                  </Popconfirm>
                ]}>
                <List.Item.Meta
                  avatar={item?.hobbyIcon.slice(0, 4) === 'http' ? <Avatar src={item?.hobbyIcon} /> : <Avatar>{item?.hobbyIcon}</Avatar>}
                  title={<a href="#">{item?.hobbyName}</a>}
                  description={item?.hobbyDescription}
                />
              </List.Item>
            ) : (
              <List.Item key={item?.email}>
                <List.Item.Meta
                  avatar={item?.hobbyIcon.slice(0, 4) === 'http' ? <Avatar src={item?.hobbyIcon} /> : <Avatar>{item?.hobbyIcon}</Avatar>}
                  title={<a href="#">{item?.hobbyName}</a>}
                  description={item?.hobbyDescription}
                />
              </List.Item>
            )
          )}
        />
        {hasMore && (
          <div style={{ textAlign: 'center', margin: '12px 0' }}>
            <Button onClick={() => getHobbies(true)} loading={loading}>加载更多</Button>
          </div>
        )}
        {!hasMore && (
          <Divider plain><Button style={{ color: '#aaa' }}>It is all, nothing more 🤐</Button></Divider>
        )}
      </div>
    </>
  );
}

export default Hobbies;
