import http from "@/utils/request/http"
import { menuType } from "."

export const getMenuList = (user: any, params?: {menuName?: string, menuType?: string, createBy?: string}) => {
  return http.post({
    url: `/api/menu/user`,
    data: {user, params}
  }).then((res: any) => {
    const { data } = res
    const tree: menuType[] = []
    const map = new Map<string, menuType>()
    // 构建map
    data.forEach((item: any, index: number) => {
      item.index = index + 1
      map.set(item.id, { ...item, children: [] })
    })
    // 构建树
    data.forEach((item: any) => {
      if (item.parentId) {
        const parent = map.get(item.parentId);
        if (parent) {
          parent.children!.push(map.get(item.id)!);
        } else {
          tree.push(map.get(item.id)!);
        }
      } else {
        tree.push(map.get(item.id)!);
      }
    })
    const removeEmptyChildren = (nodes: menuType[]) => {
      nodes.forEach((node) => {
        if (node.children && node.children.length > 0) {
          removeEmptyChildren(node.children);
        } else {
          delete node.children;
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