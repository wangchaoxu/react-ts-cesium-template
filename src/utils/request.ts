/*
 * @Author: wangchaoxu
 * @Date: 2020-08-11 10:35:13
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2020-09-18 17:59:44
 * @Description:
 */
import axios from "axios";
import { message } from "antd";
// import { UserModule } from '@/store/modules/user'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000,
  // withCredentials: true // send cookies when cross-domain requests
});

// 请求拦截
service.interceptors.request.use(
  (config: any) => {
    // 每次请求的时候都添加token,一般登陆成功后后台返回保存到vuex中
    config.headers["token"] = "123456";
    // 请求头,针对不同的请求需要设置不同的请求头
    if (config.url.includes("pur/contract/export")) {
      config.headers["responseType"] = "blob";
    }
    if (config.url.includes("png")) {
      config.headers["responseType"] = "arraybuffer";
    }
    // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
    if (config.url.includes("pur/contract/upload")) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
const httpCode: any = {
  //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
  400: "请求参数错误",
  401: "权限不足, 请重新登录",
  403: "服务器拒绝本次访问",
  404: "请求资源未找到",
  405: "请求方法错误",
  500: "内部服务器错误",
  501: "服务器不支持该请求中使用的方法",
  502: "网关错误",
  504: "网关超时",
};
// enum httpCode {
//   //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
//   400 = '请求参数错误',
//   401 = '权限不足, 请重新登录',
//   403 = '服务器拒绝本次访问',
//   404 = '请求资源未找到',
//   405 = '请求方法错误',
//   500 = '内部服务器错误',
//   501 = '服务器不支持该请求中使用的方法',
//   502 = '网关错误',
//   504 = '网关超时'
// }
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.statusText == "OK" || response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      message.error({
        message: "发生错误",
        type: "error",
      });
      return Promise.reject(new Error(res.message || "发生错误"));
    }
  },
  (error) => {
    if (error.response) {
      console.log(error.response);
      // 根据请求失败的http状态码去给用户相应的提示
      const tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message;
      message.error({
        message: tips,
        type: "error",
      });
      if (error.response.status === 401) {
        // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
        // this.$router.push({
        //   path: '/login'
        // });
      }
      return Promise.reject(error);
    } else {
      message.error({
        message: "请求超时, 请刷新重试",
        type: "error",
      });
      return Promise.reject(new Error("请求超时, 请刷新重试"));
    }
    message.error({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

/* 统一封装get请求 */
export const get = (url: string, params: any, config = {}) => {
  return new Promise((resolve, reject) => {
    service({
      method: "get",
      url,
      params,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/* 统一封装post请求  */
export const post = (url: string, data: any, config = {}) => {
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default service;
