import axios, { AxiosRequestConfig } from 'axios'
import { NODE_ENV, BASE_API } from '@/config'
import history from '@/history'

const instance = axios.create({
  baseURL: BASE_API,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})

function dealError(code?: number | string) {
  // 根据请求状态值跳转到异常页面
  console.error('error code:', code)
  switch (Number(code)) {
    case 401:
      history.replace('/user/login')
      break
    default:
      return true
  }
}

function inputLog(obj: any) {
  const { request, config } = obj
  const { responseURL } = request
  const { method, baseURL, data } = config
  console.log(
    '%c%s',
    'font-weight: 800;color: #3A5;',
    `[${method.toLocaleUpperCase()}:]${responseURL.replace(new RegExp(`^.*?(${baseURL})`), '$1')}`
  )
  console.log('%c%s%o', 'text-indent: 1em;font-weight: 600;', 'req:', (str => {
    try {
      return JSON.parse(str)
    } catch (e) {
      return {}
    }
  })(data))
  console.log('%c%s%o', 'text-indent: 1em;font-weight: 600;', 'res:', obj.data)
}

function doRequest(obj: AxiosRequestConfig = {}): Promise<any> {
  const params: any = {
    ...obj
  }
  params.headers = {
    ...params.headers
  }
  if (params.data instanceof FormData) {
    params.headers = {
      ...params.headers,
      'Content-Type': 'multiple/form-data; charset=UTF-8'
    }
  }
  return new Promise((resolve, reject) => {
    instance.request(params).then(res => {
      NODE_ENV !== 'production' && inputLog(res)
      resolve(res.data)
    }).catch(err => {
      if (err && err.response) {
        if (dealError(err.response.status)) {
          reject(err.response.data)
        }
      } else {
        if (dealError()) {
          reject()
        }
      }
    })
  })
}

export default doRequest
