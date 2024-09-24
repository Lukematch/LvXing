import http from "@/utils/request/http"

/**
 * @returns 获取角色列表
 */
export const getRoleList = () => {
  return http.get({
          url: `/api/role`,
        })
}

/**
 * @params params
 * @returns 更新角色
 */
export const updateRole = (params: any, id?: number) => {
  return http.post({
          url: `/api/role`,
          data: {params, id}
        })
}

/**
 * @id 编号
 * @returns 删除角色
 */
export const deleteRole = (id: number) => {
  return http.delete(`/api/role/${id}`)
}
