import http from "@/utils/request/http"
import { OrangizationType } from "."

/**
 * @returns 获取组织列表
 */
export const getOrangizationList = (name?: string, code?: string) => {
  console.log(name, code);
  return http.get({url: "/api/orangization/", params: {name, code}}).then((res: any) => {
    const { data } = res
    const tree: OrangizationType[] = []
    const map = new Map<string, OrangizationType>()

    // 构建map
    data.forEach((item: any, index: number) => {
      item.index = index + 1
      map.set(item.id, { ...item, children: [] })
    })
    // 构建树
    data.forEach((item: any) => {
      if (item.parent_id) {
        const parent = map.get(item.parent_id);
        if (parent) {
          // 使用非空断言
          parent.children!.push(map.get(item.id)!);
        } else {
          tree.push(map.get(item.id)!);
        }
      } else {
        // 没有 parent_id，则为根节点
        tree.push(map.get(item.id)!);
      }
    })
    const removeEmptyChildren = (nodes: OrangizationType[]) => {
      nodes.forEach((node) => {
        if (node.children && node.children.length > 0) {
          removeEmptyChildren(node.children); // 递归检查子节点
        } else {
          delete node.children; // 删除空的 children 属性
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

/**
 * @params 新增组织
 */
export const addOrangization = (params: any) => {
  return http.post({url: "/api/orangization", data: params}).then((res: any) => {
    return res
  })
}

/**
 * @params 更新组织
 */
export const updateOrangization = (id: string, params: any) => {
  return http.patch({url: "/api/orangization/" + id, data: params}).then((res: any) => {
    return res
  })
}


/**
 * @params 删除组织
 */
export const deleteOrangization = (id: string) => {
  return http.delete("/api/orangization/" + id).then((res: any) => {
    return res
  })
}