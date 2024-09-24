import http from "@/utils/request/http";

/**
 * @returns 获取操作日志列表
 */
export const getOperationLogList = () => {
  return http.get({url: '/api/logger'}).then(res => {
    res.data.map((item: any, index: number) => {
      item.index = index + 1
    })
    return res;
  });
}

/**
 * @param id 操作日志id
 * @returns 删除操作日志
 */
export const deleteOperationLog = (id: number) => {
  return http.delete(`/api/logger/${id}`).then(res => res);
}

/**
 * @returns 清除操作日志
 */
export const deleteAllOperationLog = () => {
  return http.delete(`/api/logger`).then(res => res);
}