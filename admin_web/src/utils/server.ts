import http from '@/utils/request/http';

export const getUser = (params: {username: string}) => {
  return http.get({
          url: `/api/user/${params?.username}`,
          params
        })
}
