import http from '@/utils/request/http';

export type menuType = {
  id: number;
  menuName: string;
  path: string;
  icon: string;
  parentId: number;
  orderNum: number;
  menuType: string;
  component: string;
  createBy: string;
  createTime: Date;
  updateTime: Date;
  routes?: menuType[];
}

export const getUser = (username: string) => {
  return http.get({
          url: `/api/user/${username}`,
        })
}


export const getMenuList = (user: any) => {
  return http.post({
    url: `/api/menu/user`,
    data: user
  }).then((res: any) => {
    const { data } = res
    const tree: menuType[] = []
    const map = new Map<string, menuType>()
    // 构建map
    data.forEach((item: any, index: number) => {
      item.index = index + 1
      map.set(item.id, { ...item, routes: [] })
    })
    // 构建树
    data.forEach((item: any) => {
      if (item.parentId) {
        const parent = map.get(item.parentId);
        if (parent) {
          parent.routes!.push(map.get(item.id)!);
        } else {
          tree.push(map.get(item.id)!);
        }
      } else {
        tree.push(map.get(item.id)!);
      }
    })
    const removeEmptyChildren = (nodes: menuType[]) => {
      nodes.forEach((node) => {
        if (node.routes && node.routes.length > 0) {
          removeEmptyChildren(node.routes);
        } else {
          delete node.routes;
        }
      });
    };
    removeEmptyChildren(tree);
    // console.log(tree);
    return {
      data: tree,
      total: data.length,
      success: true
    }
  })
}