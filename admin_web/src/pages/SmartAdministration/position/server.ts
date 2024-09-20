import http from "@/utils/request/http"
import { PositionType } from "."

/**
 * @returns 获取岗位列表
 */
export const getPositionList = async (name?: string, affiliated_org?: string) => {
  const res = await http.get({ url: "/api/position/", params: { name, affiliated_org } });
  const { data } = res;
  const tree: PositionType[] = [];
  const map = new Map<string, PositionType>();
  // 构建 map
  for (const item of data) {
    item.index = data.indexOf(item) + 1;
    map.set(item.id, { ...item, children: [] });
  }

  // 构建树
  for (const item of data) {
    if (item.parent_id) {
      const parent = map.get(item.parent_id);
      if (parent) {
        parent.children!.push(map.get(item.id)!);
      } else {
        // 如果父节点不存在，则从后端获取父节点
        // await fetchParentNode(item.parent_id);
        // map.get(item.parent_id)?.children!.push(map.get(item.id)!);
        tree.push(map.get(item.id)!);
      }
    } else {
      // 没有 parent_id，则为根节点
      tree.push(map.get(item.id)!);
    }
  }

  // 删除空的 children 属性
  const removeEmptyChildren = (nodes: PositionType[]) => {
    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        removeEmptyChildren(node.children); // 递归检查子节点
      } else {
        delete node.children; // 删除空的 children 属性
      }
    });
  };
  removeEmptyChildren(tree);

  // console.log('@tree',tree);

  return {
    data: tree,
    total: data.length,
    success: true,
  };
};


/**
 * @params 新增岗位
 */
export const addPosition = (params: any) => {
  return http.post({url: "/api/position", data: params}).then((res: any) => {
    return res
  })
}

/**
 * @params 更新岗位信息
 */
export const updatePosition = (id: string, params: any) => {
  return http.patch({url: "/api/position/" + id, data: params}).then((res: any) => {
    return res
  })
}


/**
 * @params 删除岗位
 */
export const deletePosition = (id: string) => {
  return http.delete("/api/position/" + id).then((res: any) => {
    return res
  })
}