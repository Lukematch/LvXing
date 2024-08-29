import {request} from './request'

const http = {
  get(config:{url: string, params?: any}){
    const configs = {
      url: config.url,
      method: 'get',
      params: config.params
    }
    return request(configs)
  },
  post(config:{url: string, data: {}}) {
    const configs = {
      url: config.url,
      method: 'post',
      data: JSON.stringify(config.data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return request(configs)
  },
  fileAction(config:{url: string, data: any}) {
    const configs = {
      url: config.url,
      method: 'post',
      data: config.data,
      headers: {
        'Content-Type': 'form-data'
      }
    }
    return request(configs)
  },
  patch(config:{url: string, data: {}}){
    const configs = {
      url: config.url,
      method: 'patch',
      data: JSON.stringify(config.data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return request(configs)
  },
  delete(url: string){
    const configs = {
      url: url,
      method: 'delete',
    }
    return request(configs)
  }
}
export default http