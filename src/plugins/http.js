import axios from 'axios';

const Http = {}
Http.install = function (Vue) {
   
    axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"
    Vue.prototype.$http = axios
    // Vue.prototype.$myMethod = function (methodOptions) {
     
    // }
  }
//   导出
export default Http