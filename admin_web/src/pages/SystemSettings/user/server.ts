import http from "@/utils/request/http"

/**
 * 获取用户列表
 * */
export const getUserList = (username?: string, nickName?: string, role?: string) => {
  return http.get({url: "/api/user", params: {username, nickName, role}}).then((res: any) => {
    const { data } = res
    data.map((item: any, index: number) => {
      item.index = index + 1
    })
    return {
      data: data,
      total: data.length,
      success: true
    }
  })
}

/**
 * @returns 角色列表
 */
export const getRoleList = () => {
  return http.get({url: "/api/role"})
}

/**
 * @params 更新用户信息
 */

export const updateUser = (params: any, id?: number) => {
  return http.post({url: `/api/user`, data: { params, id }}).then((res: any)=> res)
}

/**
 * @params 删除用户
 */
export const deleteUser = (id: number) => {
  return http.delete(`/api/user/${id}`).then((res: any) => {
    return res
  })
}

/**
 * @params 重置用户密码
 */

export const resetPassword = (pw: string, id: number) => {
  return http.post({url: `/api/user/rpw`, data: { pw, id }}).then((res: any) => {
    return res
  })
}

/**
 * @params 修改用户密码
 */

export const changePassword = (pw: {oldPassword: string, newPassword: string}, id: number) => {
  return http.post({url: `/api/user/pw`, data: { pw, id }}).then((res: any) => {
    return res
  })
}