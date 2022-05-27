import axios from 'axios'

const TIAN_API_KEY = 'd929312062603829e3ddd1f28538b881'; // 天行数据key

const instance = axios.create({
  withCredentials: true,
  timeout: 30000,
})

instance.interceptors.response.use(
  (response) => {
    const res = response.data
    // 正确状态
    // TODO: 这里只针对符合该条件的接口
    if (res.code === 200)
      return res.newslist

    return undefined
  },
  (error) => {
    console.log(`err${error}`) // for debug
  },
)

const request = (config, options) => {
  if (typeof config === 'string') {
    if (!options) {
      return instance.request({
        url: config,
      })
      // throw new Error('请配置正确的请求参数');
    }
    else {
      return instance.request({
        url: config,
        ...options,
      })
    }
  }
  else {
    return instance.request(config)
  }
}
export function get(config, options){
  return request({ ...config, method: 'GET' }, options)
}

export function getTian(
  config,
  options,
){
  return request(
    { ...config, params: { ...(config.params || {}), key: TIAN_API_KEY }, method: 'GET' },
    options,
  )
}

export function post(
  config,
  options
){
  return request({ ...config, method: 'POST' }, options)
}

export default request
