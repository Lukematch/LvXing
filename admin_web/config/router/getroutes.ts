import { getMenuList } from "@/utils/server"

const user = JSON.parse(localStorage.getItem('user')!)

export const getRoutes = async () => {
  return getMenuList(user).then(res => {
    // console.log(res.data);
    return res.data
  })
}