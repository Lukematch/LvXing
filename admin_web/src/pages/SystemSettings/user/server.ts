import http from "@/utils/request/http"

/**
 * 获取用户列表
 * */
export const getUsertList = () => {
  return http.get({url: "/api/user"}).then((res: any) =>{
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