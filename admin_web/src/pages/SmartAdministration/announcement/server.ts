import http from "@/utils/request/http"
import type { DataSourceType } from "./index"
/**
 * 获取所有公告列表
 */
export const getAnnouncementList = () => {
  return http.get({url: "/api/announcement"}).then((res: any) =>{
    const { data } = res
    data.map((item: any, index: number) => {
      item.index = index + 1
      item.create_time = item.create_time * 1000
      item.update_time = item.update_time * 1000
    })
    return {
      data: data,
      total: data.length,
      success: true
    }
  })
}

/**
 *  获取指定公告
 */
export const getAnnouncementById = (params: {id: number}) => {
  return http.get({url: "/api/announcement/" + params.id})
}

/**
 * 新增公告
 */
export const addAnnouncement = (params: DataSourceType) => {
  return http.post({url: "/api/announcement", data: params})
}

/**
 * 更新公告
 */
export const updateAnnouncement = (params: { id: any, data: any}) => {
  return http.patch({url: "/api/announcement/" + params.id, data: params.data})
}

/**
 * 删除公告
 */
export const deleteAnnouncement = (params: {id: number}) => {
  return http.delete("/api/announcement/" + params.id)
}