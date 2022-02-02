import { dispatchRequest } from './dispatchRequest.js'
export function request(config) {
  let promise = Promise.resolve(config);
  let chains = [dispatchRequest, undefined];
  this.interceptors.request.handlers.forEach(item => {
    chains.unshift(item.fulfilled, item.rejected)
  })
  this.interceptors.response.handlers.forEach(item => {
    chains.push(item.fulfilled, item.rejected);
  });
  while (chains.length) {
    promise = promise.then(chains.shift(), chains.shift());
  }
  return promise;
}
