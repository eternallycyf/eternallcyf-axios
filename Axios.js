import { request } from './request.js'
import { InterceptorManager } from './interceptor.js'
class Axios {
  constructor(config) {
    this.defaults = config;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    }
  }
  request(config) {
    return request.call(this, config)
  }
  get(config) {
    return this.request({ method: "GET" })
  }
  post() {
    return this.request({ method: "POST" })
  }
}
function createInstance(config) {
  let context = new Axios(config);
  let instance = Axios.prototype.request.bind(context);
  let functionNamesArray = Object.getOwnPropertyNames(Axios.prototype)
  functionNamesArray.forEach(item => {
    instance[item] = Axios.prototype[item].bind(context)
  })
  Object.keys(context).forEach(key => {
    instance[key] = context[key];
  });
  return instance
}
let axios = createInstance()
export default axios
