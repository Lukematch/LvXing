import http from "@/utils/request/http";


/**
 * 获取兴趣爱好信息列表
 */

export const getHobbyList = (username: string) => {
  return http.get({url: `/api/hobby/${username}`}).then((res) => res);
}

/**
 * 更新兴趣爱好
 */

export const updateHobby = (hobby: any) => {
  return http.post({url: `/api/hobby`, data: hobby}).then((res) => res);
}
