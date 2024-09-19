import http from "@/utils/request/http";


/**
 * 获取兴趣爱好信息列表
 */
export const getHobbyList = (username: string, page: number = 1, pageSize: number = 5) => {
  return http.get({
    url: `/api/hobby/${username}`,
    params: {
      page,       // 页码
      pageSize,   // 每页数量
    },
  }).then((res) => res.data);
}

/**
 * 更新兴趣爱好
 */

export const updateHobby = (hobby: any, id?: number) => {
  return http.post({url: `/api/hobby`, data: {params: hobby, id}}).then((res) => res);
}

/**
 * 删除兴趣爱好
 */

export const deleteHobby = (id: number) => {
  return http.delete(`/api/hobby/${id}`).then((res) => res);
}