import http from '@/utils/request/http';

export const getUser = (username: string) => {
  return http.get({
          url: `/api/user/${username}`,
        })
}
